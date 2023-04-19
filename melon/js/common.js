$(document).ready(function(){
    pageScroll();
    bannerSlider();
    ddiBannerSlider();
    concertInfo();
    mobileBtn();
})

function pageScroll(){

    $(window).on('scroll', function (){
            var $scrollTop = $(window).scrollTop();
            var $scrollNav = $('.scrollNav');
            if($scrollTop > 150){
                $scrollNav.css({'right':'30px'});
                $scrollNav.css({'opacity':'0.5'});
            }
            if($scrollTop < 150){
                $scrollNav.css({'right':'-50px'});
                $scrollNav.css({'opacity':'0'});
            }
        }
    )

    var $scrollUp = $('.scrollUp');
    var $scrollDown = $('.scrollDown');

    $scrollUp.on('click', pageUp);
    function pageUp(){
        $('html,body').animate({'scrollTop':'0'},'slow');
    }

    $scrollDown.on('click', pageDown);
    function pageDown(){
        $('html,body').animate({'scrollTop':$(document).height()},'slow');
    }

}

function bannerSlider(){
    var $bannerList = $('.bannerList'); // ul
    var $bannerImgNum = $bannerList.children().size();  // 배너 이미지 개수
    // console.log($bannerImgNum); // 3
    var $bannerWidth = $bannerList.children().outerWidth(); // 배너 width
    // console.log($bannerWidth); // 1400
    $bannerList.css({"width":$bannerWidth*$bannerImgNum}); // 배너를 담은 ul의 width = 1400*3
    $bannerList.css({"left":-$bannerWidth}); // 2번째 li가 첫화면에 표시
    var $timer; // auto slide를 위한 변수

    inEvent(); // 슬라이드 이벤트
    autoPlay();
    function inEvent(){
        $('.rightBtn').on('click', onSlideRight); // (< >) 버튼 클릭시 이벤트
        $('.leftBtn').on('click', onSlideLeft);
        $('.rightBtn').on('mouseenter', autoStop);  // 버튼 mouseenter 할 때 자동 이벤트 중지
        $('.leftBtn').on('mouseenter', autoStop);
        $('.rightBtn').on('mouseleave', autoPlay); // 버튼 mouseleave 할 때 자동 이벤트 시작
        $('.leftBtn').on('mouseleave', autoPlay);
        $bannerList.on('mouseenter', autoStop); // 배너 mouseenter 할 때 자동 이벤트 중지
        $bannerList.on('mouseleave', autoPlay); // 배너 mouseleave 할 때 자동 이벤트 시작
    }

    function onSlideRight(){
        $bannerList.stop();
        $bannerList.children().first().appendTo($bannerList); // 첫번째 li를 ul의 맨 뒤로
        $bannerList.css({"left":0});
        $bannerList.animate({"left":-$bannerWidth},500,"easeOutCubic"); 
    }

    function onSlideLeft(){
        $bannerList.stop();
        $bannerList.children().last().prependTo($bannerList);  // 마지막 li를 ul의 맨 앞으로
        $bannerList.css({"left":-$bannerWidth*2});
        $bannerList.animate({"left":-$bannerWidth},500,"easeOutCubic");
    }

    function autoPlay(){		
        $timer=setInterval(onSlideRight, 5000); // $timer on (5초마다 onSlideRight를 실행한다.)
    }
    function autoStop(){		      
        clearInterval($timer); // $timer off
    }
      
}

function ddiBannerSlider(){
    var $ddiBannerItem = $('.ddiBannerWrap .ddiBanner a'); // bannerList
    var $ddiBannerNum = $ddiBannerItem.size(); // 2개
    var $currentIndex = 0; 

    function ddiBannerEvent(){
        var $nextIndex = $currentIndex + 1;
        if($nextIndex >= $ddiBannerNum){
            $nextIndex = 0;
        }
        $ddiBannerItem.eq($currentIndex).animate({'opacity':'0'},1000);
        $ddiBannerItem.eq($nextIndex).animate({'opacity':'1'},1000);
        $currentIndex = $nextIndex;
    }
    setInterval(ddiBannerEvent, 5000);
}

function concertInfo(){
    var $concertList = $('.concertList').find('a.eventA'); // ul > li > a.eventA
    var $bgLayer = $('.bgLayer');
    var $closeBtn = $('.closeBtn');

    $concertList.on('click', concertShow);
    $closeBtn.on('click', concertHide);
    $bgLayer.on('click', concertHide);

    function concertShow(){
        $(this).next('.concertInfo').show();
        $(this).next('.concertInfo').css({'opacity':1})
        $bgLayer.show();
        $bgLayer.animate({'opacity':0.8},500,'easeOutCubic');
    }
    function concertHide(){
        $bgLayer.stop();
        $('.concertInfo').css({'opacity':0});
        $('.concertInfo').hide();
        $bgLayer.css({'opacity':0})
        $bgLayer.hide();
    }
}

function mobileBtn(){

    var isOpen = false;
    $('.mobileBtn').on('click', onMenuActive);
  
    function onMenuActive(){

      if(isOpen == false){
        $('.line02').addClass('on');
        setTimeout(function(){    // 0.15초 뒤에 실행
          $('.line01').addClass('on');
          $('.line03').addClass('on');
        },150);
        setTimeout(function(){    // 0.3초 뒤에 실행
          $('.mobileBtn button').addClass('on');
        },300);

        $('.mobileNav').animate({'opacity':1, 'left':0},500,'easeOutCubic');
        $('html').css({'overflow':'hidden'});  // 햄버거 메뉴를 누르면 스크롤이 사라진다.
        $('.mobileBtn').css({'position':'fixed'});
        $('.mobileBtn').css({'top':'35px'});
        $('.mobileBtn').css({'right':'15px'});
        isOpen = true;

      }else if(isOpen == true){
        $('.line01').removeClass('on');
        $('.line02').removeClass('on');
        $('.line03').removeClass('on');
        $('.mobileBtn button').removeClass('on');
  
        $('.mobileNav').animate({'opacity':0, 'left':'100%'},500,'easeOutCubic');
        $('html').css({'overflow':'visible'}); // 햄버거 메뉴를 다시누르면 스크롤이 생긴다. 
        $('.mobileBtn').css({'position':'absolute'});
        $('.mobileBtn').css({'top':'14px'});
        $('.mobileBtn').css({'right':'92%'});
        isOpen = false;
      }
    }
  
  }