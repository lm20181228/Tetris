//游戏核心代码
var Game = function(){
	//dom元素
	var gameDiv,nextDiv,timeDiv,scoreDiv,gameOverDiv;
	//游戏矩阵
	var gameData = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	//当前方块   下一个方块
	var cur,next;
	//渲染div
	var nextDivs = [];
	var gameDivs = [];
	//初始化div
	var initDiv = function(initData, initDivArray,elem){
		for(var i = 0; i < initData.length;  i++){
			var gameDiv = [];
			for(var j = 0; j <initData[0].length; j++){
				var newNode = document.createElement("div");
				newNode.className = "none";
				newNode.style.top = (i*20) + "px";
				newNode.style.left = (j*20) +"px";
				elem.appendChild(newNode);
				gameDiv.push(newNode);
			}
			initDivArray.push(gameDiv);
		}
	}
	//刷新div
	var refresh = function(initData,initDivArray){
		for(var i = 0; i<initData.length; i++){
			for(var j = 0; j<initData[0].length; j++){
				switch(initData[i][j]){
					case 0:
						initDivArray[i][j].className = 'none'
						break;
					case 1:
						initDivArray[i][j].className = 'done';
						break;
					case 2:
						initDivArray[i][j].className = 'current';
						break;
					default:
						break;
				}
			}
		}
	}
	//检测点是否合法
	var check = function(pos,x,y){
		if(pos.x + x < 0){
			//上边界
			return false;
		}else if(pos.x + x >= gameData.length){
			//下边界
			return false;
		}else if(pos.y + y < 0){
			//左边界
			return false;
		}else if(pos.y + y >=gameData[0].length){
			//右边界
			return false;
		}else if(gameData[pos.x + x][pos.y + y] ==1){
			//位置上已经有完成的方块
			
			return false;
		}else{
			return true;
		}
	}
	//检测数据是否合理
	var isValid = function(pos,data){
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j <data[0].length; j++){
				if(data[i][j] != 0){
					if(!check(pos,i,j)){
						return false;
					}
				}
			}
		}
		return true;
	}
	//清除数据
	var clearData = function(){
		
		for(var i = 0; i < cur.data.length; i++){
			for(var j = 0; j< cur.data[0].length; j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x + i][cur.origin.y + j] = 0;
				}
			}
		}
	}
	//设置数据，修改方块下落位置
	var setData = function (){
		for(var i = 0; i < cur.data.length; i++){
			for(var j = 0; j< cur.data[0].length; j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
				}
			}
		}
	}
	//旋转
	var rotate = function(){
		if(cur.canRotate(isValid)){
			clearData();
			cur.rotate();
			setData();
			refresh(gameData,gameDivs);
		}
	}
	//下移
	var down = function(){
		//初始化原点位置
		if(cur.canDown(isValid)){
			clearData();
			cur.down();
			setData();
			refresh(gameData,gameDivs);
			return true;
		}else{
			return false;
		}
	}
	//右移动
	var right = function(){
		if(cur.canRight(isValid)){
			clearData();
			cur.right();
			setData();
			refresh(gameData,gameDivs);
		}
	}
	//左移动
	var left = function(){
		if(cur.canLeft(isValid)){
			clearData();
			cur.left();
			setData();
			refresh(gameData,gameDivs);
		}
	}
	//方块移动到底部的时候，固定
	var fixed = function(){
		for(var i = 0; i <cur.data.length; i++){
			for(var j=0;j<cur.data[0].length; j++){
				if(check(cur.origin,i,j)){
					if(gameData[cur.origin.x + i][cur.origin.y + j] == 2){
						gameData[cur.origin.x + i][cur.origin.y + j] = 1
					}
				}
			}
		}
		refresh(gameData,gameDivs);
	}
	//使用下一个方块
	var performNext = function(type){
		cur = next;
		setData();
		next = SquareFactory.prototype.make(type);
		refresh(gameData,gameDivs);
		refresh(next.data,nextDivs)
	}
	//消行方法
	var checkClear = function(){
		var lines = 0; 
		//从底部开始判断，从下往上，遇到一整排符合条件的，删除
		for(var i =gameData.length -1;i>=0;i--){
			var clear = true;
			for(var j =0;j<gameData[0].length; j++){
				if(gameData[i][j]!==1){
					clear = false;
					break;
				}
			}
			if(clear){
				for(var m=i; m>0;m--){
					for(var n =0;n<gameData[0].length;n++){
						gameData[m][n] = gameData[m-1][n]
					}
				}
				for(var n=0;n<gameData[0].length;n++){
					gameData[0][n] = 0;
				}
				
				lines++;
				i++;
			}
		}
		addScore(lines);
		return lines;
	}
	//判断游戏是否结束
	var checkGameOver = function(){
		var gameOver = false;
		for(var i = 0;i<gameData[0].length;i++){
			if(gameData[1][i] == 1){
				gameOver = true;
			}
		}
		return gameOver;		
	}
	// 游戏结束
	var GameOver =  function(flag){
		console.log("00000000000000000")
		gameOverDiv.style.display = "block";
		var titleP = document.createElement("p");
		if(flag){
			titleP.innerHTML = "恭喜你战胜对方，获得本次对战的胜利！！"
			titleP.style.color = "green";
			titleP.style.background = "#fff"
		}else{
			titleP.innerHTML = "很遗憾你输了，再来一次吧。"
			titleP.style.color = "red";
			titleP.style.background = "#000"
		}

		gameOverDiv.appendChild(titleP);
		return false;
		
	}
	// 底部增加行
	var addTailLines = function(lines){
		// 把现有的游戏数据往上移动 lines 行，然后在空出的地方添加新的干扰行
		for(var i = 0; i < gameData.length - lines.length; i++){
			gameData[i] = gameData[i + lines.length];
		}
		for(var i = 0; i <lines.length; i++){
			gameData[gameData.length - lines.length + i] = lines[i];
		}
		cur.origin.x = cur.origin.x - lines.length;
		if(cur.origin.x	< 0 ){
			cur.origin.x = 0;
		}
	}
	//初始化
	var init = function(doms,type){
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		timeDiv = doms.timeDiv;
		scoreDiv = doms.recodeDiv;
		gameOverDiv = doms.gameOverDiv;

		//实例化方块数据
		cur = SquareFactory.prototype.make(type);
		next = SquareFactory.prototype.make(type);
		//初始化游戏区的所有方块布局
		initDiv(gameData,gameDivs,gameDiv);//用div填充游戏区
		initDiv(next.data,nextDivs,nextDiv);//用div填充待出现方块区
		
		//在game游戏区更新掉落方块的位置。所以就是需要把当前方块的位置赋值到game游戏区的对应位置。
		setData();
		//刷新游戏区方块布局
		refresh(gameData,gameDivs);
		refresh(next.data,nextDivs);
	}
	//设置分数
	var record = 0;
	var addScore = function(num){
		record+=num;
		scoreDiv.innerHTML = record;
	}
	var setTime = function(time){
		timeDiv.innerHTML = time;
	}
	//导出API
	this.init = init;
	this.down = down;
	this.right = right;
	this.left = left;
	this.rotate = rotate;
	this.fall= function(){
		while(down()){
			down();
		}
		return false;
	}
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.setTime =setTime;
	this.addScore = addScore;
	this.GameOver = GameOver;
	this.addTailLines = addTailLines;
}
