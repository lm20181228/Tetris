// 本地游戏区
var Local = function(){
	//游戏对象
	var game;
	//定时器
	var timer = null;
	//时间间隔
	var INITERVAL = 600;
	//计时效果
	timeCount = 0;
	//时间
	var time = 0;
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
			game.fixed();//判断是否固定游戏块
			game.checkClear();//判断是否清行
			if(game.checkGameOver()){
				//判断游戏是否结束
				stop();
				game.GameOver(true)
			}else{
				game.performNext();
			}
		}
	}
	// 随机生成干扰行
	var generataBottomLine = function(lineNum){
		var lines = [];
		for(var i =0; i < lineNum; i++){
			var line = [];
			for(var j = 0; j<10; j++){
				line[j]=Math.floor(Math.random()*2);
			}
			lines.push(line);
		} 
		return lines;
	}
	//计时函数
	var timeunc = null;
	var timeFunc = function(){
		timeunc = setInterval(function(){
			time++;
			game.setTime(time);
			if( time % 10 ==0){
				game.addTailLines(generataBottomLine(1));
			}
		},1000) ;

	}
	//设置时间
	//开始
	var start = function(){
		var doms = {
			gameDiv :document.getElementById("local_game"),
			nextDiv :document.getElementById("local_next"),
			recodeDiv :document.getElementById("local_recode"),
			timeDiv :document.getElementById("local_time"),
			gameOverDiv:document.getElementById("local_gameOver")
		}
		game = new Game();
		game.init(doms);
		bindKeyEvent();
		//计时系统
		timeFunc();
		//定时器效果，方块自由下落效果
		timer = setInterval (move ,INITERVAL) 
	}
	//结束
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		if(timeunc){
			clearInterval(timeunc);
			timeunc = null;
		}
		document.onkeydown = null;
	}
	//导出API
	this.start = start;
}
