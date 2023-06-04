const socket = require('socket.io'); // socket.io 패키지 추가
const ChannelService = require("../services/channel.service");

const socketUtil = (server) => {
	const channelService = new ChannelService();
	const io = socket(server);

	io.sockets.on('connection', function(socket) {

		// 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
		socket.on('newUser', async function(name, workspace, channel) {
			console.log(name + ' 님이 접속하였습니다.');
			console.log("workspace명: " + workspace);
			console.log("workspace명: " + channel);
	
			// 소켓에 정보 저장해두기
			socket.name = name
			socket.workspace = workspace
			socket.channel = channel
	
			// 모든 소켓에게 전송
			io.sockets.emit('update', {type: 'connect', name: 'SERVER', workspace, channel, message: name + '님이 접속하였습니다.'})
		})
	
		// 전송한 메시지 받기
		socket.on('message', async function(data) {
			// 받은 데이터에 누가 보냈는지 이름을 추가
			data.name = socket.name
			
			console.log(data)
			await channelService.putChatToChannel(data, socket.workspace, socket.channel);
	
			data.workspace = socket.workspace
			data.channel = socket.channel
			// 보낸 사람을 제외한 나머지 유저에게 메시지 전송
			socket.broadcast.emit('update', data);
		})
	
		// 접속 종료
		socket.on('disconnect', async function() {
			console.log(socket.name + '님이 나가셨습니다.')
	
			// 나가는 사람을 제외한 나머지 유저에게 메시지 전송
			socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
		})
	})
}

module.exports = socketUtil;