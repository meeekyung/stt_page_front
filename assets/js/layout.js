$(function () {
  //nav 클릭시 배경색, 글자색 변경 이벤트
  $(document).on("click", ".nav-link", function () {
    $(this).addClass("active");
    //$(this).parents().siblings().children().removeClass("active");
  });

  //nav 메뉴 동적이벤트
  let onOff = true;
  $(".nav-bar").on("click", function () {
    onOff = !onOff;
    if (!onOff) {
      $(".side-menu-inner").animate({ width: "57px" }, 400);
      $(".nav-bar").animate({ left: "67px" }, 400);
      setTimeout(function () {
        $(".logo-area")
          .attr("src", "assets/images/nav_logo_action.png")
          .css({ width: "30px" });
        $(".container").css({ width: "calc(100% - 60px" });
      }, 400);
    } else {
      $(".logo-area")
        .attr("src", "assets/images/nav_logo.png")
        .css({ width: "160px" });
      $(".side-menu-inner").animate({ width: "200px" }, 400);
      $(".nav-bar").animate({ left: "215px" }, 400);
      $(".container").css({ width: "calc(100% - 200px" });
    }
  });

  //scroll 시 햄버거 버튼 색상 변경
  $(window).on('scroll', function () {
    let scroll = $('html, body').scrollTop();
    console.log(scroll);

    if (scroll < 60) {
      $('.nav-bar').css({ 'z-index': 9999 });
      $('.nav-bar .bar').css({ 'background': '#fff', 'z-index': 9999 });
    } else {
      $('.nav-bar').css({ 'z-index': 9999 });
      $('.nav-bar .bar').css({ 'background': '#5d6778' });
    }
  });
});
