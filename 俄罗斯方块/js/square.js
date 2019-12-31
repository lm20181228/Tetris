// 方块处理 左移，右移，旋转，下落。
var Square = function(){
	//方块数据
	this.data = [
		[2,2,2,0],//(0,0)(0,1)(0,2)(0,3)
		[0,0,2,0],//(1,0)(1,1)(1,2)(1,3)
		[0,0,2,0],//(2,0)(2,1)(2,2)(2,3)
		[0,0,2,0] //(3,0)(3,1)(3,2)(3,3)
	];
	//原点
	this.origin = {
		x : 0,
		y : 0
	};
	//旋转数组
	this.totates =function(data){
		var sArray=[
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		]
        for(var i = 0;i < data.length; i++){
            var newIndex =4;
            for(var j =0; j <data[0].length; j++){
                
                sArray[newIndex][j] = data[i][j]
            }
            newIndex--;
        }
        return sArray;
   }
}
Square.prototype.canRotate = function(isValid){
	this.data = this.totates(this.data);
	return isValid(this.origin,this.data);
}
Square.prototype.rotate = function(isValid){
	this.data = this.totates(this.data);
}
Square.prototype.canDown = function(isValid){
	var test = {};
	test.x = this.origin.x + 1;
	test.y = this.origin.y;
	return isValid(test,this.data);
}
Square.prototype.down = function(){
	this.origin.x = this.origin.x+1;
}
Square.prototype.canRight = function(isValid){
	var test = {};
	test.x = this.origin.x ;
	test.y = this.origin.y +1;
	return isValid(test,this.data);
}
Square.prototype.right = function(){
	this.origin.y = this.origin.y + 1;
}
Square.prototype.canLeft = function(isValid){
	var test = {};
	test.x = this.origin.x ;
	test.y = this.origin.y - 1;
	return isValid(test,this.data);
}
Square.prototype.left = function(){
	this.origin.y = this.origin.y - 1;
}
