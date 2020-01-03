// 对战玩家游戏区
var Remote = function(socket){
	var game;

	var bindEvents = function(){
		socket.on("init",function(data){
			console.log("init"+data.type)
			
			start(data.type);
		})
		socket.on("next",function(data){
			console.log("next"+data.type)
			game.performNext(data.type);
		})
	}
	var start = function(type){
		var doms = {
			gameDiv :document.getElementById("remote_game"),
			nextDiv :document.getElementById("remote_next"),
			recodeDiv :document.getElementById("remote_recode"),
			timeDiv :document.getElementById("remote_time"),
			gameOverDiv:document.getElementById("remote_gameOver")
		}
		game = new Game();
		game.init(doms,type);
	}
	bindEvents();
/*	this.start = start;
	this.bindEvents = bindEvents;*/
}