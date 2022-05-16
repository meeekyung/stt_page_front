let booleanValue = false;

$.getJSON("../../config/config.json", function (json) {
  // console.log(json);
  // console.log(json.urls);

  // 서비스 상태정보 데이터 출력
  $.ajax({
    url: "http://" + json.urls + "/containers",
    method: "GET",
    dataType: "JSON",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    success: function (json) {
      //$("#serverB-area").empty();
      //function serverData(json) {
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
      //}

      // pagination.js
      // $("#pagination").pagination({
      //   dataSource: json,
      //   callback: function (data, pagination) {
      //     $("#serverB-area").empty();
      //     let dataHtml = serverData(data);
      //     $("#serverB-area").html(dataHtml);
      //   },
      // });
    },
    error: function (request, status, error) {
      console.log(request.status);
      if (request.status == '403') {
        //console.log('로그아웃 성공');
        sessionStorage.removeItem('Bearer'); //삭제
        //sessionStorage.clear(); // 전체삭제
        console.log(request.responseText);
        location.href = "../../login.html"
      }
    },
  });

  //row 클릭 시 선택되도록..
  // $(document).on('click', '.serverB-table', function () {
  //   const checkedBool = $(this).children('.serverB-check').children().is(':checked');
  //   console.log(checkedBool);
  //   if (!checkedBool) {
  //     $(this).children('.serverB-check').children().prop('checked', true);
  //   } else {
  //     $(this).children('.serverB-check').children().prop('checked', false);
  //   }
  // });

  function statusRestart() {
    $.ajax({
      url: "http://" + json.urls + "/containers",
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
      url: "http://" + json.urls + "/containers/start",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        //console.log("서버정보 Start 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        //console.log("서버정보 Start 실패");
      },
    });
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
      url: "http://" + json.urls + "/containers/stop",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        //console.log("서버정보 Stop 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        //console.log("서버정보 Stop 실패");
      },
    });
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
      url: "http://" + json.urls + "/containers/kill",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        //console.log("서버정보 kill 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        //console.log("서버정보 kill 실패");
      },
    });
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
      url: "http://" + json.urls + "/containers/restart",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        //console.log("서버정보 restart 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        //console.log("서버정보 restart 실패");
      },
    });
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
      url: "http://" + json.urls + "/containers/pause",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        // console.log("서버정보 pause 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        // console.log("서버정보 pause 실패");
      },
    });
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
      url: "http://" + json.urls + "/containers/remove",
      contentType: "application/json; charset=UTF-8",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
      method: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        names: checkedArr,
      }),
      success: function (json) {
        //console.log("서버정보 remove 성공");
        statusRestart();
      },
      error: function (request, status, error) {
        //console.log("서버정보 remove 실패");
        const noneRemove = document.querySelector('.state-running').textContent;
        //console.log(noneRemove);
        if (noneRemove == 'running') {
          $('.alert-cont').empty();
          $('.alert-cont').append(`<p class="alert-cont-txt">컨테이너 정지 후 삭제해주세요.</p>`);
          $('#alert').show();
        }
      },
    });
  });
});

// 체크박스 전체 선택 및 해제
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("server-check");
  console.log(selectAll);

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}