$('#hwTab').append(
    '<li id="hw0" class="tab tab-on bdb">bona-lbmon1a</li>'
);

//ajax 호출
//function hwConfig() {
$.ajax({
    url: "http://192.168.20.123:55532/monitor/server-config",
    method: "GET",
    dataType: "JSON",

    success: function (json) {
        console.log("serverHW-config 접속 성공");

        //전체 데이터 조회
        //console.log(json);

        $('#severStausArea').empty();
        $('#hwTabs').empty();

        for (let i = 1; i < json.length; i++) {
            if (json.length >= 0) {
                $('#hwTabs').append(
                    '<li id="hw' + i + '" class="tab bdb">' + json[i].hostname + '</li>'
                );
            }
        }

        for (let i = 0; i < json.length; i++) {
            if (json.length >= 0) {
                $('#severStausArea').append(
                    '<div class="status-box" id="statusBox' + i + '"><div class="status-box-inner"><h3 name="status-name" class="staus-tit" id="statusTit' + i + '">' + json[i].hostname + '</h3><p>' + json[i].ipaddr + '/<span class="etcText">' + json[i].role + '</span></p></div></div>'
                );
            }

            //서버 상태에 따른 배경색상값 변환
            const statusValue = json[i].status;
            if (statusValue == 1) {
                $("#statusBox" + i).addClass("onlineBg");
            } else if (statusValue == 0) {
                $("#statusBox" + i).addClass("offlineBg");
            }
        }
    },
    error: function () {
        console.log("seserverHWrver-config 접속 실패");
    }
});
//}

//hwConfig();

//setInterval 설정
//let hwSetinterval = setInterval(hwConfig, 5000);

//마우스 클릭시, interval 중단/재시작
let hwToggle = true;

$(document).on('click', '.tab', function () {
    if (hwToggle) {
        //반복중단
        clearInterval(hwSetinterval);
        hwToggle = false;

        $(this).addClass('tab-on').siblings().removeClass('tab-on');
        $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
    } else {
        //반복 재시작
        //hwSetinterval = setInterval(hwConfig, 5000);
        hwToggle = true;

        $(this).addClass('tab-on').siblings().removeClass('tab-on');
        $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
    }
});
