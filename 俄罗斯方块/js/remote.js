// 对战玩家游戏区
var Remote = function(socket){
	var game;

	var bindEvents = function(){
		document.getElementById("left").onclick = function(){
			game.left();
		}
		document.getElementById("down").onclick = function(){
			game.down();
		}
		document.getElementById("right").onclick = function(){
			game.right();
		}
		document.getElementById("fall").onclick = function(){
			game.fall();
		}
		document.getElementById("fixed").onclick = function(){
			game.fixed();
		}
		document.getElementById("performNext").onclick = function(){
			game.performNext();
		}
		document.getElementById("checkClear").onclick = function(){
			game.checkClear();
		}
		document.getElementById("checkGameOver").onclick = function(){
			game.checkGameOver();
		}
		document.getElementById("setTime").onclick = function(){
			game.setTime(10);
		}
		document.getElementById("addScore").onclick = function(){
			game.addScore();
		}
		document.getElementById("GameOver").onclick = function(){
			game.GameOver(true);
		}
		document.getElementById("addTailLines").onclick = function(){
			game.addTailLines([0,1,1,1,1,1,0,1,]);
		}

		document.getElementById("left").onclick = function(){
			game.left();
		}
		document.getElementById("left").onclick = function(){
			game.left();
		}
	}
	var start = function(){
		var doms = {
			gameDiv :document.getElementById("remote_game"),
			nextDiv :document.getElementById("remote_next"),
			recodeDiv :document.getElementById("remote_recode"),
			timeDiv :document.getElementById("remote_time"),
			gameOverDiv:document.getElementById("remote_gameOver")
		}
		game = new Game();
		game.init(doms);
		
	}
	this.start = start;
	this.bindEvents = bindEvents;
}