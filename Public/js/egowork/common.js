var pager = function( options ) {

};
//签到js代码，score代表每次签到分数
var mood =function(options,score){
    if(options == 0){
        $("#report img").on("click",function(){
            $("#report-detail").toggle();
        });
        $("#report-detail li").on("click", function(){
            var str = "./static/images/" + $(this).attr("id") + ".png";
            var report = $("#report img");
            report.attr("src",str);
            report.css({"width":"26px","padding":"0 20px 0 9px","cursor":"default"});
            report.trigger("click");
            report.off("click");
            $("#score").html("+" + score + "分").fadeOut(5000);
        });
   }
}

/* 设置侧栏控制器窗口滚动出现 */
$(document).ready(function() {
	$("#main").animate({width: '1%'},1).animate({width: '100%'},"slow");
})

function text_cancel(){
		$('.text-cancel').val("");
	}
