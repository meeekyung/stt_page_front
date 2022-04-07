let lasthwSelect;
// $('#hwTab').append(
//     '<li id="hw0" class="tab tab-on bdb">bona-lbmon1a</li>'
// );

function hwSetinterval(fn, delay) {
    fn();
    setInterval(fn, delay);
}

//ajax 호출
//hwSetinterval(function () {
$.ajax({
    url: "http://192.168.20.203:55532/monitor/server-config",
    method: "GET",
    dataType: "JSON",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    success: function (json) {
        let localToken = sessionStorage.getItem('Bearer');
        if ($(lasthwSelect).hasClass('tab-on') === true) {
            $(lasthwSelect).addClass('tab-on');
        } else {
            //console.log('hwConfig 출력');
            $('#hwTabs').empty();

            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0 && json[i].status == 1) {
                    $('#hwTabs').append(
                        '<li id="hw' + i + '" class="tab bdb">' + json[i].hostname + '</li>'
                    );
                }
            }

            $('#hw0').addClass('tab-on');
        }

        $('#severStausArea').empty();

        for (let i = 0; i < json.length; i++) {
            if (json.length >= 0) {
                //console.log('sttStatus 출력');
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
    error: function (request, status, error) {
        console.log(request.status);
        if (request.status == '403') {
            //console.log('로그아웃 성공');
            sessionStorage.removeItem('Bearer'); //삭제
            //sessionStorage.clear(); // 전체삭제
            console.log(request.responseText);
            //location.href = "../../login.html"
        }
    }
});
//}, 5000);


$(document).on('click', '.tab', function () {
    let hwselecGetId = $(this).attr('id');
    let hwselecGetIdTxt = '#' + hwselecGetId;

    lasthwSelect = hwselecGetIdTxt;

    $(this).addClass('tab-on').siblings().removeClass('tab-on');
    $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
});