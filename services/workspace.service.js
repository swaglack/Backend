const { StatusCodes } = require("http-status-codes"); // StatusCodes를 사용하기 위해 http-status-codes 패키지 추가
const CustomError = require("../utils/error.utils");
const WorkspaceRepository = require("../repositories/workspace.repository");

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();

  // Workspace 생성
  postWorkspace = async (workspaceName, userName, res, next) => {
    // 해당 이름의 Workspace가 있는지 확인
    const checkWorkspace = await this.workspaceRepository.getOneWorkspaceByName(workspaceName);
    if (checkWorkspace) {
      throw new CustomError("동일한 이름의 workspace가 존재합니다.", StatusCodes.BAD_REQUEST);
      // throw new ErrorUtils(
      //   StatusCodes.BAD_REQUEST,
      //   "동일한 이름의 workspace가 존재합니다."
      // );
    };

    // workspace 생성
    const workspace = await this.workspaceRepository.postWorkspace(
      workspaceName,
      userName
    );
    return workspace;
  };

  // 전체 Workspace 정보 가저오기
  getAllWorkspace = async (res, next) => {
    const workspace = await this.workspaceRepository.getAllWorkspace();

    const filteredWorkspace = workspace.map((item) => ({
      workspaceName: item.workspaceName,
      workspaceId: item.workspaceId,
    }));

    return filteredWorkspace;
  };

  // 특정 Workspace 정보 가저오기
  getOneWorkspace = async (workspaceId, res, next) => {
    const workspace = await this.workspaceRepository.getOneWorkspaceById(
      workspaceId
    );

    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
      // throw new ErrorUtils(
      //   StatusCodes.NOT_FOUND,
      //   "워크스페이스가 존재하지 않습니다."
      // );
    };

    const filteredWorkspace = {
      workspaceName: workspace.workspaceName,
      workspaceMember: workspace.workspaceMember,
      workspaceChannel: workspace.workspaceChannel,
    };

    return filteredWorkspace;
  };

  // Workspace 수정 - 인원 추가
  putUserToWorkspace = async (workspaceId, newMember, res, next) => {
    // 워크스페이스 조회
    const workspace = await this.workspaceRepository.getOneWorkspaceById( workspaceId );
    
    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
      // throw new ErrorUtils(
      //   StatusCodes.NOT_FOUND,
      //   "워크스페이스가 존재하지 않습니다."
      // );
    };

    // 워크스페이스 멤버에 이미 해당 인원이 있음
    if (workspace.workspaceMember.includes(newMember)) {
      throw new CustomError(`${newMember}은/는 이미 해당 워크스페이스의 멤버입니다.`, StatusCodes.BAD_REQUEST);
      // throw new ErrorUtils(
      //   StatusCodes.BAD_REQUEST,
      //   `${newMember}은/는 이미 해당 워크스페이스의 멤버입니다.`
      // );
    }
    
    await this.workspaceRepository.putUserToWorkspace(workspaceId, newMember);
    // return true;
  };

  // Workspace 삭제
  deleteWorkspace = async (workspaceId, res, next) => {
    // 워크스페이스 조회
    const workspace = await this.workspaceRepository.getOneWorkspaceById( workspaceId );
    
    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError("워크스페이스가 존재하지 않습니다.", StatusCodes.NOT_FOUND);
      // throw new ErrorUtils(
      //   StatusCodes.NOT_FOUND,
      //   "워크스페이스가 존재하지 않습니다."
      // );
    };

    await this.workspaceRepository.deleteWorkspace(workspaceId);
    return true;
  };
}

module.exports = WorkspaceService;
