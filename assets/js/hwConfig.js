let lasthwSelect;

$('#hwTab').append(
    '<li id="hw0" class="tab tab-on bdb">bona-lbmon1a</li>'
);

function hwSetinterval(fn, delay) {
    fn();
    setInterval(fn, delay);
}

//ajax 호출
hwSetinterval(function () {
    $.ajax({
        url: "http://192.168.20.123:55532/monitor/server-config",
        method: "GET",
        dataType: "JSON",

        success: function (json) {
            console.log("serverHW-config 접속 성공");

            //전체 데이터 조회
            //console.log(json);

            if ($(lasthwSelect).hasClass('tab-on') === true) {
                $(lasthwSelect).addClass('tab-on');
            } else {
                $('#hwTabs').empty();
                
                for (let i = 1; i < json.length; i++) {
                    if (json.length >= 0) {
                        $('#hwTabs').append(
                            '<li id="hw' + i + '" class="tab bdb">' + json[i].hostname + '</li>'
                        );
                    }
                }
            }

            $('#severStausArea').empty();            

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
}, 5000);


$(document).on('click', '.tab', function () {
    let hwselecGetId = $(this).attr('id');
    let hwselecGetIdTxt = '#' + hwselecGetId;

    console.log(hwselecGetIdTxt);

    lasthwSelect = hwselecGetIdTxt;

    $(this).addClass('tab-on').siblings().removeClass('tab-on');
    $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
});