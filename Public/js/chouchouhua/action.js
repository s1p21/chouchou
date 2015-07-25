// JavaScript Document
// 隐藏画板

$(document).on('click','#draw_hidden',function(){
		hiddenDraw();
})
// 显示画板
$(document).on('click','.I_draw',function(){
		    $("#right").css('display','none');
		    $("#draw").css('display','block');
			$('#bgDiv').css('width',$(window).width());
			$('#bgDiv').css('height',$(window).height());
			$('#bgDiv').css('display','block'); 
});	 

function hiddenDraw(){
		$("#draw").css('display','none');
		$("#right").fadeIn(1000);
		$("#bgDiv").fadeOut(10);
}
