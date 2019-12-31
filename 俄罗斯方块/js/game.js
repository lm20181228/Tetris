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
		//实例化方块数据
		cur = new Square();
		next = new Square();
		//初始化游戏区的所有方块布局
		initDiv(gameData,gameDivs,gameDiv);//用div填充游戏区
		initDiv(next.data,nextDivs,nextDiv);//用div填充待出现方块区
		//初始化原点位置
		cur.origin.x = 10;
		cur.origin.y = 5;
		//在game游戏区更新掉落方块的位置。所以就是需要把当前方块的位置赋值到game游戏区的对应位置。
		for(var i = 0; i < cur.data.length; i++){
			for(var j = 0; j< cur.data[0].length; j++){
				gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
			}
		}
		//刷新游戏区方块布局
		refresh(gameData,gameDivs);
		refresh(cur.data,nextDivs);
	}
	//导出API
	this.init = init;
}
