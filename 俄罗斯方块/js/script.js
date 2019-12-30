// 生成待出现方块坐标
var nextData = [
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0]
];
//游戏区域的坐标处理 
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
// 初始化游戏区和掉落方块区的div
var nextDivs = [];
var gameDivs = [];
var initGame = function(initData, initDivArray,elem){
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
// 根据相应坐标对对应点的div做处理
initGame(gameData,gameDivs,document.getElementById("game"));//用div填充游戏区
initGame(nextData,nextDivs,document.getElementById("next"));//用div填充待出现方块区

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
refresh(gameData,gameDivs);
refresh(nextData,nextDivs);