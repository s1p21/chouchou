/*
by hayden 2012.12.25
切换无效果时自适应高度

by hayden 2012.12.18
修正 fade效果手动最终为消失的BUG

by hayden 2012.12.16
POP callback执行顺序修正
ie6 Compatible  组件增加外部事件  J_KCWidget.$[].fn.start();unbind();


by hayden 2012.12.10
修正png处理后图片路径会变换大小写导致LINUX服务器不显示图片问题
增加滚动效果、弹出层效果的外部接口 J_KCWidget.$[id].fn
增加pop组件 mask效果 （mask:true）
增加pop组件 fixed 浮动固定，并修正固定位置偏移问题

by hayden 2012.11.30
Widget 库
不再向老版本兼容
修改delay参数，不再用作播放停顿时间了，而做为播放延时时间，默认值为0
关于滚动切换效果中的 “标签  navCls、内容块 contentCls”的两个参数，不再兼容 triggerCls，panelCls
增加播放停顿时间参数：interval

POP弹出层组件更新：
增加参数：
autoClose:true/false  是否自动关闭()
delay:50   延时关闭

by lili 2013.06.01
增加滚轮控制滚动事件
mousewheel:"" 只要设置值则为可控制
*/
var J_KCWidget = (J_KCWidget||{}).prototype={
	J_Tabs:function(o,$config){
		var s = $.extend({
				delay: 3,
				triggerType: 'click',
				autoplay:false
				},$config || {});
		this.J_Carousel(o,s);
	},
	J_Drop:function(o,$config){
		var s = $.extend({
				dmenu:'ul'
				},$config || {}),cls = this;
		$(o).children().each(function(){
			var li = $(this);
			cls.J_Popup(li.find(s.dmenu),s,li);
		});
	},
	J_Popup:function(o,$config,z){
		cls = this;
		var s = $.extend({
				id:"kcdns_Popup_"+Math.random(),
				activeTriggerCls:'ks-active',
				triggerType: 'mouse',
				trigger:'.trigger',
				callback: '',
				autoClose: true,
				fixed:false,
				delay:50,
				mask:false,
				parent:null,
				maskcss:{},
				align:{
					node:null,
					offset:[0,0],
					points:['bl','tl']
				}},$config || {});
			s.triggerType = (s.triggerType=='click')?'click':'mouseover';
			s.triggerCls=((z)?z:$(s.trigger));
			s.tri = null;
		var flag = false;
		var odrop = false;
		var huang = 0;
		var fn = {
			load:function(t){
				odrop = true;
				if (flag){clearTimeout(flag);}
				if (s.tri!=t){
					if (s.mask)this.mask_load();
					s.tri = t;
					t.addClass(s.activeTriggerCls);
					o.css({'position':'absolute','z-index':'10000'});
					this.reset_position();
					o.stop().show();
					if (s.fixed){
						J_KCWidget.J_Compatible(o.css({'position':'fixed'}),{'fixed':true});//,'top':(parseInt(o.css('top'))-$(document).scrollTop())+'px'
					}
					s.tri.add(o).bind('mouseenter', function(event){odrop = true;if (flag){clearTimeout(flag);}});
					if (typeof(s.callback) === "function") s.callback(t,o,'show');
				}
				return false;
			},
			autohide:function(){
				if (flag){clearTimeout(flag);}
				flag = window.setTimeout(function(){s.fn.close()},s.delay);
			},
			reset_position:function(){
				var node = s.align.node;
				var tt = (s.tri)?s.tri:s.triggerCls;
					if (node){
						tt = $(node);
					}
				var tri_parent = tt.offsetParent();
				var ptop = 0,real_tri_top=0;
				var u = s.align.offset,
					p = s.align.points;
				var xy = tt.offset();
					ptop = xy.top; //绝对顶
				if (tri_parent[0]!=$(document.documentElement)[0]){
					real_tri_top = xy.top-tri_parent.offset().top;//相对顶
				}
				var top = position(p[0],ptop,tt.height(),0,1,true);
					top = position(p[1],top,o.height(),0,1,false);
				var o_parent = o.offsetParent();
				if (o_parent[0]!=$(document.documentElement)[0]){
					top -= o_parent.offset().top;
				}
				var left = position(p[0],xy.left,tt.width(),1,2,true);
					left = position(p[1],left,o.width(),1,2,false);
				o.css({'top':(top+u[1])+'px','left':(left+u[0])+'px'});
			},
			close:function(){
				if (flag){clearTimeout(flag);}
				odrop = false;
				var t = (s.tri)?s.tri:s.triggerCls;
				t.removeClass(s.activeTriggerCls);
				o.hide().unbind('mouseenter');
				if (s.mask)this.mask_hide();
				if (typeof(s.callback) === "function") s.callback(t,o,'close');
				s.tri=null;
			},
			maskCls:'J_KCWidget_mask',
			mask_load:function(){
				$("<div class='"+this.maskCls+" J_KCWidget' data-widget-type='Compatible' data-widget-config=\"{fixed:true}\" style=\"position:absolute;left:0;top:0;z-index:9999;background:#000;\"  onclick=\"J_KCWidget.$['bigimg'].fn.close();\"></div>")
					.appendTo("body").css({width:'100%',height:$("body").height()+'px',opacity:0.5})
					.hide().fadeIn();
			},
			mask_hide:function(){
				$("."+this.maskCls).fadeOut('normal',function(){
					$(this).remove();
				})
			}
		};
		s.fn = fn;
		s.close = function(){
			if (flag){clearTimeout(flag);}
			odrop = false;
			var t = (s.tri)?s.tri:s.triggerCls;
			t.removeClass(s.activeTriggerCls);
			o.hide().unbind('mouseenter');
			if (typeof(s.callback) === "function") s.callback(t,o,'close');
			s.tri=null;
		};
		s.start = function(){
			(s.triggerCls).each(function(){
				var $this = $(this);
				$this.unbind().bind(s.triggerType, function(event){s.fn.load($this);});
				if (s.autoClose){
					$this.add(o).bind('mouseleave', function(event){s.fn.autohide();});
				}
			});
		};
		s.unbind = function(){
			(s.triggerCls).each(function(){
				$this.add(o).unbind();
				s.fn.close();
			});
		};
		s.start();
		$(window).resize(function() {if (odrop){s.fn.reset_position(); }});
		//$(window).scroll(function() {if (odrop&&s.fixed){s.fn.reset_position(); }});
		J_KCWidget.$[s.id] = s;
		function position(str,pi,pi2,a,b,iso){
			pi2 = (iso)?pi2:0-pi2;
			switch(str.substring(a,b)){
				case 't':{pi = pi;break;}
				case 'c':{pi = pi+(pi2/2);break;}
				case 'b':{pi = pi+pi2;break;}
				case 'l':{pi = pi;break;}
				case 'r':{pi = pi+pi2;break;}
			}
			return pi;
		}
	},
	J_Accordion:function(o,$config){
		var s = $.extend({
				activeTriggerCls:'ks-active',
				triggerType: 'click',
				triggerCls: '.ks-switchable-trigger',
				panelCls: '.ks-switchable-panel',
				callback: '',
				multiple: false
				},$config || {}),
			active = s.activeTriggerCls;
		triggerType = ((s.triggerType=='click')?'click':'mouseover');
		o.children(s.triggerCls).bind(triggerType, function(event){
			var n = $(this),p = $(this).next(s.panelCls);
			if (triggerType=='mouseover'){ /*防止在active状态时，鼠标经过时会隐藏或晃动*/
				n.addClass(active);
				p.show();
			}else {
				n.toggleClass(active);
				p.toggle();
			}
			if (s.multiple==false){
				n.siblings(s.triggerCls).removeClass(active);
				p.siblings(s.panelCls).hide();
			}
			if (typeof(s.callback) === "function") s.callback(n,p);
		});
	},
	J_Compatible:function(o,$config){
		var s = $.extend({
			id:"kcdns"+Math.random(),
			png:false,
			png_bg:false,
			png_tag:false,
			fixed: false,
			animate: false,
			duration: '50'
			},$config || {});
		if($config) $.extend(s, $config);
		s.fn = {
			init:function(){
				if(!window.XMLHttpRequest){
					if (s.fixed) s.fn.fixed.init();//开启悬浮定位
					if (s.png&&s.png_bg) s.fn.png.bg();//开启背景PNG透明
					if (s.png&&s.png_tag) s.fn.png.tag();//开启IMG PNG透明
				}
			},
			fixed:{
				init:function(){
					this.start();
					this.top = parseInt(o.css('top'));
					this.bottom = parseInt(o.css('bottom'));
					this.setpos();
					if (s.animate){
						var $$ = this;
						$(window).scroll(function(){$$.windowfn();}).resize(function(){$$.windowfn();});
					}
				},
				windowfn:function(){
					if (s.animate){ this.setpos();}
				},
				start:function(){
					$("html").css({'background-image':'url(about:blank)','background-attachment':'fixed'}); /*用浏览器空白页面作为背景*/
					o.css('position' , ((!window.XMLHttpRequest)?'absolute':'fixed'));
					if (this.top) o.css('top',this.top+"px;");
					if (this.bottom) o.css('bottom',this.bottom+"px;");
				},
				unbind:function(){
					o.css('position' , 'static');
				},
				setpos:function(){
					if (s.animate) {
						o.stop().animate({'top':this.pos()},s.duration);
					}else{
						o[0].style.setExpression('top', 'eval(((documentElement.scrollTop + documentElement.clientHeight)>(documentElement.scrollTop+' + this.pos(true)+"+this.offsetHeight)) ? (documentElement.scrollTop+" + this.pos(true)+') : (documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight))');
						$(window).scrollTop($(window).scrollTop());
					}
				},
				pos:function(t){
					var n = '0';
					if (t){
						n = (!isNaN(this.top)) ? this.top : ((!isNaN(this.bottom)) ? 'documentElement.clientHeight-this.offsetHeight-'+this.bottom : n);
					}else{
						n = $(window).scrollTop() + ((this.top)? this.top : ((this.bottom) ? $(window).height() - o.height() - this.bottom : n));
					}
					return n;
				}
			},
			png:{
				bg:function(){
					var obj = o[0],bg = obj.currentStyle.backgroundImage;
					if (!bg) return;
					if (bg.toUpperCase().match(/.PNG/i) != null){
						obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg.substring(5,bg.length-2)+"', sizingMethod='scale')";
						obj.style.backgroundImage = "url('')";
					}
				},
				tag:function(){
					var obj = o[0],imgName = obj.src.toUpperCase();
					if (imgName.substring(imgName.length-3, imgName.length) != 'PNG') return ;
					var imgStyle =  'width:' + obj.width + 'px; height:' + obj.height + 'px;'
						+((obj.align == 'left')?'float:left;':'')
						+((obj.align == 'right')?"float:right;":'')
						+((obj.parentElement.href)?'cursor:hand;':'')
						+'display:inline-block;' + obj.style.cssText
						+'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader'
						+"(src=\'" + obj.src + "\', sizingMethod='scale');";
					$("<span "
						+ ((obj.id) ? "id='" + obj.id + "' " : "")
						+ ((obj.className) ? "class='" + obj.className + "' " : "")
						+ ((obj.title) ? "title='" + obj.title + "' " : "title='" + obj.alt + "' ")
						+ " style=\"" + imgStyle + "\"></span>").replaceAll(o);
				}
			}
		};
		s.fn.init();
		J_KCWidget.$[s.id] = s ;
		return o;
	},
	J_Slidy:function(o,$config){
		var s = $config;
		var c_l = o.find(s.contentCls).children();
		if (s.width)c_l.css({width:s.width+"px"});
		if (s.height)c_l.css({height:s.height+"px"});
		this.J_Carousel(o,s);
	},
	J_Carousel:function(o,$config){
		var s = $.extend({
				id:"kcdns"+Math.random(),
				effect: 'none',
				navCls: '.ks-switchable-nav',
				contentCls: '.ks-switchable-content',
				triggerType: '',
				hasTriggers: true,
				steps: 1,
				viewSize: '',
				activeIndex: 1,
				activeTriggerCls: 'ks-active',
				circular: true,
				prevBtnCls: '',
				nextBtnCls: '',
				mouseroll: '',
				disableBtnCls: '',
				duration:1,//动画速度
				interval:3,//停顿时间
				delay: 1,//延时
				autoplay:false,
				countdown:false,
				countdownFromStyle:'',
				countdownCls:'.ks-switchable-trigger-mask',
				callback: '',
				placeholder:'/templets/qlgy/images/blank.gif',
				imgload:false
				},$config || {}),
			mytime = false,
			c = $(s.contentCls,o),
			c_l		= c.children(),
			n		= $(s.navCls,o),
			len		= c_l.length,
			page    = Math.ceil(len/s.steps),
			u_w     = (s.viewSize) ? s.viewSize:c_l.eq(0).width()*s.steps,//一屏尺寸
			u_h     = (s.viewSize) ? s.viewSize:c_l.eq(0).height()*s.steps,
			allwidth   = u_w*page,//总尺寸
			allheight  = u_h*page;
			s.duration = s.duration*1000,
			$this = this;
		if (!n[0]){
			n = $("<ul></ul>").appendTo(o).addClass(s.navCls.substr(1));
		}
		var n_l	= n.children();
		if (typeof(n_l[0])!='object'||n.html()==''){
			for (var i=0;i<page ;i++ ){
				n.append("<li>"+(i+1)+"</li>");
			}
		}
		n_l	= n.children();

		var fn = {//全局控制
			unbind:function(){
				clearInterval(mytime);n_l.unbind();o.unbind();unloadBtn();
				if (s.circular) {
					var html = $(s.contentCls,o).html();
					$(s.contentCls,o).html(html.split("<!-- ## -->")[0]);
				}
			},
			start:function(){
				this.unbind();
				J_KCWidget.init(o,s);
			},
			to:function(i){
				myShow(i);
			},
			next:function(i){
				myShow(s.activeIndex+1);
			},
			pre:function(i){
				myShow(s.activeIndex-1);
			}
		};
		s.fn = fn;
		if (len<s.steps) return;
		if (s.effect=="fade"||s.effect=="none") c_l.hide();//.css({position: "absolute",top:"0",left:"0"})
		else{
			c.css({position: "absolute",top:"0",left:"0"});
			c_l.css({float:"left",display:"inline",overflow:"hidden"});
			if (s.circular) c.append('<!-- ## -->'+c.html());
			if (s.effect=="scrollx"){c.css({width:"9999px"});
			}else if (s.effect=="scrolly") c_l.css({clear:"left"});
		}
		if (s.imgload){
			c.J_KCWidget_imgload('reset',s.placeholder);
		}
		if (s.interval*1000>100) myShow(s.activeIndex,true);//第一次播放
		else setforli(s.activeIndex-1);
		if ((s.triggerType!='none')){
			s.triggerType = (s.triggerType=='click')?'click':'mouseover';
			n_l.bind(s.triggerType, function(event){myShow(n_l.index(this)+1,true);});
		}
		if (s.autoplay){	//如果为自动播放，则响应鼠标滑入测出控制播放行为
			if (!mytime)play();
			o.hover(function(){
				if(mytime) clearInterval(mytime);
			},function(){play();});
		}
		J_KCWidget.$[s.id] = s ;
		function myShow(i,f){
			unloadBtn();
			var fi = i-1 ;//虚拟索引值
			var modfi = fi%page;modfi = (modfi<0)?modfi+page:modfi;//真实索引

			var isscrolly = false,css={};
			switch(s.effect) {
				case "scrolly":
					css['top'] = -animate('top',u_h,allheight,modfi,i)+"px";
					isscrolly = true;
				case "scrollx":
					if (!isscrolly) css['left'] = -animate('left',u_w,allwidth,modfi,i)+"px";
					c.stop(true,false).animate(css, ((f)?s.duration/2:s.duration),function(){
						loadBtn();
					});
					break;
			   case "fade":
					//c_l.eq(modfi).siblings().css("z-index","0").hide();
					c_l.stop(true,true).eq(modfi).fadeIn(s.duration/2).css("z-index","1").siblings().css("z-index","0").hide();loadBtn();break;
			   case "none":
					c_l.css({"z-index":"0","display":"none"})
					.eq(modfi).css({"display":"block"}).css("z-index","1");loadBtn();break ;
			   default:
			}
			setforli(modfi);
			if (typeof(s.callback)==="function") s.callback(modfi,n_l,c_l);
			setdisplay();countdown(modfi);
		};
		/*
		type：滚动方式 top,left
		t_u:单位尺寸
		t_all:全尺寸
		t_m:真实索引
		i:当前指针
		返回，目标位置{top:a,left:b}
		*/
		function animate(type,t_u,t_all,t_m,i){
			var re = (i<1||(!s.circular))? t_u*t_m :t_u*(i-1);
			var t_n = parseInt(c.css(type));
			var css={};
			if (s.circular){
				if (Math.abs(t_n)>=t_all){
					css[type] = (t_n%t_all)+"px";//默认回到原像原位置
				}
				if (i<1){
					css[type] = -(Math.abs(t_n%t_all)+t_all)+ "px";//向上翻过0点，重置到镜像
				}
				if (css[type]) c.css(css);//动作前初始化当前位置
			}
			return re;
		}
		function countdown(i){//倒计时效果
			if (!s.countdown||s.autoplay==false) return;
			var n_l_li = n_l.eq(i);
			var countdownCls = n_l_li.find(s.countdownCls);//取trigger-mask对象
			if (!countdownCls[0]) countdownCls = $("<div class='ks-switchable-trigger-mask'></div>").prependTo(n_l_li);
			s.countdownFromStyle = (s.countdownFromStyle)?s.countdownFromStyle:n_l_li.width();//计算初始样式
			countdownCls.css({'width':s.countdownFromStyle+'px'}).animate({width:'0px'},s.interval*1000);//启动效果
		}
		function setdisplay(){//设置前后按钮样式
			if (!s.circular&&s.disableBtnCls!=""){
				$(s.nextBtnCls+","+s.prevBtnCls,o).removeClass(s.disableBtnCls);
				if (s.activeIndex == page) $(s.nextBtnCls,o).addClass(s.disableBtnCls);
				if (s.activeIndex == 1) $(s.prevBtnCls,o).addClass(s.disableBtnCls);
			}
		}
		function play(){
			var doing;
			if (s.interval*1000<100&&(s.effect=='scrollx'||s.effect=='scrolly')){
			  var css = {};
			  var type = (s.effect=='scrollx') ? 'left' : 'top';
			  var all = (s.effect=='scrollx') ? allwidth : allheight;
			  var u = (s.effect=='scrollx') ? u_w : u_h;
			  doing = function(){
				 var d = Math.abs(parseInt(c.css(type)));
				 d = (d == all)? 0 : (d+1);
				 css[type] = -d+"px";
				 c.css(css);
				 if (d%u==0) setforli(d/u);
			  }
			}else{
				doing = function(){
					myShow(s.activeIndex+1);
				}
			}
			mytime = setInterval(function(){
				if ($this['inline'](o))doing();
				},s.interval*1000)//设置定时器
			//try{document.execCommand("BackgroundImageCache", false, true);}catch(e){};
		}
		function setforli(i){
			n_l.eq(i).addClass(s.activeTriggerCls).siblings().removeClass(s.activeTriggerCls);

			if (s.imgload){
				for (var j=0;j<((i+2)>page ? page : (i+2))*s.steps;j++){
					c.children().eq(j).add(c.children().eq(j+len)).J_KCWidget_imgload('load',s.placeholder);
				}
			}
			s.activeIndex = (i+1);
		}
		function loadBtn(){
			if (s.prevBtnCls!=""){
				o.find(s.prevBtnCls).unbind().bind("click",function(){myShow(s.activeIndex-1);});
			}
			if (s.nextBtnCls!=""){
				o.find(s.nextBtnCls).unbind().bind("click",function(){myShow(s.activeIndex+1);});
			}
			if (s.mouseroll!=""){
				o.mousewheel(function(event,delta){
					if (delta>0){
						myShow(s.activeIndex-1);
					}else if(delta<0){
						myShow(s.activeIndex+1);
					}
					return false;
				});
				return false;
			}
		}
		function unloadBtn(){
			o.find(s.prevBtnCls).unbind();
			o.find(s.nextBtnCls).unbind();
			o.unbind("mousewheel");
		}
	},
	J_Countdown:function(o,$config){
		var d = new Date();
		var c = $.extend({
			 beginTime: gt(d),
			 endTime: gt(new Date(d.valueOf() + 24*60*60*1000)),
			 timebeginCls: '.ks-countdown-start',
			 timeRunCls: '.ks-countdown-run',
			 timeEndCls: '.ks-countdown-end',
			 timeUnitCls:{
				d: '.ks-d',
				h: '.ks-h',
				m: '.ks-m',
				s: '.ks-s'
				},
			 minDigit: 1//每个时间单位值显示的最小位数
			},$config || {}),
			T_D		= $(c.timeUnitCls.d,o),  //天数
			T_H		= $(c.timeUnitCls.h,o),  //小时
			T_M		= $(c.timeUnitCls.m,o),  //分钟
			T_S		= $(c.timeUnitCls.s,o),  //秒
			e		= ct(c.endTime),  //格式化倒计时终止时间
			b		= ct(c.beginTime),  //格式化倒计时开始时间
			obj		=[$(c.timebeginCls,o),$(c.timeRunCls,o),$(c.timeEndCls,o)], //开始前内容
			obt		=[T_D.length>0,T_H.length>0,T_M.length>0], //天分时秒表单存在否
			ft		= parseInt((new Date(e).getTime() - new Date(b).getTime())/1000),    //计算时间差,以秒为单位
			isstart = new Date(b).getTime() - d.getTime(),     //开始时间与当前时间的差值
			isend	= new Date(e).getTime() - d.getTime(),     //终止时间与当前时间的差值
			css		= new Array('none','inline');
		$(T_D).add(T_H).add(T_M).add(T_S).html(0);
		SetRemainTime();
		var InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
		function SetRemainTime() {
			if(isstart > 0){ //如果开始时间晚于当前时间，则只显示“倒计时还未开始”层
				set([1,0,0]);
			}else if(isend < 0){ //如果终止时间早于当前时间，则只显示“倒计时结束了”层
				set([0,0,1]);
			}else if(ft > 0){
				set([0,1,0]);
				ft--;
				var d = Math.floor((ft / 3600) / 24),        //计算天
					h = f(Math.floor((ft / 3600) % 24)),      //计算小时
					m = f(Math.floor((ft / 60) % 60)),      //计算分
					s = f(Math.floor(ft % 60));             // 计算秒
				T_D.html(f(d));
				h=(obt[0])?h:d*24+h;T_H.html(f(h));
				m=(obt[1])?m:h*60+m;T_M.html(f(m));
				s=(obt[2])?s:m*60+s;T_S.html(f(s));
			}else{//剩余时间小于或等于0的时候，就停止间隔函数
				set([0,0,1]);
				window.clearInterval(InterValObj);//这里可以添加倒计时时间为0后需要执行的事件
			}
		}
		function f(str){//补位
			var seats = c.minDigit*1-String(str).length;
			for (var i=0;i<seats;i++ )str = "0" + String(str);
			return str;
		}
		function set(s){for (i in obj) obj[i].css('display',css[s[i]]);}//各状态显示
		function ct(str){return str.replace(/-/g,"/").replace(/ /g,",");}//格式化时间
		function gt(t){return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.toLocaleTimeString();}//取时间
	},
	init:function(o){
		this.J_Slide = this.J_Slidy;
		try {this["J_"+o.attr("data-widget-type")](o,(new Function("return " + o.attr("data-widget-config")))()||{});}
		catch (e){$("body").append('class=['+o.attr("class")+']  id=['+o.attr("id")+']  :  ' + e.description);};
	},
	$:[],
	inline:function(o){//判断是否在浏览器可视范围中
		var d = o.offset(),
			t = $(window).scrollTop(),
			l = $(window).scrollLeft(),
			w = $(window).width(),
			h = $(window).height(),
			ow = o.width(),
			oh = o.height();
		if (
			(((t+h)>d.top && d.top>t)||((t+h)>(d.top+oh) && (d.top+oh)>t)) &&
			(((l+w)>(d.left+ow) && (d.left+ow)>l) || ((l+w)>(d.left) && (d.left)>l))
			){
			return true;
		}else{
			return false;
		}
	}
};
(function($){
	$.fn.J_KCWidget = function() {
		this.each(function(){
			J_KCWidget.init($(this));
		});
		return this;
	};
	$.fn.J_KCWidget_imgload = function(type,placeholder) {
		$("img",this).each(function(){
			var src=$(this).attr('src'),
				datasrc = $(this).attr('data-src');
			if (type=='reset'){
				if (src!=placeholder){
					$(this).attr('data-src',src);
					if (placeholder){
						$(this).attr('src',placeholder);
					}else{
						$(this).removeattr('src');
					}
				}
			}else if (type=='load'){
				if ((src==placeholder||src==undefined)&&datasrc!=undefined){
					$(this).attr('src',datasrc);
				}
			}
		});
		return this;
	};
})(jQuery);