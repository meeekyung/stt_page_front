//input[type="file"] style  
$(document).ready(function () {
  var fileTarget = $(".upload-hidden");

  fileTarget.on("change", function () {
    if (window.FileReader) {
      var filename = $(this)[0].files[0].name;
    } else {
      var filename = $(this).val().split("/").pop().split("\\").pop();
    }

    $(".file-name").val(filename);
  });
});

//wav파일 확장자 검사
function checkFile(f) {
  // files 로 해당 파일 정보 얻기.
  var file = f.files;
  console.log(file);

  var form = $("#myForm")[0];
  var formData = new FormData(form);
  formData.append("file", $("input[name=uploadFile]")[0].files[0]);

  $.ajax({
    type: "POST",
    url: "http://192.168.20.124:55532/audio",
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (json) {
      console.log("형식이 아닌 파일 업로드..");      
    },
    error: function (json) {
      console.log("형식이 아닌 파일 업로드 실패");
      alert('8kHz, 16bit PCM으로 인코딩된, 90초 이하의 WAV 파일만 지원합니다.\n\n현재 파일 : ' + file[0].name);
      form.reset();
    }
  });

  // file[0].name 은 파일명 입니다.
  // 정규식으로 확장자 체크
  if (!/\.(wav)$/i.test(file[0].name)) {
    alert('8kHz, 16bit PCM으로 인코딩된, 90초 이하의 WAV 파일만 지원합니다.\n\n현재 파일 : ' + file[0].name);
  } 
  // 체크를 통과했다면 종료.
  else return;
  fileReset();
}

//input[type="file"] 입력필드 리셋
function fileReset(f) {
  $('#fileIn').val('');
}

//wav파일 재생
$(function () {

  $("#uploadBtn").click(function () {

    var form = $("#myForm")[0];
    var formData = new FormData(form);
    formData.append("file", $("input[name=uploadFile]")[0].files[0]);

    $.ajax({
      type: "POST",
      url: "http://192.168.20.124:55532/audio",
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      beforeSend: function () {
        $('.black_bg, .loading-box').show();
      },
      complete: function () {
        $('.black_bg, .loading-box').hide();
      },
      success: function (json) {
        console.log("업로드 성공!!");

        $('#uploadBtn').text('변환완료');
        $('.progressContaine').hide();
        handleFiles(json);
        document.getElementById("uploadBtn").addEventListener("change", handleFiles, false);

        //음성인식 변환 결과 출력
        sttTextPrint(json);
      },
      error: function (data) {
        console.log("업로드 실패");
      }
    });

    $(".sttTimeTxt, .sttTimeCont").remove();
    $('.green-audio-player .controls .controls__slider .controls__progress').css({ 'width': '0%' });
  });
});

//파일찾기 버튼 클릭 시 '변환완료' -> '변환하기' 변경
$(function () {
  $('#browse').on("click", function () {
    $('#uploadBtn').text('변환하기');
  });
});

//audio 업로드 이벤트
function handleFiles(json) {
  var files = json.url;
  console.log(files);
  $("#src").attr("src", files);
  document.getElementById("audio").load();
}

//음성인식 텍스트 출력
function sttTextPrint(json) {

  var i = 0;

  textInput = setInterval(function () {
    if (i == json.text.length) {
      clearInterval(textInput);
    } else {
      $(".stt-cont").append('<ol class="stt-content"><li class="sttTimeTxt">' + json.text[i].startSecond + '</li><li class="sttTimeCont">' + json.text[i].text + '</li></ol>');
      i++;
    }
    $(".stt-cont").scrollTop($(".stt-cont")[0].scrollHeight);
  }, 500);
}

//로그인 버튼 클릭 시 화면전환
$("#introBtn").on("click", function () {
  var user_name = document.getElementById("userName").value;
  var user_pw = document.getElementById("userPw").value;

  $.ajax({
    url: "http://192.168.20.124:55532/users/login",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    type: "POST",
    data: JSON.stringify({ username: user_name, password: user_pw }),
    success: function (data) {
      console.log("로그인 성공");

      $("#loginArea").hide();
      $("#sttArea").show();
    },
    error: function (data) {
      console.log("로그인 실패");
      alert("아이디 또는 비밀번호 오류입니다.")
    },
  });
});

//#okBtn 엔터키에도 적용
$("#userPw").keypress(function (e) {
  if (e.which == 13) {
    $("#introBtn").click();
  }
});