/* 读取接口设置 */
var onJson = onJson.prototype{
	//接口01
	myInterface01:function(name,data){
		//格式化JSON参数
		var dataObj = eval("("+data+")");
		//设置默认值
		var s = $.extend({
				parameter01: "",
				parameter02: "",
				parameter03: ""
				},dataObj);
		this.myOutPut(name,s);
	},
	myInterface02:function(name,data){
		var dataObj = eval("("+data+")");
		var s = $.extend({
				parameter01: "",
				parameter02: "",
				parameter03: ""
				},dataObj);
		this.myOutPut(name,s);
	},
	myInterface03:function(name,data){
		var dataObj = eval("("+data+")");
		var s = $.extend({
				parameter01: "",
				parameter02: "",
				parameter03: ""
				},dataObj);
		this.myOutPut(name,s);
	},
	//设置请求输出
	myOutPut:function(name,s){
		//设置请求地址
		var ddr = "/ajax.json";
		date = onJson(name,s,ddr);



		/* 读取JSON设置
		 * name 'i':'字符串指令'
		 * data 'a':{'参数名':参数}
		 * ddr 请求地址/方式
		 * str 返回数据
		*/
		function onJson(name,data,ddr){
			$.ajax({
				type: "POST",
				url: ddr,
				cache: false,
				processData:false,
				data: data,
				dataType: "JSON",
				success: function(data,status){
					var str = data;
				}
			});
			return str;
		}
	}
}