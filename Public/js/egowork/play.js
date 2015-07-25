////////////////////
var skip=0;
var title=new Array();
var fromtime=new Array();
var totime=new Array();
var play_content=new Array();
var count=new Array();
var play_id=new Array();
var play_datetime=new Array();
var play_author=new Array();
var play_present;


function I_join()
  {   document.getElementById('publishul').innerHTML="";
      var types={"i":"find_participations","a":{"query":{},"limit":10,}};
	  var i=0;
	  b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x.c;
	   
	   while (result[i]._id!="")
	   
{ var j=i+1;	
var li=$('<li><span><a href="playinfo.html">'+j+'. '+result[i].target+'</a></span><span class="time">'+result[i].datetime+'</span></li>')
    $('#joinul').append(li);
	i++;
}
 	console.log("我参与的");
   },"json"	);
};
/////////////////////////////////////
function I_publish()
{ var uname=getCookie("uname"); 
  document.getElementById('joinul').innerHTML="";
   var types={"i":"find_events","a":{"query":{'author':uname},"limit":10,}};
        var i=0;
	  b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x.c;
	   while (result[i]._id!="")
	    
{	var j=i+1;
var li=$('<li><span><a href="playinfo.html">'+j+'. '+result[i].title+'</a></span><span class="time">'+result[i].datetime+'</span></li>')
    $('#publishul').append(li);
	i++;
}
 	console.log("我发布的");
   },"json"	);
};
////////////////////////////////
function discuss()
{   var types={"i":"find_comments","a":{"query":{'target':"51cfe14f453a421a48352497"},}};
      publish(types);
	console.log("讨论");
};
//////////////////////
function submit_discuss()
{
	var types={"i":"find_comments","a":{"query":{'target':"51cfe14f453a421a48352497"},}};
}
//////////////////////////////////////
function campany()
{
	console.log("商家");
};
/////////////////////////////////
function personly()
{  
   var types={"i":"find_events","a":{"query": {},"skip":skip,"limit": 3, }};
   //publish(types); 
    b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x.c;
	 if (x.e==0)
      for (i=0;i<3;i++)
		 { 	var ul=$('<li id="'+skip+'" onclick= playinfo(id)></li>');
			var pic=$('<div class="pic"></div>');
				var img = new Image();
				 img.src=result[i].b64img;
				$(img).css({"height":"136px","width":"136px"});
				$(pic).append(img);
			var info=$('<div class="info"><div class="tit"><span class="tt"><a>'+result[i].title+'</a></span><span class="ti">活动日期：'+result[i].fromdate+'至'+result[i].todate+'</span></div><div class="txt">'+result[i].content+'</div><div class="other"><div class=""><span><a>《《阅读全文</a></span><span class="person">参加人数<font color="#88ba3b">('+result[i].count+')</font></span></div></div></div>');
			  $(ul).append(pic);
			  $(ul).append(info);
			 title[skip]=result[i].title;
			 fromtime[skip]=result[i].fromdate;
			 totime[skip]=result[i].todate;
			 count[skip]=result[i].count;
			 play_id[skip]=result[i]._id;
			 play_datetime[skip]=result[i].datetime;
			 play_author[skip]=result[i].author;
			 play_content[skip]=result[i].content;
			 $('#person').append(ul);
			skip++;
		 }
   },"json"	);
 setTimeout(scroll_change,500);
	console.log("个人");
};
/////////////////////////////
function totalinfo()
{
	console.log("阅读全文");
};
//////////////////////////////
function join_confirm()
{
   var realname=$('input[name=realname]').val();
   var  sex=$('input[name=sex]').val();
   var phone=$('input[name=phone]').val();
   if ((sex!="")&&(sex!="")&&(phone!="")){
  var types={"i":"join_event","a":{"name":realname,"sex":sex,"phone":phone,"target":play_present}};
   publish(types);
   console.log("参加确认");
   }
   else {alert("不能为空");};
   
};
/////////////////////////////////
function return_back()
{    hidediv("playinfo","none");
    document.getElementById('playinfo_hd').innerHTML="";
	document.getElementById('playinfo_bd').innerHTML="";
	$("#play").fadeIn(1000);
	console.log("返回列表");
};
/////////////////////////
function playinfo(id)
{
	hidediv("play","none");
	$("#playinfo").fadeIn(1000);
	play_present=play_id[id];
	$('#playinfo_hd').append($('<h4>'+title[id]+'</h4><h2>发布时间:'+play_datetime[id]+'</h2>'));
	var ainfo=$('<div class="ainfo"><span class="fl">发布者：'+play_author[id]+'</span><span class="fr">活动日期：'+fromtime[id]+'至'+totime[id]+'</span></div>');
	var text=$('<div class="text"><p>'+play_content[id]+'</p></div>');
	var other=$('<div class="other"><span>报名截止时间：'+totime[id]+'</span><span class="plabotton"><input type="image" onclick="joins()" src="images/plabotton.gif" /></span><span class="plajionnum">参加人数（'+count[id]+'）</span><span class="plabacklist" onclick="return_back()"><a><img src="images/plabacklist.gif" /></a></span></div>');
	$('#playinfo_bd').append(ainfo);
	$('#playinfo_bd').append(text);
	$('#playinfo_bd').append(other);
	}
///////////////////////////////////
function scroll_change(){
var e=document.getElementById("persons");
e.scrollTop=e.scrollHeight;
}/////////////////
function joins()
{hidediv("pop_canjia","block");
console.log("参加");
}
