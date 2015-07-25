/*其它定制方法*/

/*开关灯效果*/
if(J_KCWidget) $.extend(J_KCWidget, {
	J_Switchlights:function(o,$config){
		var s = {
			'trigger': '.trigger',
			'opacity': 7
		};
		if($config) $.extend(s, $config);
		var active = "ks-i",
			t = $(s.trigger,o),
			p = parseInt( (s.opacity>9) ? 9 : ( (s.opacity<1) ? 1 : s.opacity )) / 10 ;
		t.hover(function() {
			$(this).addClass(active);
			t.not("."+active).css("opacity",p);
		},function() {
			t.removeClass(active).css("opacity",1);
		});
	}
});
