<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>YouJi</title>
        <link rel="stylesheet" href="./static/css/reset.css" type="text/css" />
        <link rel="stylesheet" href="./static/css/login.css" type="text/css" />
    </head>
    <body>
            <header class="clearfix">
                        <div id="score"></div>
            <nav class="r">
                <ul>
                    <li><a href="mood.html">点滴心情</a></li>
                    <li><a href="storm.html">头脑风暴</a></li>
                    <li><a href="play.html">一起玩</a></li>
                    <li><a href="story.html">编故事</a></li>
                    <li><a href="check.html">联系我们</a></li>
                </ul>
            </nav>
        </header>
        <aside>
            <div class="vertical-center-helper">
            <ul>
                <li><a href="login.html" class="house"></a></li>
                <li><a href="building.html" class="company"></a></li>
                <li><a href="center.html" class="avator"></a></li>
                <li><a href="publish.html" class="write"></a></li>
                <li><a href="contact_us.html" class="message"></a></li>
            </ul>
            </div>
        </aside>
        <section id="main">
            <div id="login-area" class="login-area">
    <div class="login-container">
        <div id="login-inner" class="login-inner clearfix">
            <div class="login-box register">
                <div class="site-logo"><img src="images/logo.png"></div>
                <p class="login-tip-line">欢迎注册友迹网</p>
                <p id="tip-line"></p>
                     <p class="form-item">
                        <span>用户名</span>
                        <input type="text" name="username" class="username" id="register_uname" />
                        <span class="tips"></span>
                    </p>
                    <p class="form-item">
                        <span>E-mail</span>
                        <input type="text" name="telephone">
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
                        <input type="password" class="password" name="password" id="paword">
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
                        <a href="###">友迹网服务条款</a>
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
            </div>
            <div class="login-box login">
                <div class="site-logo"><img src="images/logo.png"></div>
                <p class="login-tip-line">欢迎登录友迹网</p><br>
                <form method="post">
                    <p class="form-item">
                        <span>帐号</span>
                        <input type="text" name="username" class="username"  id="uname"placeholder="手机/用户名/邮箱登录" />
                        <span class="tips"></span>
                    </p><br>
                    <p class="form-item">
                        <span>密码<b class="ic ic-lock"></b></span>
                        <input type="password" name="password" id="password" class="password">
                        <span class="tips"></span>
                    </p><br>

                    <p class="form-item">
                       <a class="btns btns-light btns-s btn-login " id="login" >登录</a>
                        <span></span>
                        <input type="checkbox" checked="checked" class="remember" />
                        <span id="rem">记住我</span>
                        <span class="tips"></span>
                    </p>
                </form>
                <p class="login-down">
                    <a  class=" btn-modify">忘记密码</a>
                    <span class="dotted">|</span>
                    <a  class="switch-register">点此注册</a>
                    <span class="dotted">|</span>
                    <a href="check.html">联系我们</a>
                <p>
              <!--   <p class="bottom-line sync-line">
                   <span>同步登录：</span>
                    <a href="###" title="Sina" class="sync-login"></a>
                    <a href="###" title="QQ" class="sync-login"></a>
                    <a href="###" title="Renren" class="sync-login"></a>
                </p>-->
            </div>
       <!--     <div class="login-box modify">
                <div class="site-logo"><img src="images/logo.png"</div>
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
                         <!--   <a href="###" class="get-vcode btns btns-light">获取验证码</a>-->
                        </span>
                  <!--    </p>
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
            </div>-->
        </div>
    </div>
</div>
<div id="building-area" class="building-area" style="display:none">
    <div class="building-inner clearfix">
        <section class="building-brief l">
            <h3>什么是大楼?</h3>
            <p></p>
        </section>
        <section class="building-create-box l">
            <div class="building-create">
                <h3>创建一个属于你的大楼</h3>
                <p class="form-line">
                    <span>所在地区</span>
                    <select name="province">
                        <option>北京</option>
                    </select>
                    <select name="city">
                        <option>北京</option>
                    </select>
                    <select name="town">
                        <option>昌平区</option>
                    </select>
                </p>
                <p class="form-line">
                    <span>大楼名称</span>
                    <input type="text" name="" class="building-name" />
                    <a href="###" class="btns btns-light btns-s">提交</a>
                </p>

            </div>
            <div class="building-list-box">
                <h3>为你推荐的大楼</h3>
                <div id="building-list-inner" class="clearfix">
                <ul class="building-list clearfix">
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <img src="./static/images/smile.png" width="20" height="16" class="r" />
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                    <a href="###" class="join-btn">加入</a>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <img src="./static/images/smile.png" width="20" height="16" class="r" />
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                    <a href="###" class="join-btn">加入</a>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                </ul>
                <ul class="building-list clearfix">
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <img src="./static/images/smile.png" width="20" height="16" class="r" />
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                    <a href="###" class="join-btn">加入</a>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <img src="./static/images/smile.png" width="20" height="16" class="r" />
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>
                    <li>
                        <div class="clearfix logo-line">
                            <div class="r right">
                                <p>
                                    <span class="blue">北京化工大学</span>
                                </p>
                                <p>
                                    <span class="blue">已加入</span>
                                    <span> 115 人</span>
                                    <a href="###" class="join-btn">加入</a>
                                </p>
                            </div>
                            <img src="./static/images/smile.png" width="40" height="40" class="l" />
                        </div>
                        <p class="brief">简介：北京化工大学创建与1234年</p>
                    </li>

                </ul>
                </div>
            </div>
            <div id="pager" class="pager">
                <a href="###" class="current" data-pn="1">1</a>
                <a href="###" data-pn="2">2</a>
            </div>
        </section>
    </div>
</div>
        </section>
        <script src="./static/js/jquery-git2.js"></script>
        <script src="./static/js/less-1.3.3.min.js"></script>
        <script src="./static/js/common.js"></script>
        <script src="./static/js/login.js"></script>
        <script src="js/webtoolkit.sha256.js"></script>
        <script src="js/denglu.js"></script>
        <script type="text/javascript">
		
            mood(0,1);//签到心情0代表今天未签到，其他代表已签到
        </script>
    </body>
</html>