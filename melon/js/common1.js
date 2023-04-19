$(document).ready(function(){
    pageScroll();
    bannerSlider();
    ddiBannerSlider();
    concertInfo();

    
    function pageScroll(){

        $(window).on('scroll', function (){
                var $scrollTop = $(window).scrollTop();
                var $scrollNav = $('.scrollNav');
                // var $navRight = $('.scrollNav').css('right');
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
        var $bannerList = $('.bannerList');
        var $bannerImgNum = $bannerList.children().size();  // 배너 이미지 개수
        console.log($bannerImgNum); // 3
        var $bannerWidth = $bannerList.children().outerWidth(); // 배너 width
        console.log($bannerWidth); // 1400
        $bannerList.css({"width":$bannerWidth*$bannerImgNum}); // 배너를 담은 ul의 width = 1400*3
        $bannerList.css({"left":-$bannerWidth}) // 2번째 li가 첫화면에 표시

        var $timer; // auto slide를 위한 변수

        inEvent();
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
            $bannerList.children().first().appendTo($bannerList);
            $bannerList.css({"left":0})
            $bannerList.animate({"left":-$bannerWidth},500,"easeOutCubic");
        }

        function onSlideLeft(){
            $bannerList.stop();
            $bannerList.children().last().prependTo($bannerList);
            $bannerList.css({"left":-$bannerWidth*2})
            $bannerList.animate({"left":-$bannerWidth},500,"easeOutCubic");
        }

        function autoStop(){		      
            clearInterval($timer);
          }
          
        function autoPlay(){		
            $timer=setInterval(onSlideRight, 5000); 
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
            $ddiBannerItem.eq($currentIndex).stop();
            $ddiBannerItem.eq($currentIndex).animate({'opacity':'0'},1000);
            $ddiBannerItem.eq($nextIndex).stop();
            $ddiBannerItem.eq($nextIndex).animate({'opacity':'1'},1000);
            $currentIndex = $nextIndex;
        }
        setInterval(ddiBannerEvent, 5000);
    }

    function concertInfo(){
        var $concertList = $('.concertList').find('a.eventA'); // ul > li > a
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

        // $closeBtn.on('click', close);
        // function close(){
        //     $concertInfo.css({'display':'none'});
        //     $bgLayer.css({'display':'none'});
        // }
// 아무 li눌러도 나오는거 수정..
    }



})