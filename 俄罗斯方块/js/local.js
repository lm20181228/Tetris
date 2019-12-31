// 本地游戏区
var Local = function(){
	//游戏对象
	var game;
	//开始
	var start = function(){
		var doms = {
			gameDiv :document.getElementById("game"),
			nextDiv :document.getElementById("next")
		}
		game = new Game();
		game.init(doms);
	}
	//导出API
	this.start = start;
}
