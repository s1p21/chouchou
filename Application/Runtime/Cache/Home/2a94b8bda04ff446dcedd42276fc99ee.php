<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <!-- 添加资源文件 -->
  <head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>丑丑画</title>
<link rel="stylesheet" type="text/css" href="/chouchouhua/Public/css/draw.css" />
<script type="text/javascript" src="/chouchouhua/Public/inc/jquery.1.8.2.min.js"></script>


	<!-- jQuery -->

<script type="text/javascript" src="/chouchouhua/Public/inc/jquery.ui.core.min.js"></script>	
<script type="text/javascript" src="/chouchouhua/Public/inc/jquery.ui.widget.min.js"></script>
<script type="text/javascript" src="/chouchouhua/Public/inc/jquery.ui.mouse.min.js"></script>
<script type="text/javascript" src="/chouchouhua/Public/inc/jquery.ui.draggable.min.js"></script>	


<!-- wColorPicker -->
	<link rel="Stylesheet" type="text/css" href="/chouchouhua/Public/inc/wColorPicker.css" />
	<script type="text/javascript" src="/chouchouhua/Public/inc/wColorPicker.js"></script>
	
<!-- wPaint -->
	<link rel="Stylesheet" type="text/css" href="/chouchouhua/Public/inc/wPaint.css" />
	<script type="text/javascript" src="/chouchouhua/Public/inc/wPaint.js"></script>
  

</head>
  <script type="text/javascript">  //////全局变量////////////
     var target_id = new Array(200);
	 var total=0;
	 var presentImage=0;
	 var nowimage;
	 var comment_skip=0,image_skip=0;
	 var totalcomment,author;
	 var bigcanvas1,bigcanvas2;
	 var uname=-1;
	 var paixu=-1;
  </script>
<script type="text/javascript">
  
</script>
 <script type="text/javascript">
$(document).ready(function(){/*渐进渐出效果，改变数字可以改变效果*/
     	  createcanvas(0);
		 
		  $(".drawed").click(function()
			{
				uname=getCookie("uname");
				createcanvas(0);
		    }); 
			$(".hot").click(function()
			{
				paixu=1;
				createcanvas(0);
		    }); 
			$(".looking").click(function()
			{
				paixu=-1;
				uname=-1;
				createcanvas(0);
		    }); 
		$('._wPaint_addImage').click(function()
        {   document.getElementById('upfile').click();
		   $(".fileInput").fadeOut(10); 
		   
		 });
		 $(".page").click(function(){
		 
		 
		 }); 	 
	
	$("#big_hidden").click(function(){
		 $("#imgshow").fadeIn();
	     $("#bigIm").fadeOut();
		 $("#comment_content").val("");
	});
	$(".large").mouseover(function(){
		$(".big_photo_comment").fadeIn(500)
		});

	
 });
</script>
<script type="text/javascript">
	 var isIE=(document.all) ? true:false;
$(function(){
    $("input[type='file']").change(function(evt){
        var files = evt.target.files; 
        for (var i = 0, f; f = files[i]; i++) {
          if (!f.type.match('image.*')) {
            continue;
          }
		  var imgcon=document.getElementById('imgcanv');
          var reader = new FileReader();
           reader.onload = (function(theFile) {
             return function(e) {                                
			 if(!isIE) addImage(imgcon,e.target.result); 
			// $(".fileInput").fadeOut(10); 
	             };
           })(f);
           reader.readAsDataURL(f);
         }
     });
 })
 </script>
 <script type="text/javascript" >
 function devide_img()
  {  
    if (isIE)
	{var ssss=document.getElementById('upfile').value;
	   var imgcon=document.getElementById('imgcanv');
  	   addImage(imgcon,ssss); 
	}
}
</script>
 
<script type="text/javascript">
function creat(i,image_skip,author,paixu)
{
     var wid=132;
	 var he=100;
	  var id=document.getElementById(i);
	    id.parentNode.removeChild(id);
	  var ss=document.createElement('div');
	     ss.id=i;	 
		 var aa=document.getElementById(i+15);
		 aa.appendChild(ss);
      var spans=document.createElement('span');
	 spans.style.height=he+"px"; 
		spans.style.width=wid+"px";
		spans.style.position="absolute";
		spans.id=i;		//i*5+j;
		spans.onclick=Function("xx(this.id)");
	   	var canvas1=document.createElement('canvas');
		    canvas1.style.backgroundColor=""
			canvas1.style.height=he+"px";
			canvas1.style.width=wid+"px";
			canvas1.style.position="absolute";
	    var right=document.getElementById(i);
		right.appendChild(spans);
		  spans.appendChild(canvas1);	
		 	var canvas2=document.createElement('canvas');
		   canvas2.style.backgroundColor=""
			canvas2.style.height=he+"px";;
			canvas2.style.width=wid+"px";
       	canvas2.style.position="absolute";
		   spans.appendChild(canvas2);
		  if (paixu!=-1) {var types={"i":"get_paintings","a":{"query" : {} ,"limit":1,"skip":image_skip, "sort" :[["totalcomment" , -1]]}}}
		  else{
				 if (author==-1)	
				{var types={"i":"get_paintings","a":{"query" : {} ,"limit":1,"skip":image_skip, "sort" :[["datetime" , -1]]}}}
				else 
					{var types={"i":"get_paintings","a":{"query" : {"author":author} ,"limit":1,"skip":image_skip, "sort" :[["datetime" , -1]]}}
					   };
		  };
   b=JSON.stringify(types);
    $.post("/ajax.json",b,function (result)
	   {   result=JSON.parse(result);
		  var img1=result.c[0].pic1; 
	      var img2=result.c[0].pic2;  
		  target_id[i]=result.c[0]._id; 
	      addImage(canvas1,img1);
		  addImage(canvas2,img2);
	  } 
		  );

///////////////////////////////////////////////
}
</script>


</head>
<body>
<div id="main">
	<div id="hua"><a>BUCT Chat</a></div>
   <!-- <input type="button" value="download_comment" onclick="download_comment('123456789012345678901234')" />
  -->     <div id="bottom">
    	<div id="hot_itom" class="hot"><img src="/chouchouhua/Public/images/chouchouhua/hot.png"/></div>
        <div id="picture"  class="corner hot"><a     >热门图片</a></div> 
        <div id="kuang" class="looking"><img src="/chouchouhua/Public/images/chouchouhua/suibiankankan.jpg"/></div>
        <div id="look"  class="corner looking"><a     >随便看看</a></div>
    </div>
    <div id="left">
    	<div class="home drawed"><img src="/chouchouhua/Public/images/chouchouhua/wohuade.png"/></div>
        <div class="note corner drawed" ><a    >我画的</a></div>
        <div class="home I_draw"><img src="/chouchouhua/Public/images/chouchouhua/woyaohua.png" /></div>				      
        <div class="note corner I_draw" ><a     >我要画</a></div>
       <!-- <div class="home"><img src="/chouchouhua/Public/images/chouchouhua/tongzhi.png" /></div>
        <div class="note corner"><a   >收藏</div>
        <div class="home"><img src="/chouchouhua/Public/images/chouchouhua/shoucang.png" /></div>
        <div class="note corner"><a    >通知</div>
          -->
    </div>
    <div id="right">
   <div id="imgshow">
            <div id="introduce"  class="corner"><a style="color:#000">热门图片</a></div>
             <div  id="canvs_page" style="z-index:1000px;">
                    <div class="page corner" id="canvas_1" onclick="createcanvas(0)"><a  style="color:#000;">首页</a></div>
                    <div class="page corner" id="canvas_2" onclick="createcanvas(total-15)"><a  style="color:#000; ">上页</a></div>
                    <div class="page  corner" id="canvas_3" onclick="createcanvas(total)"><a  style="color:#000;">下页</a></div>
                    <div class="page  corner" id="canvas_4" ><a style="color:#000;">末页</a></div>
            </div> 
              <div id="photoshow">
                <hr class="corner hr" style=" margin-top:70px;" />
                  <div class="tu" style="margin-top:86px;" >
                    <div class="photo"  id="15">
                      <div id="0"></div>
                    </div>
                    <div class="photo" id="16">
                        <div id="1"></div>
                    </div>
                    <div class="photo" id="17">
                         <div id="2"></div>
                    </div>
                    <div class="photo" id="18">
                      <div id="3"></div>
                    </div>
                    <div class="photo" id="19">
                       <div id="4"></div>
                    </div>
                </div>
                 <div class="jiazi" style=" margin-top:56px;">
                        <a style="  padding-left:53px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi1.png" /></a>
                        <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi11.png" /></a>
                        <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                        <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                        <a style="  padding-left:142px"><img src="/chouchouhua/Public/images/chouchouhua/jiazi3.png" /></a>
	                </div>
                        <hr class="hr corner" style= "margin-top:210px;"/>  
                         <div class="tu" style="margin-top:226px;">
                     <div class="photo" id="20">
                        <div id="5"></div>
                     </div>
                     <div class="photo" id="21"> <div id="6"></div></div>
                     <div class="photo" id="22"> <div id="7"></div></div>
                     <div class="photo" id="23"> <div id="8"></div></div>
                     <div class="photo" id="24"> <div id="9"></div></div>
                </div>
                <div class="jiazi" style="margin-top:196px;" >
                    <a style="  padding-left:53px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi1.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi11.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                    <a style="  padding-left:142px"><img src="/chouchouhua/Public/images/chouchouhua/jiazi3.png" /></a>
                </div>  
                <hr class="hr corner" style= "margin-top:350px;"/>  
                <div class="tu" style="margin-top:366px;">
                     <div class="photo" id="25"> <div id="10"></div></div>
                   <div class="photo" id="26"> <div id="11"></div></div>
                   <div class="photo" id="27"> <div id="12"></div></div>
                   <div class="photo" id="28"> <div id="13"></div></div>
                   <div class="photo" id="29"> <div id="14"></div></div>
               </div>
               
                <div class="jiazi" style="margin-top:336px">
                    <a style="  padding-left:53px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi1.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi11.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                    <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi2.png" /></a>
                    <a style="  padding-left:142px"><img src="/chouchouhua/Public/images/chouchouhua/jiazi3.png" /></a>
                </div>
              
            </div>
          
     </div>
       
<script type="text/javascript">

</script>
        
        
        
        
     <!----------------------查看大图---------------------->
     <div id="bigIm" style="display:none;">
        <hr style="width:580px;color:#666563;margin-top:55px; margin-left:84px;border:solid"  />
        <div class="jiazi" style="margin-top:-30px;">
            <a style="  padding-left:150px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi1.png" /></a>
            <a style="  padding-left:142px;"><img src="/chouchouhua/Public/images/chouchouhua/jiazi11.png" /></a>
       </div> 
       <div class="large">
            <div class="big_photo" id="101">
            <div id="100"></div>
            </div>
            <div class="big_photo_comment"  style="display:none;">
               <textarea id="comment_content" placeholder="写下你对此画的评论吧...." ></textarea>
               <img src="/chouchouhua/Public/images/chouchouhua/upload_comment (2).jpg" style="margin-left:-5px;" onclick="uploadcomment()" />
            </div> 
        </div>
         <input  style="background-image:url(/chouchouhua/Public/images/chouchouhua/cha.jpg); margin-top:-70px; margin-right:0px; cursor:pointer;" class="draw_btn" id="big_hidden"/>
        <div class="show_photo_comment">
           <div id="text_content">
           </div>
       </div>
        
       <div class="comment_pg">
            <div class="page corner" id="comment_1" onclick="download_comment(0)"><a  style="color:#000;">首页</a></div>
            <div class="page corner" id="comment_2" onclick="download_comment(comment_skip-5)"><a  style="color:#000; ">上页</a></div>
            <div class="page  corner" id="comment_3" onclick="	download_comment(comment_skip+5)" ><a  style="color:#000;">下页</a></div>
            <div class="page  corner" id="comment_4" onclick="download_comment(Math.floor(totalcomment/5)*5)"><a style="color:#000;">末页</a></div>
       </div> 
    </div>
    </div>  
    <!--、、、、、、、、、、、、、、、、、、、、、、、、我要画、、、、、、、、、、、、、、、、、、-->
  <div id="draw">
     	<div id="wPaint2" style="position:absolute; width:980px; height:470px;border:solid 10px #F2F2F2; border-radius:8px;"></div>
    <script type="text/javascript">
		$("#wPaint2").wPaint({
	
	});
	</script>
	  <canvas id="imgcanv" width="980px" height="480px"  style="background:#CACACA; margin-left:10px;">
    </canvas>
   <div class="fileInput" style="display:none">
          <input type="file" name="upfile" id="upfile" class="upfile" onchange="devide_img()"/>
          <input class="upFileBtn" type="button" value="上传图片" onclick="document.getElementById('upfile').click()" /><br />
        <a style="font-family:'宋体'; font-size:24px;"> 添加一张图片</a>
      </div>
       <input  style="background-image:url(/chouchouhua/Public/images/chouchouhua/cha.jpg); margin-top:40px;" class="draw_btn" id="draw_hidden"/>
       <input  style="background-image:url(/chouchouhua/Public/images/chouchouhua/gou.jpg); margin-top:-380px;" class="draw_btn" onclick="upload()" />  
 
 </div>
         <div id="bgDiv">
    </div>
              
</div>
 <script type="text/javascript" src="/chouchouhua/Public/js/chouchouhua/getimage.js"></script>
<script type="text/javascript" src="/chouchouhua/Public/js/chouchouhua/action.js"></script>
	
</body>
</html>