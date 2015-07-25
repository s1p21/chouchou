// JavaScript Document
//$("#share").click(function(){alert("");});
var mood_content=new Array();
var mood_author=new Array();
var mood_id=new Array();
var mood_totalcomment=new Array();
var mood_img=new Array();
var present=0;
var comment_skip=0;
var comment_author=new Array();;
var comment_content=new Array();;
var skip=0;
var result1;
var total;

function share()
{
   console.log("转发");	
}
function up_mood()
{
   console.log("向上查看心情");	
};
function down_mood()
{    skip+=3;
	 document.getElementById('corun2').innerHTML="";
	   create_mood(skip);
	 $('#corun2').css({marginLeft:"400px"});
	$('#corun2').fadeIn("slow");
	$("#corun2").animate({marginLeft:"0px"}, 1000 );
   console.log("向下查看心情");	
};
//////////////////////////////////
function create_comment(total)
{
 var types={"i":"find_comments","a":{'query':{"target": mood_id[present]}  , }}; 	
    b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {     result=x.c;
		i=0;
		while (i<total)
	     {    comment_content[i]=result[i].content;
		      comment_author[i]=result[i].author;
			  text=$('<div class="list list'+i+'" name="show"><div class="txt">'+comment_content[i]+'</div></div>');
			   	var icon=$('<div class="icon" ></div>');
			   $(text).append(icon);
	         $("#roundlist").append(text);	
		 i++;
	    }
	  },"json"	);
	if (total>6) { clearInterval(interval);roundList("0"); var interval=setInterval("roundList('1')",5000); }
  // setTimeout(create_personimg,500);	  
}
//////////////////////////////////////////////////////////////////
function create_personimg(author,location,height,width)
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
			   $(".icon_02").append(img);	
				// $(icon).append(img);
		    //  	$(text).append(icon);
	        //$(".icon_02").append(text);	
				
    
			},"json"	);
			setTimeout(500);	  
    	console.log("得到图像");			
	
		//if (total>6) { clearInterval(interval);roundList("0"); var interval=setInterval("roundList('1')",5000); }
}

/////////////////////////////////
function  create_middle(id)
{   document.getElementById('middle').innerHTML=mood_content[id];
    present=id;

	document.getElementById('icon_02').innerHTML="";
	if (mood_img[id]!="")
	{
	  	document.getElementById('icon_01').innerHTML="";
     	  var img = new Image();
			   	  img.src=mood_img[id];
				 $(img).css({"height":"90px","width":"96px"});
				$(".icon_01").append(img);
	}
	document.getElementById('roundlist').innerHTML="";
	create_personimg(mood_author[id],".icon","52px","52px")
	 total=parseInt(mood_totalcomment[id]);
	 if (isNaN(total)) {  total=parseInt(0);} 
	  else create_comment(total);
	 document.getElementById('icomment').innerHTML="评论("+total+")";
    
}
/////////////////////////////////////////////
function  create_mood(skip)
{  
   var types={"i":"find_microblogs","a":{"query": {},"skip":skip,"limit": 3, }};
   b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x.c;
	 for (i=0;i<3;i++)
	{   mood_content[i]=result[i].content;
	    mood_author[i]=result[i].author;
		mood_id[i]=result[i]._id;
		mood_img[i]=result[i].b64img;
		mood_totalcomment[i]=result[i].totalcomment;
		var list=$('<div class="list mood_list" onclick=create_middle('+i+')></div>')
		var hd=$('<div class="hd"><div class="hand"><a href="">[举报]</a></div></div>');
			var icon=$('<div class="icon" id="pic'+i+'"></div>');
				/*var img = new Image();
			   	  img.src=result[i].b64img;
				 $(img).css({"height":"52px","width":"52px"});
				$(icon).append(img);*/
			$(hd).append(icon);	
		var bd=$('<div class="bd"><div class="txt">'+result[i].content+'</div></div>');
		var ft=$('<div class="ft"><div class="turn_post"><a class="icomment" href="javascript:circleChangeNone();">回复</a></div></div>');
		$(list).append(hd);
		$(list).append(bd);
		$(list).append(ft);
		$("#corun2").append(list);
	}
	  },"json");
	  setTimeout(img,1500);
	/* skip+=3;
	 document.getElementById('corun2').innerHTML="";
	setInterval("create_mood(skip)",5000); */
}
/////////////////////////////////
function img()
{ for (i=0;i<3;i++)
   {personimg(mood_author[i],i,"52px","52px");     
	   }
}