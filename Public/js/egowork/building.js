/**
 * @file building.js
 * @author lvchengbin
 * @brief
 */
(function( $ ) {

    var getDialog = function( type ) {
        return $('#building-' + type + '-dialog');
    };
    $('.building-dialogs .close').bind('click', function( e ) {
        $('.building-dialogs').hide('fast');
    });

    $('.building-dialogs .btn-join').bind( 'click', function( e ) {
        getDialog('show').hide();
        getDialog('join').show();
    });

    $('.building-dialogs .btn-edit').bind( 'click', function( e ) {
        getDialog('manager').hide();
        getDialog('edit').show();
    });

    $('.building-dialogs .btn-manager-member').bind( 'click', function( e ) {
        getDialog('manager').fadeOut();
        getDialog('member').fadeIn();
    });

    $('.building-dialogs .btn-back').bind( 'click', function( e ) {
        getDialog('member').fadeOut();
        getDialog('manager').fadeIn();
    });

    $('#building-list .buildings').bind( 'click', function( e ) {
        getDialog('manager').show('fast');
        //getDialog('show').show('fast');
    });

    $('.building-search-show').bind( 'click', function( e ) {
        $('.building-search').show();
    });

})( $ );




