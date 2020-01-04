// 对战玩家游戏区
var Remote = function(socket){
	var game;

	var bindEvents = function(){
		socket.on("init",function(data){
			start(data.type);
		})
		socket.on("next",function(data){
			game.performNext(data.type);
		})
		socket.on("fall",function(){
			game.fall();
		})
		socket.on("left",function(){
			game.left();
		})
		socket.on("right",function(){
			game.right();
		})
		socket.on("down",function(){
			game.down();
		})
		socket.on("rotate",function(){
			game.rotate();
		})
		socket.on("fixed",function(){
			game.fixed();
		})
		socket.on("performNext",function(data){
			game.performNext(data.type);
		})
		socket.on("ckeckClear",function(){
			game.checkClear();
		})
		socket.on("setTime",function(data){
			game.setTime(data.time);
		})
		socket.on("addTailLines",function(data){
			game.addTailLines(data.lines);
		})
		socket.on("GameOver",function(data){
			game.GameOver(data.isOver);
		})
		socket.on("addTailLinesLocal",function(data){
			game.addTailLines(data.lines);
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