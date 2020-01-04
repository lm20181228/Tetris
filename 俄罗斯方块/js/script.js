var socket = io('ws://localhost:3000/');


var local = new Local(socket);
/*local.start();*/
var remote = new Remote(socket);
/*remote.start();
remote.bindEvents();*/
socket.on("waiting",function(data){
	document.getElementById("wait").innerHTML = data;
})
