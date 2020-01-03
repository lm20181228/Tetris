var app = require("http").createServer();
var io = require("socket.io")(app);
var fs = require('fs');
var PORT = 3000;
app.listen(PORT);

//客户端技术
var clientCount = 0;
//用于存储客户端socket
var socketMap = {};

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
		socket.emit("start");
		if(socketMap[clientCount - 1]){
			socketMap[clientCount - 1].emit("start");
		}
	}
	socket.on("init",function(data){
		if(socket.clientNum % 2 == 0){
			if(socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit("init",data);
			}
		}else{
			if(socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit("init",data);
			}
		}
	})
	socket.on("next",function(data){
		console.log("ws"+data.type)
		if(socket.clientNum % 2 == 0){
			if(socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit("next",data);
			}
		}else{
			if(socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit("next",data);
			}
		}
	})
	socket.on("disconnect",function(){
		console.log("websocket disconnet!!")
	})
})
