/**
 * switch form( register & login & password modify )
 */

  
 // $('.btn-register').bind('click',function(e){
	//     checkRegisterForm();
 //  });
 
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
        // $.ajax();

        // callback && callback.appl(null, arguments);
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
    $('#login').bind('click', function( e ) {
        var username=$(".login :input[name=username]").val();
        var password=$(".login :input[name=password]").val();
        $.post("checkLogin",{"username":username,'password':password},function(data,status){
           g=data;
           if(status="success"){
            if (data==0){ location.href="index";}
            else{$(".login-tips").html("用户名或密码错误");}
           }
        },'json');
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



function checkRegisterForm(){
   var registerForm={}; 
    registerForm['username']=$("#registerForm :input[name=username]").val();
	if( registerForm['username']== ''){alert("请填写用户名");return false;}

    registerForm["email"]=$("#registerForm :input[name=email]").val();
	if( registerForm["email"]== ''){alert("请填写邮箱");return false;}

	var ab=/^1[345678]\d{8}$/;
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(myreg.test(registerForm["email"]) == false){alert("邮箱格式不对");return false;}

    registerForm["password"]=$("#registerForm :input[name=password]").val();
   if( registerForm["password"]== ''){alert("请填写密码");return false;};
	if($("#registerForm :input[name=password]").val() != $(".retype-password").val()){
		alert(" 密码不一致");return false;}

	if(!document.getElementById("agreement").checked){alert("您没有接受协议");return false;}

    return true;  
    // if( true) {
    //     $.post(registerUrl,{"registerForm":registerForm},function(data,status){
    //           if (status=="success") {
    //             // 转向首页
    //             location.href="test";
    //           };
    //     },'json');
    // };
};

