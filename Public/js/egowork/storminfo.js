// JavaScript Document
var present_id;  
var flag;
var author=new Array();
var story_skip=0;
//////////////////////////////////////////////////////////////	
function post_story()
{ var story=$('.text-cancel').val();
  var types={"i":"publish_comment","a":{"target":present_id, content: story, type:'stories'}};
  publish(types);
	console.log("提交");
	find_story_comment();
}
/*////////////////////////
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
////////////////*/
function find_story()
{ 
 
 var today=new Date();
    var year=today.getFullYear();
	var month=today.getMonth()+1;
	var date=today.getDate();
	 var datetime=year+"-"+month+"-"+date;
  var types={"i":"find_stories","a":{'query':{"storydate":datetime}  ,'skip':0, 'limit':1,}}; 	
 b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {     result=x.c;
         present_id=result[0]._id;
		 if (x.e==0)
		 {
		  document.getElementById('word1').innerHTML=result[0].word1;
         document.getElementById('word2').innerHTML=result[0].word2;
	     document.getElementById('word3').innerHTML=result[0].word3;
		  flag=1;
	     }
		 else {document.getElementById('word1').innerHTML="今天还没有添加主题喔";flag=0; }
		 var  time=$('input[name=EntTime]').val(datetime);
		 
    },"json"	);
	setTimeout(find_story_comment,1500); 
}
//////////////////////////////////
function find_story_comment()
{  if (present_id)
 { 
   var types={"i":"find_comments","a":{'query':{"target":present_id}  ,'skip':story_skip, 'limit':2,}}; 	
	 b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {     result=x.c;
	      if (x.e==0)
		  {  
			for (i=0;i<2;i++)
			{author[i]=result[i].author;
	        var storminfo_list=$('<div class="list" id="listb"></div>');
	 		var information=$('<div class="information"></div>');
			var info=$('<div class="info"></div>');
			var pic=$('<div class="pic" id="pic'+i+'"></div>');
			var desc=$('<div class="desc"><div class="tit">'+result[i].author+'</div><div class="time">发表于：'+result[i].datetime+'</div></div>');
			var  text=$('<div class="txt"><a>'+result[i].content+'</a></div>')
			$(info).append(pic);
			$(info).append(desc);
			$(information).append(info);
			$(information).append(text);
			$(storminfo_list).append(information);
			$("#resumerun").append(storminfo_list);
		   }
	      }
		else {  $("#resumerun").append($('<h2>没有更多故事了喔</h2>')); } 
    },"json"	);
	setTimeout(img,500);
	}
 }
//////////////////////////////////////////////////
function img()
{  for(i=0;i<2;i++)
   {  
		personimg(author[i],i,"38px","38px");     
    }
}



/////////////////////////////////////////////////
function submit_words()
  { 
     var t1=$('input[name=t1]').val();
	 var t2=$('input[name=t2]').val();
	 var  t3=$('input[name=t3]').val();
	 var  time=$('input[name=EntTime]').val();
	 if ((t1!="")&&(t2!="")&&(t3!="")&&(time!=""))
	 {  
	  var types={"i":"publish_story","a":{"word1":t1, "word2":t2, "word3":t3,"storydate":time,}};
      publish(types);
	    console.log("提交三个有意思的词语");
	 }
}