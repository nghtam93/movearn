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


        // Nex/Prev Tab
        $('.dao-arrow__left').click(function(e){

            e.preventDefault();
            var prev_tab = $('.nav-dao >.nav-item .active').closest('li').prev('li').find('.nav-link');

            if(prev_tab.length>0){
                prev_tab.trigger('click');
            }

            var prev2_tab = $('.nav-dao >.nav-item .active').closest('li').prev('li');
            if(prev2_tab.length > 0){
                $('.dao-arrow__left').removeClass('disable');
                $('.dao-arrow__right').removeClass('disable');
            }else{
                $('.dao-arrow__left').addClass('disable');

            }
        });
        $('.dao-arrow__right').click(function(e){

            e.preventDefault();
            var next_tab = $('.nav-dao >.nav-item .active').closest('li').next('li').find('.nav-link');

            if(next_tab.length>0){
                next_tab.trigger('click');
            }

            var next2_tab = $('.nav-dao >.nav-item .active').closest('li').next('li');
            if(next2_tab.length >0){
                $('.dao-arrow__right').removeClass('disable');
                $('.dao-arrow__left').removeClass('disable');
            }else{
                $('.dao-arrow__right').addClass('disable');

            }
        });

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

});



(function($, window, document){
    if($('body').hasClass( "home" )){

        // $('[data-toggle]').on('click', function(event) {
        //     event.preventDefault();
        //     var target = $(this.hash);
        //     target.toggle();
        // });

        // Cache selectors
        var lastId,
            topMenu = $(".main__nav, .nav__mobile--ul"),
            topMenuHeight = $('.header').outerHeight() + 0,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function() {
                var item = $(this).attr("href");
                if(item != '#') {return $(item)}
            });
        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function(e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            // e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function() {

           $('.nav__mobile').removeClass('active'); $("body").removeClass('modal-open')
           $('.menu-mb__btn').removeClass('active');

            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop)
                    // console.log(this)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .closest('li').removeClass("active")
                    .end().filter("[href='#" + id + "']").closest('li').addClass("active");
            }
        });
    }
})(jQuery, window, document);
