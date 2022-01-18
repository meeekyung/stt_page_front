//전체 리스트 출력
var startInterval;
function allList() {
  //startInterval = setInterval(function(){
  $.ajax({
    url: "http://192.168.20.123:55532/monitor/channels",
    method: "GET",
    dataType: "JSON",

    success: function (json) {
      $(".channel-area").empty(); //append로 출력된 내용을 지워주는 역할

      //모니터링 목록(우선, 대기중) 출력
      for (var i = 0; i < json.length; i++) {
        if (json.length >= 0) {
          $(".channel-area").append(
            '<div id="channelBox' + i + '" class="channel-box channel-wait"><div class="channel-inner"><div class="channel-sever-txt" id="channelSeverName' + i + '"></div><div class="channel-img wait-icon-img"></div><div class="channel-tit" id="channelNum' + i + '"></div></div></div>'
          );
        }
      }

      //모니터링 리스트에서 채널번호 및 서버이름 출력
      for (var i = 0; i < json.length; i++) {
        //채널번호 출력
        $("#channelNum" + i).text('0' + json[i].name);
        //서버이름 출력
        $("#channelSeverName" + i).text(json[i].server);
      }

      //대기중에서 상담중으로 전환
      for (var i = 0; i < json.length; i++) {
        const dataActive = json[i].active;

        if (dataActive == "상담 중") {
          $("#channelBox" + i)
            .removeClass("channel-wait")
            .addClass("channel-counsel");
          $(".channel-counsel .channel-img")
            .removeClass("wait-icon-img")
            .addClass("counsel-icon-img");
        } else if (dataActive == "대기 중") {
          $("#channelBox" + i)
            .removeClass("channel-counsel")
            .addClass("channel-wait");
          $("channel-counsel .channel-img")
            .removeClass("counsel-icon-img")
            .addClass("wait-icon-img");
        }
      }
    },
    error: function () {
    },
  });
  //}, 3000);  
  startInterval = setTimeout(allList, 3000);
}
allList();
function allListstop() {
  clearTimeout(startInterval);
}

//전체 탭 클릭 후 리스트 출력
var allListInterval;
$("#allTab").on("click", function () {
  allListstop();
  grpcListstop();
  restListstop();

  //tab표시
  $("#allTab").addClass("tab-on").siblings("li").removeClass("tab-on");
  //allListInterval = setInterval(function(){
  function clickAllList() {
    $.ajax({
      url: "http://192.168.20.123:55532/monitor/channels",
      method: "GET",
      dataType: "JSON",

      success: function (json) {
        $(".channel-area").empty(); //append로 출력된 내용을 지워주는 역할

        //모니터링 목록(우선, 대기중) 출력
        for (var i = 0; i < json.length; i++) {
          if (json.length >= 0) {
            $(".channel-area").append(
              '<div id="channelBox' + i + '" class="channel-box channel-wait"><div class="channel-inner"><div class="channel-sever-txt" id="channelSeverName' + i + '"></div><div class="channel-img wait-icon-img"></div><div class="channel-tit" id="channelNum' + i + '"></div></div></div>'
            );
          }
        }

        //모니터링 리스트에서 채널번호 및 서버이름 출력
        for (var i = 0; i < json.length; i++) {
          //채널번호 출력
          $("#channelNum" + i).text('0' + json[i].name);
          //서버이름 출력
          $("#channelSeverName" + i).text(json[i].server);
        }

        //대기중에서 상담중으로 전환
        for (var i = 0; i < json.length; i++) {
          const dataActive = json[i].active;

          if (dataActive == "상담 중") {
            $("#channelBox" + i)
              .removeClass("channel-wait")
              .addClass("channel-counsel");
            $(".channel-counsel .channel-img")
              .removeClass("wait-icon-img")
              .addClass("counsel-icon-img");
          } else if (dataActive == "대기 중") {
            $("#channelBox" + i)
              .removeClass("channel-counsel")
              .addClass("channel-wait");
            $("channel-counsel .channel-img")
              .removeClass("counsel-icon-img")
              .addClass("wait-icon-img");
          }
        }
      },
      error: function () {
      },
    });
    //}, 3000);
    allListInterval = setTimeout(clickAllList, 3000);
  }
  clickAllList();
});
function clickAllListstop() {
  clearTimeout(allListInterval);
}

//gRPC 탭 클릭 후 리스트 출력
var grpcInterval;
$("#grpcTab").on("click", function () {
  allListstop();
  restListstop();
  clickAllListstop();

  //tab표시
  $("#grpcTab").addClass("tab-on").siblings("li").removeClass("tab-on");
  //grpcInterval = setInterval(function(){
  function grpcList() {
    $.ajax({
      url: "http://192.168.20.123:55532/monitor/channels",
      method: "GET",
      dataType: "JSON",

      success: function (json) {
        $(".channel-area").empty(); //append로 출력된 내용을 지워주는 역할

        //모니터링 목록(우선, 대기중) 출력
        for (var i = 0; i < json.length; i++) {
          if (json.length >= 0) {
            if (json[i].server == "gRPC")
              $(".channel-area").append(
                '<div id="channelBox' + i + '" class="channel-box channel-wait"><div class="channel-inner"><div class="channel-sever-txt" id="channelSeverName' + i + '"></div><div class="channel-img wait-icon-img"></div><div class="channel-tit" id="channelNum' + i + '"></div></div></div>'
              );
          }
        }

        //모니터링 리스트에서 채널번호 및 서버이름 출력
        for (var i = 0; i < json.length; i++) {
          //채널번호 출력
          $("#channelNum" + i).text(json[i].name);
          //서버이름 출력
          $("#channelSeverName" + i).text(json[i].server);
        }

        //대기중에서 상담중으로 전환
        for (var i = 0; i < json.length; i++) {
          const dataActive = json[i].active;

          if (dataActive == "상담 중") {
            $("#channelBox" + i)
              .removeClass("channel-wait")
              .addClass("channel-counsel");
            $(".channel-counsel .channel-img")
              .removeClass("wait-icon-img")
              .addClass("counsel-icon-img");
          } else if (dataActive == "대기 중") {
            $("#channelBox" + i)
              .removeClass("channel-counsel")
              .addClass("channel-wait");
            $("channel-counsel .channel-img")
              .removeClass("counsel-icon-img")
              .addClass("wait-icon-img");
          }
        }
      },
      error: function () {
      },
    });
    //}, 3000); 
    grpcInterval = setTimeout(grpcList, 3000);
  }
  grpcList();
});
function grpcListstop() {
  clearTimeout(grpcInterval);
};

//REST 탭 클릭 후 리스트 출력
var restInterval;
$("#restTab").on("click", function () {
  allListstop();
  grpcListstop();
  clickAllListstop();

  //tab표시
  $("#restTab").addClass("tab-on").siblings("li").removeClass("tab-on");
  //restInterval = setInterval(function(){
  function restList() {
    $.ajax({
      url: "http://192.168.20.123:55532/monitor/channels",
      method: "GET",
      dataType: "JSON",

      success: function (json) {
        $(".channel-area").empty(); //append로 출력된 내용을 지워주는 역할

        //모니터링 목록(우선, 대기중) 출력
        for (var i = 0; i < json.length; i++) {
          if (json.length >= 0) {
            if (json[i].server == "REST")
              $(".channel-area").append(
                '<div id="channelBox' + i + '" class="channel-box channel-wait"><div class="channel-inner"><div class="channel-sever-txt" id="channelSeverName' + i + '"></div><div class="channel-img wait-icon-img"></div><div class="channel-tit" id="channelNum' + i + '"></div></div></div>'
              );
          }
        }

        //모니터링 리스트에서 채널번호 및 서버이름 출력
        for (var i = 0; i < json.length; i++) {
          //채널번호 출력
          $("#channelNum" + i).text(json[i].name);
          //서버이름 출력
          $("#channelSeverName" + i).text(json[i].server);
        }

        //대기중에서 상담중으로 전환
        for (var i = 0; i < json.length; i++) {
          const dataActive = json[i].active;

          if (dataActive == "상담 중") {
            $("#channelBox" + i)
              .removeClass("channel-wait")
              .addClass("channel-counsel");
            $(".channel-counsel .channel-img")
              .removeClass("wait-icon-img")
              .addClass("counsel-icon-img");
          } else if (dataActive == "대기 중") {
            $("#channelBox" + i)
              .removeClass("channel-counsel")
              .addClass("channel-wait");
            $("channel-counsel .channel-img")
              .removeClass("counsel-icon-img")
              .addClass("wait-icon-img");
          }
        }
      },
      error: function () {
      },
    });
    //}, 3000); 
    restInterval = setTimeout(restList, 3000);
  }
  restList();
});
function restListstop() {
  clearTimeout(restInterval);
};

