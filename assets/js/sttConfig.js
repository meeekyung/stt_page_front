//server 데이터 출력    
$('#systemTab').append(
    '<li id="allTab" class="tab tab-on bdb">전체</li>'
);

//ajax 호출
function sttConfig() {
    $.ajax({
        url: "http://192.168.20.123:55532/monitor/stt-config",
        method: "GET",
        dataType: "JSON",

        success: function (json) {
            console.log("server-config 접속 성공");

            //전체 데이터 조회
            //console.log(json);

            //server 데이터 출력    
            $('#systemTabs').empty();

            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0) {
                    $('#systemTabs').append(
                        '<li id="stt' + i + '" class="tab bdb">' + json[i].hostname + '</li>'
                    );
                }
            };
        },
        error: function () {
            console.log("server-config 접속 실패");
        }
    });
}

sttConfig();

//setInterval 설정
let sttSetinterval = setInterval(sttConfig, 5000);

//마우스 클릭시 , interval 중단/재시작
let sttToggle = true;

$(document).on('click', '.tab', function () {
    if (sttToggle) {
        //반복중단
        clearInterval(sttSetinterval);
        sttToggle = false;

        $(this).addClass('tab-on').siblings().removeClass('tab-on');
        $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
    } else {
        //반복 재시작
        //sttSetinterval = setInterval(sttConfig, 5000);
        sttToggle = true;

        $(this).addClass('tab-on').siblings().removeClass('tab-on');        
        $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
    }
});