$(function () {
  //nav 클릭시 배경색, 글자색 변경 이벤트
  $(document).on("click", ".nav-link", function () {
    $(this).addClass("active");
    $(this).parents().siblings().children().removeClass("active");
  });

  //nav 메뉴 동적이벤트
  let onOff = true;
  $(".nav-bar").on("click", function () {
    onOff = !onOff;
    if (!onOff) {
      $(".side-menu-inner").animate({ width: "57px" }, 400);
      $(".nav-bar").animate({ left: "67px" }, 400);
      $(".nav-txt, .nav-arrow").css({ 'display': 'none' });
      $(".nav-main .nav-link").css({ 'padding': '1.8rem' });
      setTimeout(function () {
        $(".logo-area")
          .attr("src", "assets/images/nav_logo_action.png")
          .css({ width: "30px" });
        $(".container").css({ width: "calc(100% - 60px)" });
      }, 400);
    } else {
      $(".logo-area")
        .attr("src", "assets/images/nav_logo.png")
        .css({ width: "160px" });
      $(".side-menu-inner").animate({ width: "200px" }, 400);
      $(".nav-bar").animate({ left: "215px" }, 400);
      $(".container").css({ width: "calc(100% - 200px)" });
      $(".nav-txt, .nav-arrow").css({ 'display': 'block' });
      $(".nav-main .nav-link").css({ 'padding': '1.2rem 1.2rem 1.2rem 3.5rem' });
    }
  });

  //scroll 시 햄버거 버튼 색상 변경
  $(window).on('scroll', function () {
    let scroll = $('html, body').scrollTop();

    if (scroll < 60) {
      $('.nav-bar').css({ 'z-index': 9999 });
      $('.nav-bar .bar').css({ 'background': '#fff', 'z-index': 9999 });
    } else {
      $('.nav-bar').css({ 'z-index': 9999 });
      $('.nav-bar .bar').css({ 'background': '#5d6778' });
    }
  });
});

//resize 시 width값이 800px 이하면 nav상태 변경
$(window).resize(function () {
  let w = $(window).width();
  if (w <= 800) {
    $('.nav-bar').hide();
    $('.side-menu-inner').css({ width: "57px" });
    $(".logo-area").attr("src", "assets/images/nav_logo_action.png").css({ width: "30px" });
    $(".container").css({ width: "calc(100% - 60px)" });
  } else {
    $('.nav-bar').show();
    $('.side-menu-inner').css({ width: "200px" });
    $(".logo-area").attr("src", "assets/images/nav_logo.png").css({ width: "160px" });
    $(".container").css({ width: "calc(100% - 200px)" });
  }
});

//통계 메뉴 클릭 시 하위메뉴 보이게(아코디언)
let onOff1 = true;
$('.nav-static').on('click', function () {
  onOff1 = !onOff1;
  if (!onOff1) {
    $('.static-subMenu').slideDown();
    $('.nav-static a .fa-angle-down').attr('class', 'fa-solid fa-angle-up nav-arrow');
  } else {
    $('.static-subMenu').slideUp();
    $('.nav-static a .fa-angle-up').attr('class', 'fa-solid fa-angle-down nav-arrow');
  }
});

//설정 메뉴 클릭 시 하위메뉴 보이게(아코디언)
let onOff2 = true;
$('.nav-setting').on('click', function () {
  onOff2 = !onOff2;
  if (!onOff2) {
    $('.setting-subMenu').slideDown();
    $('.nav-setting a .fa-angle-down').attr('class', 'fa-solid fa-angle-up nav-arrow');
  } else {
    $('.setting-subMenu').slideUp();
    $('.nav-setting a .fa-angle-up').attr('class', 'fa-solid fa-angle-down nav-arrow');
  }
});

//운영자관리 추가팝업
$('.userT-add').on('click', function () {
  $('#userAddPopup').show();
});
$('#userAddPopup .add-area .addH i, .add-btn-area .close-btn, #userAddPopup .add-area .addH i, .add-btn-area .add-btn').on('click', function () {
  $('#userAddPopup').hide();
  //document.getElementById("test_obj").value = '';
});

//운영자관리 변경팝업
$('#userChPopup .add-area .addH i, .add-btn-area .close-btn, #userChPopup .add-area .addH i, .add-btn-area .change-btn').on('click', function () {
  $('#userChPopup').hide();
});

//운영자관리 삭제팝업
$('#userDelPopup .add-area .addH i, .add-btn-area .close-btn, #userDelPopup .add-area .addH i, .add-btn-area .change-btn').on('click', function () {
  $('#userDelPopup').hide();
});

//서버정보, 알람설정 탭 이동
$('.servertab1').on('click', function (e) {
  e.preventDefault();
  $(this).children().css({ 'background': '#19a0ee', 'color': '#fff' });
  $(this).siblings().children().css({ 'background': '#eee', 'color': '#5d6778' });
  location.replace('../../serverSetting.html');
});
$('.servertab2').on('click', function (e) {
  e.preventDefault();
  $(this).children().css({ 'background': '#19a0ee', 'color': '#fff' });
  $(this).siblings().children().css({ 'background': '#eee', 'color': '#5d6778' });
  location.replace('../../alarmSetting.html');
});

//alert 닫기 이벤트
$('#alert .alert-area .alertH i, .alert-btn-area .okay-btn').on('click', function () {
  $('#alert').hide();
  $('.alert-cont-txt').empty();
});

//excel 저장 비활성화
const execlBtn = document.querySelector('.execl-btn');
execlBtn.disabled = true