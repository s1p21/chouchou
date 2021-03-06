<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <!--添加资源文件  -->
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>buctChat</title>
 <link rel="stylesheet" href="/chouchou/Public/static/css/reset.css" type="text/css" />
 <link rel="stylesheet" href="/chouchou/Public/static/css/login.css" type="text/css" />
 <!--[if lt IE 9]> 
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script> 
<![endif]--> 
</head>
    <body>
         <section id="main">
            <div id="login-area" class="login-area">
    <div class="login-container">
        <div id="login-inner" class="login-inner clearfix">
            <div class="login-box register" id="registerForm">
              <div class="site-logo"><img src="/chouchou/Public/images/chouchouhua/logo.png"></div> 
                <p class="login-tip-line">欢迎注册buctchat</p>
                <form action="<?php echo U('Index/register');?>" method="post" onsubmit="return checkRegisterForm(); ">
                     <p class="form-item">
                        <span>用户名</span>
                        <input type="text" name="username" class="username" id="register_uname" />
                        <span class="tips"></span>
                    </p>
                    <p class="form-item">
                        <span>E-mail</span>
                        <input type="text" name="email">
                        <span>
                            <!--<a  class="get-vcode btns btns-light"></a>
                            <span class="vcode-box">
                                <input id="email" type="text" class="vcode-input" placeholder="输入邮箱"  />
                                <span class="time-counter">(60秒)</span>
                            </span>
                           --> 
                        </span>
                    </p>
                   
                    <p class="form-item">
                        <span>密码<b class="ic ic-lock"></b></span>
                        <input type="password" class="password" name="password" >
                        <span class="tips"></span>
                    </p>
                    <p class="form-item">
                        <span>重复密码</span>
                        <input type="password" name="retype-password" class="retype-password">
                        <span class="tips"></span>
                    </p>
                    <p class="clause-line">
						<input type="checkbox" id="agreement" />
                        阅读并同意并遵守
                        <a href="###">服务条款</a>
                    </p>
                    <p class="form-item">
                        <span></span>
                        <input type="submit" value="注册" class="btns btns-dark btn-register"/>
                        <span class="tips"></span>
                    </p>
                </form>
                <p class="bottom-line r">
                    <span>已注册？点此</span>
                    <a href="###" class="switch-login">登录</a>
                <p>
                    <div class="bdsharebuttonbox"><A class=bds_more href="#" data-cmd="more"></A><A class=bds_qzone title=分享到QQ空间 href="#" data-cmd="qzone"></A><A class=bds_tsina title=分享到新浪微博 href="#" data-cmd="tsina"></A><A class=bds_tqq title=分享到腾讯微博 href="#" data-cmd="tqq"></A><A class=bds_renren title=分享到人人网 href="#" data-cmd="renren"></A><A class=bds_weixin title=分享到微信 href="#" data-cmd="weixin"></A></div>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
            </div>
            <div class="login-box login">
                <div class="site-logo"><img src="/chouchou/Public/images/chouchouhua/logo.png"></div>
                <p class="login-tip-line">欢迎登录buctchat</p><br>
                    <p class="form-item">
                        <span>帐号</span>
                        <input type="text" name="username" class="username"  id="uname"placeholder="手机/用户名/邮箱登录" />
                        <span class="tips"></span>
                    </p><br>
                    <p class="form-item">
                        <span>密码<b class="ic ic-lock"></b></span>
                        <input type="password" name="password" id="password" class="password" >
                        <span class="tips"></span>
                    </p>
                    <p class="form-item">
                        <span class="login-tips" style="color:red; margin-left:20%"></span>
                    </p>
                   <p class="form-item">
                       <button type="submit" class="btns btns-light btns-s btn-login" id="login" >登录</button>
                        <span></span>
                        <input type="checkbox" checked="checked" class="remember" />
                        <span id="rem">记住我</span>
                   </p>
               
                <p class="login-down">
                    <a  class=" btn-modify">忘记密码</a>
                    <span class="dotted">|</span>
                    <a  class="switch-register">点此注册</a>
                    <span class="dotted">|</span>
                    <a href="check.html">联系我们</a>
                <p> 
                 <!-- <p class="bottom-line sync-line">
                   <span>同步登录：</span>
                    <a href="###" title="Sina" class="sync-login"></a>
                    <a href="###" title="QQ" class="sync-login"></a>
                    <a href="###" title="Renren" class="sync-login"></a>
                </p> -->
            </div>
            <div class="login-box modify">
                <div class="site-logo"><img src="/chouchou/Public/images/chouchouhua/logo.png">
                </div>
                <p class="modify-tip-line">修改密码</p>
                <form action="###" method="post">
                    <p class="form-item">
                        <span>用户名</span>
                        <input type="text" name="username" class="username" id="change_uname"  />
                        <span class="tips" ></span>
                    </p> 
                    <p class="form-item">
                        <span>Email</span>
                        <input type="text" name="telephone" id="mail">
                       <span id="check_mail" >
                            <a href="###" class="get-vcode btns btns-light">获取验证码</a>
                        </span>
                      </p>
                     <p class="form-item">
                        <span></span>
                        <a href="###" class="btns btns-dark btn-confirm">确认</a>
                        <span class="tips"></span>
                    </p>
					<p class="bottom-line r">
                    <span>已注册？点此</span>
                    <a href="###" class="switch-login">登录</a>
                   <p>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</section>
     <!--添加资源文件  -->
<script type="text/javascript">
 var registerUrl="<?php echo U('Index/register');?>";
 var loginUrl="<?php echo U('Index/checkLogin');?>";
 var registerForm={};
 var g;
</script>
<script src="/chouchou/Public/static/js/jquery-git2.js"></script>
<script src="/chouchou/Public/static/js/login.js"></script>
<script src="/chouchou/Public/js/egowork/webtoolkit.sha256.js"></script>

           
    </body>
</html>