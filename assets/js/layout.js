$(function () {
  //nav 클릭시 배경색, 글자색 변경 이벤트
  $(".nav-link").on("click", function () {
    $(".nav-link").addClass("active");
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
      }, 400);
    } else {
      $(".logo-area")
        .attr("src", "assets/images/nav_logo.png")
        .css({ width: "190px" });
      $(".side-menu-inner").animate({ width: "250px" }, 400);
      $(".nav-bar").animate({ left: "265px" }, 400);
    }
  });
});

function startInterval(fn, delay) {
  fn();
  setInterval(fn, delay);
}

startInterval(function () {
  $.ajax({
    url: "http://192.168.20.193:55535/channels/server-info",
    method: "GET",
    dataType: "JSON",
    success: function (json) {
      console.log("서버와의 접속에 성공하였습니다.");

      //서버 타이틀
      const getTile01 = document.querySelector(".json-tit1>span");
      getTile01.innerHTML = json.server_id;
    },
    error: function () {
      console.log("서버와의 접속이 실패되었습니다.");
    },
  });
}, 30000);
