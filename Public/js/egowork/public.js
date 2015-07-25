/* 扩展ajax方便插入HTML页面 */
var result;
var uname; 
function insertHtml(url,id,wedget,obj){
	var mturl = url;
	$(id).load(mturl,function(){
		if(wedget==true){
			$(id+" .J_KCWidget").J_KCWidget();
		}
		if(id=="#main"){
			changeTagA();
		}
		if(id=="#header"){
			changeReport();
		}
		if(wedget==true){
			mainAnimate();
		}
	});
	if(typeof(obj)=="object"){
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
	}
}

/* 请求传输页面 */
function isPostGet(id,iurl,itype){
	mytype = (itype=="POST") ? "POST" : "GET";
	myurl = iurl.split("?");
	if(myurl[1]=="undefined"){
		myurl[1]="";
	}
	$(id).empty();
	$.ajax({
		type: mytype,
		url: myurl[0],
		cache: false,
		data: myurl[1],
		dataType: "html",
		success: function(data,status){
			$(id).append(data);
		}
	});
}

/* 替换所有NAME为kc_main的A标签点击页面显示到内容区 */
function changeTagA(){
	var aArray = $("a[name='kc_main']").toArray();
	$.each(aArray,function(i,n){
		var oldhref = n.href;
		$(n).attr({"href":"javascript:isPostGet('#main','"+oldhref+"','GET');"});
	});
};

/* 表单提交 */
function submitForm(obj){
	var iurl = $(obj).attr("action");
	var inputArray = $(obj+" input").attr("value").toArray();
	alert($(obj+" input").attr("value"));
	var options = {
		url: iurl,
		type: "POST",
		dataType: "html",
		data: inputArray,
		success: function(data,status){
			$("#main").empty();
			$("#main").append(data);
		}
	};
	//将options传给ajaxForm
	$(obj).ajaxSubmit(options);
	return false;
}

/* 签到心情切换 */
function changeReport(){
	$("#report img").on("click",function(){
		$("#report-detail").toggle();
		$("#report-detail li").on("click", function(){
			var str = "images/" + $(this).attr("id") + ".png";
			var report = $("#report img");
			var score = Math.ceil(Math.random()*10);
			report.attr("src",str);
			report.css({"width":"26px","padding":"0 20px 0 9px","cursor":"default"});
			report.trigger("click");
			report.off("click");
			$("#score").attr("style","display:block");
			$("#score").html("+" + score + "分").fadeOut(5000);
		});
	});
}

/* 隐藏点滴心情圆球区默认信息 */
function circleChangeNone(){
	$(".circle .icon_01").attr("style","display:none");
	$(".circle .icon_02").attr("style","float:left;margin:30px 20px 0 30px;");
	$(".circle .icon_03").attr("style","display:block");
	$(".circle .info").attr("style","display:none");
	$(".circle .btn").attr("style","display:none");
}

/* 显示点滴心情圆球区默认信息 */
function circleChangeBlock(){
	$(".circle .icon_01").attr("style","display:block");
	$(".circle .icon_02").attr("style","float:right;margin: 55px 20px 0 0;");
	$(".circle .icon_03").attr("style","display:none");
	$(".circle .info").attr("style","display:block");
	$(".circle .btn").attr("style","display:block");
}
/* 点滴心情弧形滚动列表 */
function roundList(flag){
	//获取列表弧形数组
	var round = $("#roundlist .list").toArray();
	//计算滚动高度
	var mun = $("#roundlist").attr("rel");
	
	num = mun*1;
	if (flag==0){num=0;}
	var hi = -80*num;
	$("#roundlist").animate({
		top: hi+"px"
	  }, 1000);
	//返回新高度
	num++;
	$("#roundlist").attr("rel",num);
	var roundList = $("#roundlist div[name='show']").toArray();
	$.each(roundList, function(i,n){
		$(this).attr('class','list list'+i);
		if(i==0)$(this).animate({marginLeft:"70"}, 1000 );
		if(i==1)$(this).animate({marginLeft:"30"}, 1000 );
		if(i==2)$(this).animate({marginLeft:"0"}, 1000 );
		if(i==3)$(this).animate({marginLeft:"0"}, 1000 );
		if(i==4)$(this).animate({marginLeft:"30"}, 1000 );
		if(i==5)$(this).animate({marginLeft:"70"}, 1000 );
	});
	var lastOne = $("#roundlist div[name='over']").last();
	$(lastOne).fadeTo(500,0);

	$.each(round, function(i,n){
		if($(this).attr('name')=="show"){
			$(this).attr("name","over");
			return false;
		}
	});
	var firstOne = $("#roundlist div[name='over']").last().html();
	//$("#roundlist").append('<div class="list" name="show">'+firstOne+'</div');
}

function dchuifubox(obj){
	var li = $(obj).parent().parent().parent();
	li.attr("class","plselect");
	obj.attr("style","display:none;");
	obj.next().attr("style","display:inline;");
}

function dchuifuclose(obj){
	var li = $(obj).parent().parent().parent();
	li.attr("class","");
	$(obj).attr("style","display:none;");
	$(obj).prev().attr("style","display:inline;");
}

function iAreaChange(name,type){
	if(type=="empty"){
		$(name).empty();
	}
	if(type=="remove"){
		$(name).remove();
	}
	if(type=="none"){
		$(name).attr("style","display:none;");
	}
	if(type=="show"){
		$(name).attr("style","display:block;");
	}
}

function resumepostbox(obj){
	if($(".resume_list").attr("style") == "height:266px;"){
		$(".resume_list").attr("style","height:416px");
	}else{
		$('.resume_post').fadeTo("slow",1);
		$('.resume_list').attr('style','height:266px;');
	}

	if($(".button").attr("style") == "display:none;"){
		$(".resume_post").attr("style","margin-top:140px;");
		$(".button").attr("style","display:block;");
	}else{
		$('.resume_post').fadeIn("slow");
		$(".resume_post").animate({marginTop:"0"}, 1000 );
		$('.button').attr('style','display:none;');
	}
}

function changeDivToInput(name,type){
	//获取节点数组
	var iArray = $(name).find(".li_OBJ").toArray();
	//根据类型不同设置不同的改变方式
	if(type=="input"){
		if($(name).find(".li_OBJ > input").length>0) return;
		$.each(iArray, function(i,n){
			//获取节点内文字与节点名称,并格式化json格式数据
			var dataObj = eval("("+$(this).attr("data")+")");
			//设置默认数据进行覆盖
			var data = $.extend({
				name:"lili",
				mold:"input",
				type:"text",
				iarr:""
			},dataObj);
			var imold = data.mold;
			var iname = data.name;
			var itype = data.type;
			var itext = $(this).html();
			if(itype=="radio"||type=="checkbox"){
				var str = data.iarr;
				var arrs= new Array();
					strs=str.split(",");
				var ihtml = "";
				for(i=0;i<strs.length;i++){
					var check = i==0 ? 'checked="checked"' : '';
					ihtml += "<"+imold+" type="+itype+" name='"+iname+"' value='"+strs[i]+"' "+check+" /><i>"+strs[i]+"</i>";
				}
				$(this).html(ihtml);
			}else if(itype=="textarea"){
				$(this).html("<"+imold+" name='"+iname+"'>"+$(this).html()+"</"+imold+">");
			}else{
				$(this).html("<"+imold+" type="+itype+" name='"+iname+"' value='"+itext+"' />");
			}
		});
	}else if(type=="div"){
		var itext = "";
		if($(name).find(".li_OBJ > input").length<1) return;
		$.each(iArray, function(i,n){
			//获取节点内文字与节点名称,并区别input与textarea
			if(typeof($(this).find("input").val()) != "undefined"){
				itext = $(this).find("input").val();
			}else if(typeof($(this).find("textarea").val()) != "undefined"){
				itext = $(this).find("textarea").val();
			}
			$(this).html(itext);
		});
	}
}


/* 设置侧栏控制器窗口滚动出现 */
function mainAnimate(){
	$("#main").animate({width: '1%'},1).animate({width: '100%'},"slow");
};


$(document).ready(function() {
	
	$(".J_KCWidget").J_KCWidget();
	mainAnimate();
	changeReport();
	story_input();
	changeTextBox();
	changeNum();
	postbox();
	play_huifubox();
	story_huifubox();
$(".icomment").on("click",function(){
		circleChangeNone();
	});

	/*$(".resume_post .hand").on("click",function(){
		J_KCWidget.$['resume_post'].fn.close();
	});*/

	var close_dchuifu = $(".discuss_con .close_dchuifu");
	if(close_dchuifu.length > 0){
		close_dchuifu.each(function(i){
			$(this).on("click",function(){
				J_KCWidget.$['pinglun'+(i+1).toString()].fn.close();
				dchuifuclose($(this));
			});
		});
	}

	$(".playinfocolse2").on("click",function(){
		J_KCWidget.$['bigimg2'].fn.close();
	});
	$(".playinfocolse1").on("click",function(){
		hidediv('pop_canjia','none');
	});

	$("#EntTime").on("click",function(){
		return showCalendar('EntTime', 'y-mm-dd','tr');
	});

	$(".setupicon .close").on("click",function(){
		J_KCWidget.$['icon'].fn.close();
	});

	$(".rhand .rhand_ccc").on("click",function(){
		J_KCWidget.$['icon'].fn.close();
	});

	$(".passitem .close").on("click",function(){
		J_KCWidget.$['password'].fn.close();
	});

	$("#centerEdit").on("click",function(){
		changeDivToInput('.information','input');
	});
	$("#centerUpdate").on("click",function(){
		changeDivToInput('.information','div');
	});

	/*$("input[name='usericon']").on("change",function(){
		var purl = $("input[name='usericon']").val();
		alert("请添加上传组件 添加 "+ purl +" 文件")
		//$("textarea[name='info']").val(purl);
	});*/

});

/* 编故事input切换 */
function story_input(){
	$(".inote").on("click",function(){
		$(this).hide();
		$(".dnote").show();
		$(".imassge").show();
	});

	$(".dnote").find('.botton').on("click",function(){
		$(".inote").show();
		$(".dnote").hide();
		$(".imassge").hide();
	});
}

function changeTextBox(){
	var listitem = $(".issquare .list");
	//alert(listitem.length);
	listitem.on("click",function(){
		$(".circle .info p").html($(this).find('.txt').html());
		$(".circle .icon_02").html($(this).find('.icon').html());
	});

}

function changeNum(){
	var upitem = $(".chgood");
	upitem.each(function(i){
		$(this).on("click",function(){
			zan();
			/*if($.cookie('change' + i) == i){
				//alert($.cookie('change' + i));
			}else{
				$.cookie('change'+i,i,{expires:1});
				$(this).next().html(parseInt($(this).next().html()) + 1);
			}*/
		});
	})
	var upitem = $(".resumerun .chbadly");
	upitem.each(function(i){
		$(this).on("click",function(){
			bi();
			/*if($.cookie('change' + i) == i){
				//alert($.cookie('change' + i));
			}else{
				$.cookie('change'+i,i,{expires:1});
				$(this).next().html(parseInt($(this).next().html()) + 1);
			}*/
		});
	})
}
/////////////////////////




function postbox(obj){
	var listitem = $(".resumerun .list");
	listitem.each(function(i){
		var  post_list = $(this).find(".post_list");
		var  list = $(this);
		$(this).find(".open").on("click",function(){
			$(this).next().attr("style","display:inline");
				post_list.css("display","block");
				list.css("height","auto");
		});

		$(this).find(".close").on("click",function(){
			$(this).attr("style","display:none");
				post_list.css("display","none");
				list.css("height","101px");
		});
	})
}

function play_huifubox(){
	$(".play_huifu a").on("click",function(i){
		$(".left_discuss .content").css("height","250px");
	});
	$(".play_huifu_post").on("click",function(i){
		 submit_discuss();
		$(".left_discuss .content").css("height","320px");
	});
}

function story_huifubox(){
	$(".story_post2").on("click",function(i){
		$(".resumepostbox").css("display","block");
		if($(".resume_list").attr("style") == "height:266px;"){
			$(".resume_list").attr("style","height:416px");
		}else{
			$('.resume_post').fadeTo("slow",1);
			$('.resume_list').attr('style','height:266px;');
		}

		if($(".button").attr("style") == "display:none;"){
			$(".resume_post").attr("style","margin-top:140px;");
			$(".button").attr("style","display:block;");
		}else{
			$('.resume_post').fadeIn("slow");
			$(".resume_post").animate({marginTop:"0"}, 1000 );
			$('.button').attr('style','display:none;');
		}
	});
}


function post_comment(){
	
	  var content=$("textarea[name=comment]").val();
      text=$('<div class="list list'+i+'" name="show"><div class="txt">'+content+'</div></div>');
	  var icon=$('<div class="icon"></div>');
	  uname=getCookie("uname");
	 /* var types={"i":"find_userinfo","a":{"_id": uname, }};
	    b=JSON.stringify(types);
   			$.post("/ajax.json",b,
     		function(x)
	 		{  result=x.c;
			   var img = new Image();
			     img.src=result.b64img;
				 imgsource=result.b64img;
				  $(img).css({"height":"40px","width":"40px"});
				 $(icon).append(img);
			},"json"	);*/
			
         $(text).append(icon);
	     $("#roundlist").append(text);
	var types={"i":"publish_comment","a":{"target": mood_id[present], "content": content, "type":"microblogs"}};
	publish(types);
	console.log("上传评论");	
	J_KCWidget.$['pinglun'].fn.close();
	circleChangeBlock();

}
/////////////////////////////////////////	////////////////////////////
function publish(types)
{
	 b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x.c;
	 if (x.e==0)
        alert("发表成功");	
     else 
		     alert("发表失败");
		   },"json"	);
	
}
////////////////////////////////////
function  cancel()
{  	$('.text-cancel').val("");
  console.log("取消");
};	
/////////////////////////
function getCookie(cookieName) {
var re = new RegExp("\\b"+cookieName+"=([^;]*)\\b");
var arr =  re.exec(document.cookie);
return arr?arr[1]:"";
}
/////////////////////////
function hidediv(id,status)
{
	$('#'+id+'').css({display:status});
}
////////////////////////////////////////
function deposite(parentid,childid)
 { target=document.getElementById(parentid);
   target2=document.getElementById(childid);
   target.removeChild(target2);
  }
/////////////////////////////////////////////
function find_images(user_id,id,height,width)
{
	//alert("");
  var types={"i":"find_images","a":{'query':{"target": user_id,}}}
   b=JSON.stringify(types);
   			$.post("/ajax.json",b,
     		function(x)
	 		{  result=x.c;
			   var img = new Image();
			     img.src=result[0].b64img;
				 imgsource=result[0].b64img;
				  $(img).css({"height":height,"width":width});
				 $(id).append(img);
				// create_img(imgsource);
				 	},"json"	);
}
/////////////////////////////////////////////////
function checking()
{ var uname=getCookie("uname");
  if ((uname="")||(uname=null)){alert("请您先登录"); window.location.href='/static/output/login.html';};
}
//////////////////////////////////////////////////
function personimg(author,i,width,height)
{
	 var types={"i":"find_userinfo","a":{"_id":author, }};
	   b=JSON.stringify(types);
   			$.post("/ajax.json",b,
     		function(x)
	 		{   result1=x.c;
			   //text=$('<div class="list list'+i+'" name="show"><div class="txt">'+comment_content[j]+'</div></div>');
			   	//var icon=$('<div class="icon" ></div>');
			      var img = new Image();
			     img.src=result1.b64img;
			   $(img).css({"height":height,"width":width});
			   if (i==0)
			   { document.getElementById('pic0').innerHTML=""; $("#pic0").append(img);	}
			   if (i==1)
			    { document.getElementById('pic1').innerHTML=""; $("#pic1").append(img);	}
				if (i==2)
			    { document.getElementById('pic2').innerHTML=""; $("#pic2").append(img);	}
				// $(icon).append(img);
		    //  	$(text).append(icon);
	        //$(".icon_02").append(text);	
				
    
			},"json"	);
			//setTimeout(500);	  
    	console.log("得到图像");			
}