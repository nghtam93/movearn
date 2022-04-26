$(document).ready(function(){


    // Stick header
    var stick_header = $('.header.-fix')
    if( stick_header.length ){
        if ( stick_header.offset().top >= 100 ) stick_header.addClass("is-sticky");
        $(window).scroll(function(){
            $(this).scrollTop()>10?stick_header.addClass("is-sticky"):stick_header.removeClass("is-sticky")
        })
    }

    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky = $("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }

    $(window).on('load resize', function () {
        setTimeout(function(){
            get_header_height()
        }, 500);
    });

    if($('body').hasClass( "home" )){
        new WOW().init();

        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
          $('.js-flickity').flickity('resize');
        })

    }

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){

            e.preventDefault()

            if($(this).hasClass('active')){
                $(this).removeClass('active')
                $('body').removeClass('modal-open')
                $(menu_id).removeClass('active')
                thiz.removeClass('active')
                $('.header-mb').removeClass('-menu-mb-active')

            } else {
                $(this).addClass('active')
                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                thiz.addClass('active')
                $('.header-mb').addClass('-menu-mb-active')

            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        $('.nav__mobile, .header, .header-mb').mousedown(function(e){ e.stopPropagation(); });
        $(document).mousedown(function(e){ $('.nav__mobile').removeClass('active'); $(thiz).removeClass('active'); $("body").removeClass('modal-open') });

        // Apply options
        return;
    };

    $('.menu-mb__btn').dnmenu()

    //Home page
    var $carousel = $('.nav-roadmap')
    $carousel.on( 'change.flickity', function( event, index ) {
      console.log( 'Slide changed to ' + index )
      var index2 = index + 1
      console.log($('.nav-roadmap li:nth-child('+index2+') .nav-link').html())
      $('.nav-roadmap li:nth-child('+index2+') .nav-link').click()
    });

    // End home page

});


