// 方块处理 左移，右移，旋转，下落。
var Square = function(){
	//方块数据
	this.data = [
		[0,0,2,0],
		[0,0,2,0],
		[0,0,2,0],
		[0,0,2,0]
	];
	//原点
	this.origin = {
		x : 0,
		y : 0
	}
}
Square.prototype.canDown = function(isValid){
	var test = {};
	test.x = this.origin.x + 1;
	test.y = this.origin.y+1;
	return isValid(test,this.data);
}
Square.prototype.down = function(){
	this.origin.x = this.origin.x+1;
}
