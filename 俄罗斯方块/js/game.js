//游戏核心代码
var Game = function(){
	//dom元素
	var gameDiv,nextDiv;
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
		[0,1,0,0,0,0,0,0,0,0],
		[1,1,0,0,0,0,0,0,0,0],
		[1,1,2,2,2,2,0,0,0,0]
	];
	//当前方块   下一个方块
	var cur,next;
	//渲染div
	var nextDivs = [];
	var gameDivs = [];
	//初始化div
	var initDiv = function(initData, initDivArray,elem){
		console.log(initData.length);
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
	//初始化
	var init = function(doms){
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		cur = new Square();
		next = new Square();
		initDiv(gameData,gameDivs,gameDiv);//用div填充游戏区
		initDiv(next.data,nextDivs,nextDiv);//用div填充待出现方块区
		
		refresh(gameData,gameDivs);
		refresh(cur.data,nextDivs);
	}
	this.init = init;
}
