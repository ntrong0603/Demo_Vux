require.config({
    paths: {
        Vue:        '/js/vue',
        Faco:       '/js/faco',
        Chart:      '/js/vue-chart',
        SetHeight:  '/js/vue-set-height',
        jquery:     '/js/jquery',
        lazysizes:  '/js/lazysizes',
        recaptcha:  'https://www.google.com/recaptcha/api.js?hl=ja&t=' + (new Date()).getTime()
    },
    shim: {
        Vue: { exports: 'Vue' },
        Chart: {
            deps: ['/js/chart.js']
        }
    },
    urlArgs: 'bust=' + window.app.bust,
    baseUrl: '/script/'
});

var arguments = [
    'Vue', 'jquery', 'lazysizes'
];

if( window.app.view ){
    arguments.push(window.app.view);
}

require([ ...arguments ], function( Vue, $, lazysizes, ViewModel ){
    $.easing.quart = function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    window.vue = new Vue(
        $.extend(
            true,
            (window.app.view ? ViewModel : {}),
            {
                el: '#js-vue',
                data: (window.app.data || {}),

                methods: {
                    init: function () {
                        $('a[href^="#"]').not('.notscroll').click(function(){
                            let href = $(this).attr('href');

                            if( href == '#' ){
                                return false;
                            }

                            $( 'body,html').animate({
                                    scrollTop: (
                                        $(href).offset().top - (
                                            ($(window).width() <= 883) ? 60 : 0
                                        )
                                    )
                                }, 600, 'quart'
                            );

                            return false;
                        });
                    },

                    toggle: function( elm ){
                        if( elm && typeof elm !== 'string' ){
                            elm = elm.target || null;
                        }

                        if( !elm ){
                            return false;
                        }

                        let elms = $(elm).data('toggle');

                        if( elms && $(elm).hasClass('is-open') ){
                            return false;
                        }

                        $( elms || elm ).toggleClass('is-open');
                    },

                    toError: function(){
                        setTimeout(function(){
                            var elm = $('.c-form__error:first');
                            elm.length && $('html, body').animate({
                                scrollTop: (elm.offset().top - 150)
                            }, 600, 'quart');
                        }, 10);
                    }
                },

                mounted: function(){
                    let toTop = function(){
                        if ($(window).scrollTop() > 2000) {
                            $('.js-btn_totop').addClass('is-show');
                        } else {
                            $('.js-btn_totop').removeClass('is-show');
                        }
                    };

                    this.init();

                    toTop();

                    $(window).scroll(function(){
                        toTop();
                    });
                },

                filters: {
                    noImg: function ( src ) {
                        if( !src || !/\/img\/nophoto\//.test( src ) ){
                            return src;
                        }

                        return '/images/noimage_l.png';
                    }
                },

                directives: {
                    icon: function (el, binding) {
                        $(el).removeClass('is-ok is-req')
                             .addClass(
                                binding.value ? 'is-ok' : 'is-req'
                             );
                    },

                    grade: function(el, binding) {
                        $(el).removeClass('is-ok is-req is-any')
                            .addClass(
                                (faco.get({'any': 'is-any', 'req': 'is-req', 'ok': 'is-ok'}, binding.value) || 'is-any')
                            );
                    }
                }
            }
        )
    );
});

function imgError( elm ){
    elm.onerror = '';
    elm.src = '/images/noimage_l.png';
}
