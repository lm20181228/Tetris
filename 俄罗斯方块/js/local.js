// 本地游戏区
var Local = function(socket){
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
					socket.emit("fall");
					break;
				case 37:
					//left;
					game.left();
					socket.emit("left");
					break;
				case 38:
					//top 切换形态
					game.rotate();
					socket.emit("rotate");
					break;
				case 39:
					//right；
					game.right();
					socket.emit("right");
					break;
				case 40:
					//down;
					game.down();
					socket.emit("down");
					break;
				default :
					break;
				
			}
		}
	}
	//移动
	var move = function(type){
		if(!game.down()){
			game.fixed();//判断是否固定游戏块
			socket.emit("fixed");
			//判断是否清行
			var lines = game.checkClear();
			if(lines > 0){
				socket.emit("ckeckClear");
				// game.addTailLines(lines);
				// 新增干扰行 
			 	socket.emit("addTailLines",{lines:lines})
			}
			
			if(game.checkGameOver()){
				console.log("游戏结束")
				//判断游戏是否结束
				stop();
				game.GameOver(false);
				socket.emit("lose",false);
			}else{
				var genType = generataType();
				game.performNext(genType);
				socket.emit("performNext",{type:genType})
			}
		}else{
			socket.emit("down")
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
	var generataType = function(){
		var index = Math.ceil(Math.random()*7);
		return index;
	}
	//计时函数
	var timeunc = null;
	var timeFunc = function(){
		timeunc = setInterval(function(){
			time++;
			game.setTime(time);
			socket.emit("setTime",{time:time})
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
		var genType = generataType();
		game.init(doms,genType);
		socket.emit("init",{type:genType})
		bindKeyEvent();
		var t = generataType();
		game.performNext(t);
		socket.emit("next",{type:t})
		//计时系统
		timeFunc();
		//定时器效果，方块自由下落效果
		timer = setInterval (function(){
			move(t) 
		},INITERVAL)
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
	
	socket.on("start",function(){
		document.getElementById("wait").innerHTML = "";
		start();
	})
	socket.on("addTailLines",function(data){
		var lines = generataBottomLine(data.lines);
		game.addTailLines(lines)
		socket.emit("addTailLinesLocal",{lines:lines});
	})
	socket.on("lose",function(data){
		stop();
		game.GameOver(true);
		socket.emit("win")
	})
	socket.on('leave',function(){
		document.getElementById("local_gameTips").innerHTML = "对方已掉线！";
		document.getElementById("remote_gameTips").innerHTML ="已掉线！" 
		stop();
	})
	/*this.start = start;*/
}
