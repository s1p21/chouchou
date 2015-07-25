// JavaScript Document
var res;
// function showDetail() { 
// //背景
//   var bgObj=document.getElementById("bgDiv");
//   bgObj.style.width =  $(window).width() + "px";
//   bgObj.style.height = $(window).height() + "px";	

// //定义窗口
//  // var msgObj=document.getElementById("draw");
//   //msgObj.style.marginTop = -75 +  document.documentElement.scrollTop + "px";

// //关闭
//  bgObj.style.display = "block";
// $("#draw").css('display','block');
//  //$("#wPaint2").fadeIn(1000);
//   }

//////////////////////////////////////////
function addImage(imgcon,url)
{
//	var imgcon=document.getElementById(imgcont);
	var imgcontext=imgcon.getContext('2d');
	var img = new Image();
	img.onload = function(){
		imgcontext.drawImage(img,0,0 ,imgcontext.canvas.width , imgcontext.canvas.height);
	}
	img.src = url;
}
//////////////////////////////////////////////////
function upload()
{
	var imgdate2 = $("#wPaint2").wPaint("image");
    var  imgdate1=document.getElementById('imgcanv').getContext('2d').canvas.toDataURL();
    $.post("uploadimg",{"img1":imgdate1,"img2":imgdate2},function(data,status)
	 { if(status){
	 	     alert(imgdate1.length);
	 	     alert(data);
	 		// alert("上传成功");
	 		hiddenDraw();
	 	}
	 	
	 	 
	 },'json')
   
			
}
//////////////////////////////////////
function uploadcomment()
{  	var comment_content=document.getElementById('comment_content').value;
types = {"i":"publish_comment" , "a":{"target":nowimage,"content":comment_content , "type":"paintings"}};
  b=JSON.stringify(types);
  $.post("/ajax.json",b,
       function(x)
	      {
		  if (x.c)
		     alert("发表成功");
		   else 
		     alert("发表失败");
		   
		   },"json"	);
		   
	download_comment(0);	   
		   
}
////////////////////////////////////////////
function downloadImg()
{   
     
 var types={"i":"get_paintings","a":{"query" : {"_id":nowimage} ,"limit":1,"skip":0, "sort" :[["datetime" , -1]]}}
   b=JSON.stringify(types);
    $.post("/ajax.json",b,function (result)
	   {   
	   result=JSON.parse(result);
	   totalcomment=result;
		  var img1=result.c[0].pic1; 
	      var img2=result.c[0].pic2;  
		  totalcomment=result.c[0].totalcomment;
		// var totlecomment=result.c.totalcomment;
		  //alert(totlecomment);
		 addImage(bigcanvas1,img1);
		 addImage(bigcanvas2,img2);
		  } 
		  )
}
/////////////////////////////////////////////
function download_comment(skip)
{  	  var a=document.getElementById('text_content');
          	/*	if (comment_skip==0)
	  {
		$("#comment_2").css('background-color','#CCC');
					  
	  }
	  else
	   {$("#comment_2").css('background-color','#FFA275');
	   };
	  if (comment_skip>totalcomment)
	    { $("#comment_4").css('background-color','#CCC');
		};*/
	       
    var types={"i":"get_comments","a":{"query" : {"target":nowimage} ,"limit":5,"skip":skip, "sort" :[["datetime" , -1]]}}
   b=JSON.stringify(types);
    $.post("/ajax.json",b,function (result)
	   {  
	   result=JSON.parse(result);
	      res=result;
		   comment_skip=skip;
		  //alert(totalcomment);
	  	  //alert(pages);
				     a.innerHTML="";
				     var t=0;	
				      for (i=0;i<5;i++) 
					   {
				     	a.innerHTML+=eval("result.c["+i+"].author");
					    a.innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				         a.innerHTML+=eval("result.c["+i+"].datetime");
						a.innerHTML+="<br/>"
		              	a.innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
						a.innerHTML+=eval("result.c["+i+"].content");
						a.innerHTML+="<br/>..................................................<br/>"
		              } 
		 
		  
	   });
	
	/*
	*/   
	   
}
//////////////////////////////////////////////////////
function  xx(id)
{
  $("#imgshow").fadeOut(10);
	$("#bigIm").fadeIn(1000);
	wid=520;he=360;
	nowimage=target_id[id];
	/*alert(id);
	alert(nowimage);
*/	var aa=document.getElementById("100");
	    aa.parentNode.removeChild(aa);
	  var ss=document.createElement('div');
	     ss.id="100";	 
		 var aa=document.getElementById("101");
		 aa.appendChild(ss);
	 var spans=document.createElement('span');
	 spans.style.height=he+"px"; 
		spans.style.width=wid+"px";
		spans.style.position="absolute";
		    bigcanvas1=document.createElement('canvas');
		    bigcanvas1.style.backgroundColor=""
			bigcanvas1.style.height=he+"px";
			bigcanvas1.style.width=wid+"px";
			bigcanvas1.style.position="absolute";
	       right=document.getElementById('100');
		  right.appendChild(spans);
		  spans.appendChild(bigcanvas1);	
		 	bigcanvas2=document.createElement('canvas');
		   bigcanvas2.style.backgroundColor=""
			bigcanvas2.style.height=he+"px";;
			bigcanvas2.style.width=wid+"px";
         	bigcanvas2.style.position="absolute";
	 	   spans.appendChild(bigcanvas2);	
	 	   downloadImg();
		   download_comment(0);	  
	}
////////////////////////////////////////////
function createcanvas(image_skip)
 {
	 for (i=0;i<15;i++)
  {   
	 creat(i,image_skip,uname,paixu);image_skip++;
  }
 total=image_skip;
 
  }
/////////////////////////////////////////////
function getCookie(cookieName) {
var re = new RegExp("\\b"+cookieName+"=([^;]*)\\b");
var arr =  re.exec(document.cookie);
return arr?arr[1]:"";
}
/////////////////////