// JavaScript Document

var result;	 
var present;
var flag=0;	 
var skip=-1;
var  direction;
var title=new Array(10);
var times=new Array(10);
var storm_content=new Array(10);
var author=new Array(10);
var comment_author=new Array();
var question_id=new Array(10);
var answer_skip=0;
var storm_img=new Array(10);
var storm_totalcomment=new Array(10);
///////////////////////////////////////////////////////////
function clprev()
{   skip--;
   if (skip<0) skip=0;
	var types={"i":"find_questions","a":{"query": {},"skip":skip,"limit": 10, }};
          direction="right";
		  deposite("clrun","lista"); 
		   if (skip==0) {alert("已到第一页")};
		   requst_storm(types);
	 console.log("上一页");
};
////////////////////////////////////////////////////////
function clnext()
{  skip++;
  var types={"i":"find_questions","a":{"query": {},"skip":skip,"limit": 10, }};
          direction="left";
		 if(flag!=0) {document.getElementById('clrun').innerHTML=""} 
		    else  flag=1;
		   requst_storm(types);
	       console.log("下一页");
};
/////////////////////////////////////////////////////
/////////////////////////////////*///
function requst_storm(types)
{ b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x;
	    var list=$('<div class="list" id="lista"><ul></ul></div>');
    for (i=0;i<10;i++)
   {    author[i]=result.c[i].author;
      times[i]=result.c[i].datetime;
	    title[i]=result.c[i].title;
		question_id[i]=result.c[i]._id;
		storm_content[i]=result.c[i].content;
		storm_totalcomment[i]=result.c[i].totalcomment;
		storm_img[i]=result.c[i].b64img;
		var li=$('<li></li>');
	lia=$('<a id='+i+' onclick= create_question(id)></a>');
	  var pic=$('<div class="pic"></div>');
	  		var img = new Image();
			 img.src=result.c[i].b64img;
			$(img).css({"height":"52px","width":"52px"});
			$(pic).append(img);
  	 var info=$('<div class="info"><div class="title"><span class="tit">'+author[i]+'</span><span class="hand">[举报]</span></div><div class="txt">【'+title[i]+'】</div>');
	$(lia).append(pic);
	$(lia).append(info);
	 $(li).append(lia);
	 $(list).append(li);
   }
	  $('.clrun').append(list);
	     },"json"	);
    setTimeout(animatex,100);
}	 
///////////////////////////////////////////////////////////////////////////
function animatex()
{ if (direction=="left"){  $("#lista").css({marginLeft:"600px"})
    $("#lista").animate({marginLeft:"0px"},1500); }
	if (direction=="right") { $("#lista").css({marginLeft:"-600px"})
    $("#lista").animate({marginLeft:"0px"},1500); }
}
/////////////////////////////////////////////////////////////
function post()
{ var answer=$('.text-cancel').val();
  var types={"i":"publish_comment","a":{"target": question_id[present], content: answer, type:'questions'}};
   publish(types);
	console.log("提交");
	
}
////////////////////////
function zan()
{
	alert("");
	console.log("赞");
	
	}
/////////////
function bi()
{alert("nbi");
console.log("不赞");
}
/////////////////
///////////////////////////////
function create_answer(id,answer_skip)//动态生成答案
{  
  var  total=parseInt(storm_totalcomment[id]);
	if (isNaN(total)) {  $("#resumerun").append($('<h2>暂时还没有答案喔</h2>'));} 
	  else 
	{
		//var hand=$('<div class="hand"><span><a class="chgood"  href="javascript:;"><img src="images/chgood.png" /></a><b>155</b></span><br /><span><a class="chbadly" href="javascript:;"><img src="images/chbadly.png" /></a><b>155</b></span></div>')
		 var types={"i":"find_comments","a":{'query':{"target": question_id[present]}  ,'skip':answer_skip, 'limit':2,}}; 	
	   b=JSON.stringify(types);
	   $.post("/ajax.json",b,
		 function(x)
		 {     result=x.c;
				for (i=0;i<2;i++)
				{
					comment_author[i]=result[i].author;
				 var storminfo_list=$('<div class="list" id="listb"></div>');
				var information=$('<div class="information"></div>');
             var info=$('<div class="info"></div>');
			var pic=$('<div class="pic" id="pic'+i+'"></div>');
			var desc=$('<div class="desc"><div class="tit">'+result[i].author+'</div><div class="time">发表于：'+result[i].datetime+'</div></div>');
				var  text=$('<div class="txt"><a>'+result[i].content+'</a></div>');
				$(info).append(pic);
			 	$(info).append(desc);
				$(information).append(info);
				$(information).append(text);
				$(storminfo_list).append(information);
				$("#resumerun").append(storminfo_list);
				
				}
		},"json"	);
		setTimeout(imgs,500);
		//$("#resumerun").append($('<a  id="more"  onclick=add_ans()>点击查看更多.......</a>'));
	}
}
/////////////////////////////////////////
function add_ans(type)
{ 
   deposite("resumerun","listb"); 
    deposite("resumerun","listb"); 
   answer_skip+=2;
   story_skip+=2;
   alert(story_skip);
   if (type=="storm") create_answer(present,answer_skip);
   if(type=="story")	  find_story_comment(story_skip);
   $('#resumerun').css({marginLeft:"140px",display:"none"});
$('#resumerun').fadeIn("slow");
$("#resumerun").animate({marginLeft:"0px"}, 1000 );
$('.button').attr('style','display:none;');
   
}
//////////////////////////////////
function  create_question(id)//动态生成问题
{     hidediv('comment-list','none');
    hidediv('storm','block');
	present=id;
	create_answer(id,0);
 	var hd=$('<div class="hd"></div>');
		var pic=$('<div class="pic"></div>');
				var img = new Image();
				 img.src=storm_img[id];
				$(img).css({"height":"52px","width":"52px"});
				$(pic).append(img);
    	var info=$('<div class="info"><span><a href="javascript:;">'+author[id]+'</a></span><span>发表于'+times[id]+'</span></div>');		
	    $(hd).append(pic);
		$(hd).append(info);
    var bd=$('<div class="bd"><div class="txt">【'+title[id]+'】'+storm_content[id]+'</div></div>');
	var ft=$('<div class="ft"><br /><span><input type="image" src="images/storminfo_button.png" class="story_post" onclick=add_answer() /></span><br /></div>')	
	$('.storminfo').append(hd);
	$('.storminfo').append(bd);
	$('.storminfo').append(ft);
    //$('.storminfo').append(ft);
}
/////////////////////////////////////////////////////////////////////////
function hidediv(id,status)
{
	$('#'+id+'').css({display:status});
}
//////////////////////////////////////////////////////////////////
function add_answer()
{

$('.resume_post').css({marginTop:"0px"});
$('.resume_post').fadeIn("slow");
$(".resume_post").animate({marginTop:"-140"}, 1000 );
$('.button').attr('style','display:none;');
}
/////////////////////////////////////////////////
function imgs()
{  for(i=0;i<2;i++)
    {personimg(comment_author[i],i,"38px","38px");     
    }
}
