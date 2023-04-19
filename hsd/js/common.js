$(window).load(function(){ 

  mainNav();
  headerScroll();
  mobileBtn();
  mobileNav();
  visualSlider();
  btnPosition();
  $(window).resize(function(){  // window의 사이즈가 바뀔때 바로바로 적용
    btnPosition();
  });
  infoBtn();

})


function mainNav(){
  
  var $mainMenu = $('nav.gnb .mainMenu > li > a');
  var $subMenu = $('nav.gnb .subMenu');
  var $bNav = $('.bNav')
  var $mainBg = $('<div class="mainBg"></div>'); // bg생성
  $mainBg.appendTo('.bNav');

  $subMenu.slideUp(0);
  $mainBg.slideUp(0); 

  $mainMenu.on('mouseenter focus', onMenu);
  $bNav.on('mouseleave', outMenu);
  // $subMenu.children().last().children('a').on('focusout', outMenu);

  function onMenu(){
    $subMenu.stop();
    $subMenu.slideDown(300);
    $('nav.gnb .mainMenu').children().removeClass('on');
    $(this).parent().addClass('on');

    $mainBg.stop();
    $mainBg.slideDown(300);
  }

  function outMenu(){
    $subMenu.stop();
    $mainBg.stop();

    $subMenu.slideUp(200);
    $mainBg.slideUp(200);
    $('nav.gnb .mainMenu').children().removeClass('on');
  }

}// ~mainNav


function headerScroll(){

  $(window).on('scroll', onScroll);

  function onScroll(){
    var $headerTop = $(window).scrollTop();
    var $headerWidth = $(window).outerWidth();

    console.log($headerWidth);

    console.log($headerTop);

    if($headerTop > 100 && $headerWidth >=1024){
      $('.headerWrap').addClass('on');
    } else{
      $('.headerWrap').removeClass('on');
    }
  }

}// ~headerScroll

function mobileBtn(){

  var isOpen = false
  $('.mobileNav').css({'opacity':0, 'top':'-100%'});
  $('.mobileBtn').on('click', onMenuActive);

  function onMenuActive(){
    if(isOpen == false){
      $('.line02').addClass('on');
      setTimeout(function(){    // setTimeout = 일정시간이 지나면 실행해라.
        $('.line01').addClass('on');
        $('.line03').addClass('on');
      },150);
      setTimeout(function(){
        $('.mobileBtn a').addClass('on');
      },300);

      $('.mobileNav').animate({'opacity':1, 'top':0},500,'easeOutCubic');
      $('html').css({'overflow':'hidden'});  // 햄버거 메뉴를 누르면 스크롤이 사라진다.

      isOpen = true;
    }else if(isOpen == true){
      $('.line01').removeClass('on');
      $('.line02').removeClass('on');
      $('.line03').removeClass('on');
      $('.mobileBtn a').removeClass('on');

      $('.mobileNav').animate({'opacity':0, 'top':'-100%'},500,'easeOutCubic');

      $('.mobileNav .subMenu').slideUp(0);
      $('.mobileNav > ul > li').removeClass('on');

      $('html').css({'overflow':'visible'}); // 햄버거 메뉴를 다시누르면 스크롤이 생긴다. 
      isOpen = false; 
    }
  }

}

function mobileNav(){

  $('.mobileNav .subMenu').slideUp(0);
  $('.mobileNav .mainMenu > li').on('click', onSubNav);

  function onSubNav(){
    var isMenu = $(this).children('.subMenu').is(':hidden');  //is함수  // is() 는 선택자의 현재상태를 체크해주는 함수다.  
    console.log(isMenu);
                                                            // true false // 클래스나 아이디 유무 // ':hidden' ':visible' .클래스 #아이디 ..등등

    if(isMenu){ 
      $('.mobileNav .mainMenu > li').removeClass('on');
      $('.mobileNav .subMenu').slideUp(300);
      $(this).children('.subMenu').slideDown(300);
      $(this).addClass('on');
    }
  }

}

function visualSlider(){

  var isPlay = true;
  $('.visualSlider').slick({
    autoplay:true,  // << 왼쪽에 보이는 속성들은  slick에서 만든 것. (slick 사이트에 있음.)
    autoplaySpeed:2000,
    arrows:false,
    dots:true
  });
  
  $('.pausePlayBtn').on('click',onPlay);

  function onPlay(){

    if(isPlay == true){
      $('.visualSlider').slick('slickPause');
      $('.pausePlayBtn').addClass('on');
      isPlay = false;
    }else if(isPlay == false){
      $('.visualSlider').slick('slickPlay');
      $('.pausePlayBtn').removeClass('on');
      isPlay = true;
    }
  }

}

function btnPosition(){

  var $dotPosition = $('.slick-dots').children().size() * $('.slick-dots').children().outerWidth(true); // 5 * (50+6) = 280  // 50은 width, 6은 margin-right
  // console.log($dotPosition);                                                     //outerWidth(true)를 넣게 되면 마진, 패딩, 보더값을 모두 포함하여 계산한다.
  var $windowMargin = $('.slick-dots').offset().left; // 366.5
  // console.log($windowMargin);
  $('.pausePlayBtn').css({'left':$dotPosition + $windowMargin});
  
}

function infoBtn(){
  $('.infoMList').slideUp(0);

  $('.infoM button').on('click', onInfo);

  function onInfo(){
    $('.infoMList').slideToggle(300);
    $(this).children().toggleClass('on');
  }

}
