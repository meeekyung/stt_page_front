let booleanValue = false;

// 서비스 상태정보 데이터 출력
$.ajax({
  url: "http://192.168.20.203:55532/containers",
  method: "GET",
  dataType: "JSON",
  headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
  success: function (json) {
    $("#serverB-area").empty();

    function serverData(json) {
      for (let i = 0; i < json.length; i++) {
        if (json.length >= 0) {
          $("#serverB-area").append(`<ul class="serverB-table">
        <li class="serverB-check"><input type="checkbox" name="server-check" id="server-check${i}" value=${i}></li>
        <li class="serverB-name" title="${json[i].container_name}">${json[i].container_name}</li>
        <li class="serverB-status">
            <div class="statusBox state-${json[i].container_status}">${json[i].container_status}</div>
        </li>
        <li class="serverB-images" title="${json[i].container_image_name}">${json[i].container_image_name}</li>
        <li class="serverB-date" title="${json[i].container_start_time}">${json[i].container_start_time}</li>        
        <li class="serverB-porte" title="${json[i].container_port}">${json[i].container_port}</li>
    </ul>`);
        }
      }
    }

    // pagination.js
    $("#pagination").pagination({
      dataSource: json,
      callback: function (data, pagination) {
        $("#serverB-area").empty();
        let dataHtml = serverData(data);
        $("#serverB-area").html(dataHtml);
      },
    });
  },
  error: function () { },
});

// 체크박스 전체 선택 및 해제
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("server-check");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

function statusRestart() {
  $.ajax({
    url: "http://192.168.20.203:55532/containers",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "GET",
    dataType: "JSON",
    success: function (json) {
      //console.log("서버정보 다시 조회 성공");
      window.location.reload();
    },
    error: function (request, status, error) {
      //console.log("서버정보 다시 조회 실패");
    },
  });
}

const checkedArr = [];

//start 버튼 클릭 이벤트
$(".start-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    const startId = $(this).attr("id");
    const startName = $("#" + startId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(startName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/start",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      //console.log("서버정보 Start 성공");
    },
    error: function (request, status, error) {
      //console.log("서버정보 Start 실패");
    },
  });
  statusRestart();
});

//stop 버튼 클릭 이벤트
$(".stop-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    let stopId = $(this).attr("id");
    let stopName = $("#" + stopId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(stopName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/stop",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      //console.log("서버정보 Stop 성공");
    },
    error: function (request, status, error) {
      //console.log("서버정보 Stop 실패");
    },
  });
  statusRestart();
});

//kill 버튼 클릭 이벤트
$(".kil-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    let kilId = $(this).attr("id");
    let kilName = $("#" + kilId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(kilName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/kill",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      //console.log("서버정보 kill 성공");
    },
    error: function (request, status, error) {
      //console.log("서버정보 kill 실패");
    },
  });
  statusRestart();
});

//restart 버튼 클릭 이벤트
$(".restart-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    let restartId = $(this).attr("id");
    let restartName = $("#" + restartId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(restartName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/restart",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      //console.log("서버정보 restart 성공");
    },
    error: function (request, status, error) {
      //console.log("서버정보 restart 실패");
    },
  });
  statusRestart();
});

//pause 버튼 클릭 이벤트
$(".pause-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    let pauseId = $(this).attr("id");
    let pauseName = $("#" + pauseId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(pauseName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/pause",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      console.log("서버정보 pause 성공");
    },
    error: function (request, status, error) {
      console.log("서버정보 pause 실패");
    },
  });
  statusRestart();
});

//remove 버튼 클릭 이벤트
$(".remove-btn").on("click", function () {
  $(`input:checkbox[name='server-check']:checked`).each(function () {
    let removeId = $(this).attr("id");
    let removeName = $("#" + removeId)
      .parent()
      .siblings(".serverB-name")
      .text();
    checkedArr.push(removeName);
  });

  $.ajax({
    url: "http://192.168.20.203:55532/containers/remove",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    method: "PUT",
    dataType: "JSON",
    data: JSON.stringify({
      names: checkedArr,
    }),
    success: function (json) {
      //console.log("서버정보 remove 성공");
    },
    error: function (request, status, error) {
      //console.log("서버정보 remove 실패");
    },
  });
  statusRestart();
});
