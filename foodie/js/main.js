$(document).ready(function () {
    fullpage();
    mainNav();
    language();
    mainSlider();
});

function fullpage() {
    $('.fullpage').fullpage({
        // options here
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 800,
    });

}

function mainNav() {

    var $mainMenu = $('nav.gnb .mainMenu > li > a');
    var $subMenu = $('nav.gnb .subMenu');
    var $mainBg = $('<div class="mainBg"></div>'); // background생성
    $mainBg.appendTo('.gnb');

    $subMenu.slideUp(0);
    $mainBg.slideUp(0);

    $mainMenu.on('mouseenter focus', onMenu);
    $('.headerInner').on('mouseleave', outMenu);
    // $subMenu.children().last().children('a').on('focusout', outMenu);

    function onMenu() {

        $subMenu.stop();
        $subMenu.slideDown();
        $('nav.gnb .mainMenu').children().removeClass('on'); /* .mainMenu >li 에게 +on 준거 삭제 */
        $('.mainMenu').addClass('on') /* .mainMenu 한테 +on */
        $(this).parent().addClass('on'); /* .mainMenu > li 한테 +on */
        $('.headerInner').addClass('on');
        $('h1.logo img.companyName').eq(0).css({
            'display': 'none'
        });
        $('h1.logo img.companyName').eq(1).css({
            'display': 'block'
        });
        $mainBg.stop();
        $mainBg.slideDown(300);
    }

    function outMenu() {
        $subMenu.stop();
        $mainBg.stop();
        $subMenu.slideUp(100);
        $mainBg.slideUp(100);
        $('.headerInner').removeClass('on');
        $('nav.gnb .mainMenu').children().removeClass('on');
        $('.mainMenu').removeClass('on')
        $('h1.logo img.companyName').eq(0).css({
            'display': 'block'
        })
        $('h1.logo img.companyName').eq(1).css({
            'display': 'none'
        })
    }

} // ~mainNav


// page01
function mainSlider() {

    $visualList = $('.visualList'); // ul
    $visualItem = $visualList.children(); // li
    $visualImgNum = $visualItem.size(); // 5

    $prevBtn = $('.prevBtn');
    $nextBtn = $('.nextBtn');
    $stopBtn = $('.stopBtn');
    $playBtn = $('.playBtn');

    var $currentIndex = 0;
    var $nextIndex;
    var $prevIndex;
    var $timer;
    var isAutoPlay = true;



    autoPlay();



    $nextBtn.on('click', onNextSlide);
    $prevBtn.on('click', onPrevSlide);
    $stopBtn.on('click', onStopSlide);
    $playBtn.on('click', onPlaySlide);


    $visualItem.eq($currentIndex).css({
        'opacity': 1
    });
    $playBtn.css({
        'display': 'none'
    });


    function onNextSlide() {
        clearInterval($timer);
        $nextIndex = $currentIndex + 1;

        if ($nextIndex >= $visualImgNum) {
            $nextIndex = 0;
        }
        $visualItem.eq($currentIndex).stop();
        $visualItem.eq($currentIndex).animate({
            'opacity': '0'
        }, 500);
        $visualItem.eq($currentIndex).appendTo($visualList);

        $visualItem.eq($nextIndex).stop();
        $visualItem.eq($nextIndex).animate({
            'opacity': '1'
        }, 500);
        $currentIndex = $nextIndex;
        if (isAutoPlay) {
            setTimeout(3000, autoPlay());
        }
    }

    function onPrevSlide() {
        clearInterval($timer);
        $prevIndex = $currentIndex - 1;

        if ($prevIndex < 0) {
            $prevIndex = 4;
        }
        $visualItem.eq($currentIndex).stop();
        $visualItem.eq($currentIndex).animate({
            'opacity': '0'
        }, 500);
        $visualItem.eq($currentIndex).prependTo($visualList);

        $visualItem.eq($prevIndex).stop();
        $visualItem.eq($prevIndex).animate({
            'opacity': '1'
        }, 500);
        $currentIndex = $prevIndex;
        if (isAutoPlay) {
            setTimeout(3000, autoPlay());
        }
    }

    function autoPlay() {
        $timer = setInterval(onNextSlide, 3000);
    }

    function onStopSlide() {
        clearInterval($timer);
        $playBtn.css({
            'display': 'block'
        });
        $stopBtn.css({
            'display': 'none'
        });
        isAutoPlay = false;
    }

    function onPlaySlide() {
        autoPlay();
        $playBtn.css({
            'display': 'none'
        });
        $stopBtn.css({
            'display': 'block'
        });
        isAutoPlay = true;
    }
}

function language(){
    $('div.lang a').click(function (){
        $(this).prependTo('div.lang');
    })
}