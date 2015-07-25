$('.mood_publish').bind('click', function(){
		mood_publish();});

$('.storm_publish').bind('click', function(){
	storm_publish();});

$('.play_publish').bind('click', function(){
		play_publish();});
	
$('.choose-building').bind('click', function(){
	alert("");
	choose_building();});
	
$('.building_confirm').bind('click', function(){
	alert("");
	building_confirm();});
	



		
var target_id;	
var imgurl=0;	
var present_type;
function show_img(){	   $(".publish-inner").fadeOut(0);	   $(".cicon").fadeIn(100); }
function  show_edit(){		$(".cicon").fadeOut(0);	 	   $(".publish-inner").fadeIn(1000);  }
function  pic_cancel(){	show_edit();imgurl="";}
/////////////////////////////////////////
function create_img(source)
{			 document.getElementById('crop_result').innerHTML="";   
          var img = new Image();
                img.src=source;
				 imgurl=source;
				/*var imgcon=document.getElementById('panel');
				  var imgcontext=imgcon.getContext('2d');
	            img.onload = function(){imgcontext.drawImage(img,0,0 ,imgcontext.canvas.width , imgcontext.canvas.height);}*/
				$(img).css({"height":"108px","width":"100px"});
				 $("#crop_result").append(img);
				  document.getElementById('panel').innerHTML="";   
          		var image = new Image();
                image.src=source;
				 $(image).css({"height":"231px","width":"173px"});
				 $("#panel").append(image);
}

	
//////////////////////////////////////
function mood_publish()
{	
	var content=$("textarea[name=info]").val();
	var types={"i":"publish_microblog","a":{"content": content,"type":"microblogs"}};
	present_type="microblogs";
    publish(types)
	console.log("心情上传");
};
/////////////////
function storm_publish()
 {      var content=$(".mind-text").val();
       var tit=$(".mind-title").val();
        title=tit.substring(3,tit.length);
		 var types={"i":"publish_question","a":{"content": content,"title":title,"type":"questions"}};
		 present_type="questions";
		publish(types);
      	console.log("头脑风暴上传");
}
/////////////////////
function play_publish()
{
	 var content=$(".play-text").val();
       var tit=$(".play-title").val();
        title=tit.substring(3,tit.length);
		  if ((!title)||(!content)) alert("主题或内容不能为空");
		  else
		  {
			var fromdate=$("#EntTime1").val();
			var todate=$("#EntTime2").val();
			 if (fromdate>todate) alert("结束日期不能早于开始日期"); 
			  else{	 var types={"i":"publish_event","a":{"content": content,"title":title,"fromdate":fromdate,"todate":todate,"type":"events"}};
			         present_type="events";
			        publish(types);
			      }
		  }
			console.log("一起玩上传");
}
////////////////////////
function choose_building()
{
		console.log("选择大楼");
}
/////////////////////////
function building_confirm()
{
	console.log("确定大楼");
}
///////////////////////////
function addimg()
{
		console.log("添加图片");
}
//////////////////////////////////////////
function publish(types)
{  
	 b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x;
	   if (x.e==0)
         {target_id=result.c; $('.text-cancel').val("");   if (imgurl=="") alert("发表成功"); }
     else 
		     alert("发表失败");
		   },"json"	);
  setTimeout(publish_images,500);
}
///////////////////////////////////////////////
function publish_images()
{ if (imgurl!=0)
  {   
   var types={"i":"publish_image","a":{"b64img":imgurl,"_id":target_id,"type":present_type,}}
     b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x;
	 if (x.c)  alert("发表成功")
     else 
		 alert("发表失败");
	 },"json"	);
//	imgsource=imgurl;
	//find_image();
	console.log("头像上传");
	imgurl==0;
	document.getElementById('panel').innerHTML="";
	document.getElementById('crop_result').innerHTML="";
  }
}
