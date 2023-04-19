$(document).ready(function(){
    continueBtn();
    continueScroll();
    scrollEvent();
    gnbScroll();
    mobileBtn();
});

// CONTINUE 버튼 slideUp
function continueBtn(){
    $('div.scrollDown').css({'bottom':'100px'});
}

//CONTINUE 버튼 click시 #about으로 이동
function continueScroll(){
    $('.scrollDown button').click(function(){
        $('html').animate({scrollTop : $('#about').offset().top}, 1000,'easeOutCubic');
    })
}

function scrollEvent(){

    $(window).on('scroll', function(){
        var $scrollTop = $(window).scrollTop();

        headerEvent();
        navEvent();
        hideIcon();

        // header 이벤트
        function headerEvent(){
            if($scrollTop > 10){
                $('.headerWrap').addClass('on');
            }
            else{
                $('.headerWrap').removeClass('on');
            }
        };

        // scrollTop값에 따른 nav효과
        function navEvent(){
            var $navMenu = $('nav.gnb ul li a'); 
            var $section = $('section');
            
            if(($scrollTop < $section.eq(1).offset().top -80)){
                $navMenu.removeClass('on');
                $navMenu.eq(0).addClass('on');
            }
            else if($scrollTop >= $section.eq(1).offset().top- 80 && $scrollTop < $section.eq(2).offset().top -80){
                $navMenu.removeClass('on');
                $navMenu.eq(1).addClass('on');
            }
            else if($scrollTop >= $section.eq(2).offset().top -80 && $scrollTop < $section.eq(3).offset().top -80){
                $navMenu.removeClass('on');
                $navMenu.eq(2).addClass('on');
            }
            else if($scrollTop >= $section.eq(3).offset().top -80){
                $navMenu.removeClass('on');
                $navMenu.eq(3).addClass('on');
            }
        };
        
        //첫번째 section의 icon(</>) hide 효과 
        function hideIcon(){
            if ($scrollTop > 800){
                $('section.home span.codeIcon').css({'display':'none'})
            }
            else{
                $('section.home span.codeIcon').css({'display':'inline'})
            }
        }
    });
}


// gnb click시 해당 contents로 이동
function gnbScroll(){
    $('nav.gnb li a').click(function(){
        console.log($(this.hash))
        $('html').animate({scrollTop:$(this.hash).offset().top}, 1000,'easeOutCubic');
    })
}

// mobile nav 이벤트
function mobileBtn(){
    var $mobileBtn = $('.mobileBtn');
    var isOpen = false;
    $mobileBtn.on('click', navDrop);
    function navDrop(){
        if(isOpen == false){
            $mobileBtn.children('.navBar').css({'opacity':'0'});
            $mobileBtn.children('.navClose').css({'opacity':'1'});
            $('nav.gnb').css({'top':'0'});
         isOpen = true;   
        }
        else if(isOpen == true){
            $mobileBtn.children('.navBar').css({'opacity':'1'});
            $mobileBtn.children('.navClose').css({'opacity':'0'});
            $('nav.gnb').css({'top':'-100%'});
         isOpen = false;   
        }
    }
}