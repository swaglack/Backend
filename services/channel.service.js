const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/error.utils");
const ChannelRepository = require("../repositories/channels.repository");
const WorkspaceRepository = require("../repositories/workspaces.repository");
const UserChannelRepository = require("../repositories/userChannels.repository");
const ChatRepository = require("../repositories/chats.repository");
const UserRepository = require("../repositories/users.repository")
const JoinRepository = require("../repositories/joins.repository")

class ChannelService {
  channelRepository = new ChannelRepository();
  workspaceRepository = new WorkspaceRepository();
  userChannelRepository = new UserChannelRepository();
  chatRepository = new ChatRepository();
  userRepository = new UserRepository();
  joinRepository = new JoinRepository();

  /**************************************************
   *                   채널 생성                    *
   **************************************************/
  postChannel = async (channelName, channelMaster, workspaceId, userId) => {
    // 워크스페이스 조회
    let workspace = await this.workspaceRepository.getOneWorkspace({ workspaceId });
    
    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    };

    // 채널 조회
    let channel = await this.channelRepository.getOneChannel({ channelName, workspaceId });

    // 이미 해당 워크스페이스와 채널 정보를 가진 값이 존재
    if (channel) {
      throw new CustomError("이미 해당 워크스페이스와 채널 정보를 가진 값이 존재합니다.", StatusCodes.BAD_REQUEST);
    }

    // 채널 생성
    channel = await this.channelRepository.postChannel({
      channelName,
      channelMaster,
      workspaceId,
		});

		// userChannel 테이블에 채널 및 유저 정보 등록
		await this.userChannelRepository.postUserChannel({
      userId,
      channelId: channel.channelId,
    });
  };

  /**************************************************
   *               전체 채널 조회                   *
   **************************************************/
  getAllChannel = async (workspaceId) => {
		// 워크스페이스 조회
    const workspace = await this.workspaceRepository.getAllWorkspace({
      workspaceId
		});

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }

		// 채널 조회
    const channel = await this.joinRepository.getAllChannel({ workspaceId });

    return channel;
  };

  /**************************************************
   *               단일 채널 조회                   *
   **************************************************/
  getOneChannel = async (workspaceId, channelId) => {
    // 워크스페이스 조회
    const workspace = await this.workspaceRepository.getAllWorkspace({
      workspaceId
		});

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }
    
		// 채널 조회
    const channel = await this.channelRepository.getOneChannel({ workspaceId, channelId });

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new CustomError("채널이 존재하지 않습니다.", StatusCodes.BAD_REQUEST);
    }

		// 채널 멤버 조회
		const user = await this.userChannelRepository.getAllUserChannel({ 
			channelId: channel.channelId,
		});

		// 유저의 Id 정보만 추출
		const filteredMember = user.map((item) => {
			const userId = item.userId
			return userId;
		})

		// 채팅 조회
		const chat = await this.chatRepository.getAllChat({
			channelId: channel.channelId,
		});

		// 데이터 가공
    const filteredChannel = {
      channelName: channel.channelName,
      channelMember: filteredMember,
      channelChat: chat,
    };

    return filteredChannel;
  };

  /**************************************************
   *                  채널 수정                     *
   **************************************************/
  putUserToChannel = async (workspaceId, channelId, nickName) => {
		// 워크스페이스 조회
    const workspace = await this.workspaceRepository.getAllWorkspace({ workspaceId });

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }

		// 채널 조회
    let channel = await this.channelRepository.getAllChannel({ channelId });

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new CustomError("채널이 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }

		// 유저 조회
		const user = await this.userRepository.getOneUser({ nickName });

		// 유저가 없는 경우 에러
		if (!user) {
			throw new CustomError("해당 유저가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
		}

		// 채널 멤버에 해당인원이 있는지 조회
		const userChannel = await this.userChannelRepository.getOneUserChannel({ channelId, userId: user.userId });

		// 유저가 이미 해당 채널의 멤버인 경우
		if (userChannel) {
			throw new CustomError(`${user.userId}은/는 이미 해당 채널의 멤버입니다.`, StatusCodes.BAD_REQUEST);
		}
		console.log(channelId)

		// userChannel 업데이트
    await this.userChannelRepository.postUserChannel(
			{ channelId, userId: user.userId },
    );
  };

  /**************************************************
   *                  채널 삭제                     *
   **************************************************/
  deleteChannel = async (workspaceId, channelId) => {
		// 워크스페이스 조회
    const workspace = await this.workspaceRepository.getOneWorkspace({ workspaceId });

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }
    
		// 채널 조회
    let channel = await this.channelRepository.getOneChannel({ channelId });

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new CustomError("채널이 존재하지 않습니다.", StatusCodes.BAD_REQUEST);
    }

		// userChannel 삭제
		await this.userChannelRepository.deleteUserChannel({ channelId });
    
		// 채널 삭제
    await this.channelRepository.deleteChannel({ workspaceId, channelId });
  };

  /**************************************************
   *                  채팅 추가                     *
   **************************************************/
  putChatToChannel = async (data, workspaceName, channelName, res, next) => {
    const channel = await this.channelRepository.getOneChannelbyName2(channelName, workspaceName);

    // 채널이 존재하지 않음
    if (!channel) {
      throw new CustomError("채널이 존재하지 않습니다.", StatusCodes.NOT_FOUND);
    }

    if (channel.channelChat[0]) {
      await this.channelRepository.putChatToChannel(data, channelName);
    } else {
      await this.channelRepository.postChatToChannel(data, channelName);
    }
  };
}



module.exports = ChannelService;
