(function( $ ) {
    var show = 'mood';

    $('#publish-box .switch-btn').bind( 'click', function( e ) {
        var type = $(this).attr( 'data-switch-type');

        if( type === 'show' ) return false;

        $('#publish-box .switch-btn').removeClass('current');
        $(this).addClass('current');

        $('#' + show).hide();

        $('#' + type).fadeIn();

        show = type;

    });

    var showDialog = function( show ) {
        $('#publish-box .publish-dialog').css('top', show ? '20%' : '-100%');
    };

    $('#publish-box .choose-building').bind( 'click', function( e ) {
        showDialog( true );
        return false;
    });


    $('#publish-box .publish-dialog .close').bind( 'click', function( e ) {
        showDialog( false );
        return false;
    });


    $('#publish-box .publish-dialog .btn-confirm').bind( 'click', function( e ) {
        var tags = $('#publish-box .publish-dialog .bd label'),
            result = [];

        tags.each( function( index ) {
            if( $(this).find('input[type=checkbox]').eq(0).attr('checked') ) {
                result.push( $(this).find('span').eq(0).text() );
            }
        });


        showDialog( false );
        return false;
    });

	$("input[name='pic']").on("change",function(){
		var purl = $("input[name='pic']").val();
		alert("请添加上传组件 添加 "+ purl +" 文件")
		//$("textarea[name='info']").val(purl);
	});


})( $ );
