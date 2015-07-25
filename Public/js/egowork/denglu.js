// JavaScript Document
var result;
var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

/**
 * switch form( register & login & password modify )
 */
 $('.btn-login').bind('click',function(e){
	     login();
  });
  
$(document).on("click",".btn-register",function(){checkRegisterForm();});
  
 
$('.btn-confirm').bind('click',function(e){
	  	change_password();
  });
 

 (function( $ ) {
    var getTip = function( obj ) {
        return obj.parent().find('.tips').eq(0);
    };

    var timing = function( el ) {
        var args = arguments,
            num = el.text().replace(/[^\d]/g, '') - 1;

        el.text( '(' + num + '秒)' );

        if( !num ) return;

        setTimeout(function() {
            args.callee( el );
        }, 1000);
    };


    var loginInnerEl = $('#login-inner');

    $('#login-area .switch-login').bind( 'click',  function( e ) {
        loginInnerEl.css('left', '-550px');
        return false;
    });

    $('#login-area .btn-modify').bind( 'click', function( e ) {
        loginInnerEl.css('left', '-1100px');
        return false;
    });

    $('#login-area .switch-register').bind( 'click', function( e ) {
        loginInnerEl.css('left', '0px');
        return false;
    });

    $('#login-area .get-vcode').bind( 'click', function( e ) {
        $(this).hide();
        $(this).parent().find('.vcode-box').show();
        timing( $(this).parent().find('.vcode-box .time-counter').eq(0) );
    })

    $('#login-area .retype-password').bind( 'blur', function( e ) {
        var rv = $(this).val(),
            v = $(this).parent().parent().find('.password').eq(0).val();

        if( !v.length ) return;

        if( v == rv ) {
            //getTip($(this)).html('密码一致');
        } else {
            //getTip($(this)).html('密码不一致');
        }
    });


    var regBox = $('#login-inner .login-box.register').eq(0),
        loginBox = $('#login-inner .login-box.login').eq(0),
        modifyBox = $('#login-inner .login-box.modify').eq(0);
    // form check
    var checkUname = function( callback ) {
        $.ajax();

        callback && callback.appl(null, arguments);
    };



    var regSuccess = function( data ) {
        showBuilding();
    };
    // request for register
	/*
    $('.btn-register').bind( 'click', function( e ) {
        if( 'condation' ) {
            $.ajax();
        }
        $('#login-area .login-container').animate({
            height : 0
        }, 700, function() {
            $('#login-area').hide();
            setTimeout( function() {
                $('#building-area').fadeIn();
            }, 100);
        });

    });*/

    // request for login
    $('login btn selector').bind('click', function( e ) {
        $.ajax();
    })


    $('#login-inner .register .username').bind( 'blur', function( e ) {
        var el = $(this);
        checkUname(function() {
            getTip(el).html('可以使用');
        });
    });

    var buildingList = $('#building-list-inner .building-list');

    $('#building-list-inner').css('width', buildingList.length * 550 + 'px');

    var gotoUl = function( page ) {
        page = page || 1;
        page -= 1;
        $('#building-list-inner').css('left', (-550 * page) + 'px' );
    };

    $('#pager a').bind('click', function() {
        var pn = $(this).attr('data-pn');

        gotoUl( pn );

        $('#pager a').removeClass('current');
        $(this).addClass('current');
    });


})( $ );


//////////////////////////////

function login()
{   var uname=document.getElementById('uname').value;
   	var password=document.getElementById('password').value;
	//var digest = Crypto.SHA1(password);
	//var digestBytes = Crypto.SHA1(password, { asBytes: true });
	var digestString = SHA256(password);
	var types={"i":"login","a":{"uname":uname,"passwd":digestString,}}
   b=JSON.stringify(types);
   $.post("/ajax.json",b,
     function(x)
	 {  result=x;
	 	 if (x.e==0)
	 window.location.href='/static/output/storm.html';	
    else 
		     alert("用户名或密码错误");
		   
		   },"json"	);
 }
//////////////////////////////////////////////////////////////
function register()
{  
  
	if($("#registerFrom :input[name=username]").val() == ''){
		alert("请填写用户名");
		return false;
	}

	if($("#registerFrom :input[name=email]").val() == ''){
		alert("请填写邮箱");
		return false;
	}

	var ab=/^1[345678]\d{8}$/;
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(myreg.test($("#registerFrom :input[name=email]").val()) == false){
		alert("邮箱格式不对");
		return false;
	}

	if($("#registerFrom :input[name=password]").val() == ''){
		alert("请填写密码");
		return false;
	}

	if($("#registerFrom :input[name=password]").val() != $("#registerFrom :input[name=retype-password]").val()){
		alert(" 密码不一致");
		return false;
	}

	if(!document.getElementById("agreement").checked){
		alert("您没有接受协议");
		return false;
	}
	  }
/////////////////////////////////////////////////////////
function change_password()
{
	var uname=$('#change_uname').val();
	var email=$('#mail').val();
	if(email) {if(!myreg.test(email)){
			$('#check_mail').append("<b class='tips'>邮箱格式不正确!</b>");
			}
			}
	else 	$('#check_mail').append("<b class='tips'>邮箱不能为空!</b>");		
			
	console.log("忘记密码");
}	