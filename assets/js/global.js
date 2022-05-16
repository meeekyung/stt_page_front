//header.html 불러오기
window.addEventListener("load", function () {
  var allElements = document.getElementsByTagName("*");
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    if (includePath) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;

          //로그아웃
          $('.logout-area').on('click', function () {
            //console.log('로그아웃 성공');
            sessionStorage.removeItem('Bearer'); //삭제
            //sessionStorage.clear(); // 전체삭제
            location.href = "../../login.html"
          });

          //img src 주소 캐시방지
          $(document).ready(function () {
            $('img').attr('src', function () { return $(this).attr('src') + "?a=" + Math.random() });
          });

          //nav 메뉴 동적이벤트
          let onOff = true;
          $(".nav-bar").on("click", function () {
            onOff = !onOff;
            if (!onOff) {
              $(".side-menu-inner").animate({ width: "57px" }, 400);
              $(".nav-bar").animate({ left: "67px" }, 400);
              $(".nav-txt, .nav-arrow").css({ display: "none" });
              $(".nav-main .nav-link").css({ padding: "1.8rem" });
              setTimeout(function () {
                $(".logo-area")
                  .attr("src", "assets/images/nav_logo_action.png")
                  .css({ width: "32px" });
                $(".container").css({ width: "calc(100% - 60px)" });
              }, 300);
            } else {
              $(".logo-area")
                .attr("src", "assets/images/nav_logo.png")
                .css({ width: "160px" });
              $(".side-menu-inner").animate({ width: "200px" }, 400);
              $(".nav-bar").animate({ left: "215px" }, 400);
              $(".container").css({ width: "calc(100% - 200px)" });
              $(".nav-txt, .nav-arrow").css({ display: "block" });
              $(".nav-main .nav-link").css({
                padding: "1.2rem 1.2rem 1.2rem 3.5rem",
              });
            }
          });

          //통계 메뉴 클릭 시 하위메뉴 보이게(아코디언)
          let onOff1 = true;
          $(".nav-static").on("click", function () {
            onOff1 = !onOff1;
            if (!onOff1) {
              $(".static-subMenu").slideDown();
              $(".nav-static a .fa-angle-down").attr(
                "class",
                "fa-solid fa-angle-up nav-arrow"
              );
            } else {
              $(".static-subMenu").slideUp();
              $(".nav-static a .fa-angle-up").attr(
                "class",
                "fa-solid fa-angle-down nav-arrow"
              );
            }
          });

          //설정 메뉴 클릭 시 하위메뉴 보이게(아코디언)
          let onOff2 = true;
          $(".nav-setting").on("click", function () {
            onOff2 = !onOff2;
            if (!onOff2) {
              $(".setting-subMenu").slideDown();
              $(".nav-static a .fa-angle-down").attr(
                "class",
                "fa-solid fa-angle-up nav-arrow"
              );
            } else {
              $(".setting-subMenu").slideUp();
              $(".nav-static a .fa-angle-up").attr(
                "class",
                "fa-solid fa-angle-down nav-arrow"
              );
            }
          });

          //대시보드 메뉴 클릭 시 하위메뉴 보이게(아코디언)
          let onOff3 = true;
          $(".nav-dashboard").on("click", function () {
            onOff3 = !onOff3;
            if (!onOff3) {
              $(".dashboard-subMenu").slideDown();
              $(".nav-dashboard a .fa-angle-down").attr(
                "class",
                "fa-solid fa-angle-up nav-arrow"
              );
            } else {
              $(".dashboard-subMenu").slideUp();
              $(".nav-dashboard a .fa-angle-up").attr(
                "class",
                "fa-solid fa-angle-down nav-arrow"
              );
            }
          });
        }
      };
      xhttp.open("GET", includePath, true);
      xhttp.send();
    }
  });
});

$.getJSON("../../config/config.json", function (json) {

  //token 유무로 링크 이동
  let tokenIs = sessionStorage.getItem("Bearer");
  let flag = true;
  if (window.sessionStorage.Bearer === tokenIs) {
    if (!flag) {
      location.href = "http://" + json.startUrl + "";
      console.log('토큰이 존재함');
    }
  } else if (window.sessionStorage.Bearer !== tokenIs && tokenIs == null) {
    flag = false;
    location.href = "http://" + json.startUrl + "/login";
    console.log('토큰이 존재하지 않음');
  }
});

//img src 주소 캐시방지
$(document).ready(function () {
  $('img').attr('src', function () { return $(this).attr('src') + "?a=" + Math.random() });
});