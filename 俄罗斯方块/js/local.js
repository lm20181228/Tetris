// 本地游戏区
var Local = function(){
	//游戏对象
	var game;
	//定时器
	var timer = null;
	//时间间隔
	var INITERVAL = 600;
	//绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			switch(e.keyCode){
				case 32:
					//space;
					game.fall();
					break;
				case 37:
					//left;
					game.left();
					break;
				case 38:
					//top 切换形态
					game.rotate();
					break;
				case 39:
					//right；
					game.right();
					break;
				case 40:
					//down;
					game.down();
					break;
				default :
					break;
				
			}
		}
	}
	//移动
	
	var move = function(){
		if(!game.down()){
			game.fixed();
			game.checkClear();
			game.performNext();
		}
	}
	//开始
	var start = function(){
		var doms = {
			gameDiv :document.getElementById("game"),
			nextDiv :document.getElementById("next")
		}
		game = new Game();
		game.init(doms);
		bindKeyEvent();
		//定时器效果，方块自由下落效果
		timer = setInterval (move ,INITERVAL) 
	}
	//导出API
	this.start = start;
}
