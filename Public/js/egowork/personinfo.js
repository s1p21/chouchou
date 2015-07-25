/////////////////////////
var user_id=getCookie("uname");

var imgsource;
/////////////////////////////
function  accomplish()
{  var nickname=document.getElementsByName('lili')[0].value;
    var realname=document.getElementsByName('lili')[1].value;
	var address=document.getElementsByName('lili')[2].value;
	var sex=$('input[name=sex]').val();
	alert(sex);
	var birthtime=document.getElementsByName('lili')[3].value;
	var description=$('textarea[name=note]').val();
	var email=document.getElementsByName('lili')[4].value;
	var qq=document.getElementsByName('lili')[5].value;
	var cellphone=document.getElementsByName('lili')[6].value;
	var workaddress=document.getElementsByName('lili')[7].value;
	var types={"i":"update_userinfo","a":{"nickname": nickname, "realname":realname,"homelocation":address,"sex":sex,"birth":birthtime,"description":description,"email":email,"qq":qq,"phone":cellphone,"worklocation":workaddress,}};
	publish(types);
	console.log("个人信息上传");
};
///////////////
function personinfo(uname)
{   

    
	var types={"i":"find_userinfo","a":{"_id": uname, }};
//	publish(types);
	 b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x;
	    if (x.e==0)
	 	{   document.getElementById('usname').innerHTML=result.c.nickname;
	        document.getElementById('nickname').innerHTML=result.c.nickname;
			 document.getElementById('realname').innerHTML=result.c.realname;	
			  document.getElementById('address').innerHTML=result.c.homelocation;
			   document.getElementById('sex').innerHTML=result.c.sex;
			    document.getElementById('birthtime').innerHTML=result.c.birth;
				 document.getElementById('description').innerHTML=result.c.description;
				  document.getElementById('cellphone').innerHTML=result.c.phone;
				   document.getElementById('email').innerHTML=result.c.email;
				    document.getElementById('qq').innerHTML=result.c.qq;
					 document.getElementById('workaddress').innerHTML=result.c.worklocation;
					 imgsource=result.c.b64img;
					 find_image();
		}
        
     else 
		     alert("加载失败，请登陆");
		   },"json"	);
	//document.getElementsByName('lili')[0].value=eval("result."+id2);
	
	
}
/////////////////////
function change_password()///////////未完
{
	var old_password=$('#old_password').val();
	var new1=$('#new_password').val();
 if(password != $("input[name=retype-password]").val())
   {alert(" 密码不一致");}
   else 
       {
		   var digestString = SHA256(password);
			var types={"i":"register","a":{"uname":uname,"passwd":digestString,"email":email,}}
   			b=JSON.stringify(types);
   			$.post("/ajax.json",b,
     		function(x)
	 		{  result=x;
	 		if (x.e==0)
	    		window.location.href='/static/chouchouhua/draw.html';
		   		else 
		     		alert("注册失败");
		 	},"json"	);
	  	}
  
		console.log("修改密码");
}
/////////////
function pic_confirm()
{ var user_id=getCookie("uname");
   var types={"i":"publish_image","a":{"b64img":imgurl,"_id":user_id,"type":"users"}}
	publish(types);
	imgsource=imgurl;
	find_image();
	console.log("头像上传");
}
///////////////////////////
function find_image()
{
	document.getElementById('person_img').innerHTML="";
   var img = new Image();
			     img.src=imgsource;
				  $(img).css({"height":"108px","width":"100px"});
				 $("#person_img").append(img);
				 create_img(imgsource);

}
////////////////////////////////////////////
function create_img(source)
{			 document.getElementById('crop_result').innerHTML="";   
          var img = new Image();
                img.src=source;
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
