var app = require("http").createServer();
var io = require("socket.io")(app);
var fs = require('fs');
var PORT = 3000;
app.listen(PORT);

//客户端技术
var clientCount = 0;
//用于存储客户端socket
var socketMap = {};
var bindListener = function(socket,event){
	socket.on(event,function(data){
		if(socket.clientNum % 2 == 0){
			if(socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit(event,data);
			}
		}else{
			if(socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit(event,data);
			}
		}
	})
}
/*function handler(req,res){
	fs.readFile(_dirname + '/index.html',function(err,data){
		if(err){
			res.writeHead(500);
			return res.end("error loading index.html");
		}
		res.writeHead(200);
		res.end(data);
	});
}*/
io.on("connection",function(socket){
//	console.log("websocket connection");
	clientCount = clientCount + 1;
	socket.clientNum = clientCount;
	socketMap[clientCount] = socket;
	if(clientCount % 2 ==1){
		socket.emit("waiting","正在匹配对手");
	}else{
		
		if(socketMap[clientCount - 1]){
			socket.emit("start");
			socketMap[clientCount - 1].emit("start");
		}else{
			socket.emit("leave")
		}
	}
	bindListener(socket,"init");
	bindListener(socket,"next");
	bindListener(socket,"fall");
	bindListener(socket,"left");
	bindListener(socket,"down");
	bindListener(socket,"right");
	bindListener(socket,"rotate");
	bindListener(socket,"fixed");
	bindListener(socket,"performNext");
	bindListener(socket,"ckeckClear");
	bindListener(socket,"setTime");
	bindListener(socket,"addTailLines");
	bindListener(socket,"lose");
	bindListener(socket,"win");
	
	bindListener(socket,"addTailLinesLocal");

	socket.on("addTailLines",function(data){
		if(clientCount % 2 ==1){
			if(socketMap[clientCount - 1]){
				socketMap[clientCount - 1].emit("addTailLines",data);
			}
		}else{
			if(socketMap[clientCount + 1]){
				socketMap[clientCount + 1].emit("addTailLines",data);
			}
		}
	})
	
	socket.on("disconnect",function(){
		if(socket.clientNum % 2 ==0){
			if(socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit("leave");
			}
		}else{
			if(socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit("leave");
			}
		}
		delete(socketMap[socket.clientNum]);
	})
})
