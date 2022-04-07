let lastSeleted;

//server 데이터 출력    
$('#systemTab').append(
    '<li id="allTab" class="tab tab-on bdb">전체</li>'
);

function sttSetinterval(fn, delay) {
    fn();
    setInterval(fn, delay);
}

//ajax 호출
//sttSetinterval(function () {
$.ajax({
    url: "http://192.168.20.203:55532/monitor/server-config",
    method: "GET",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
    success: function (json) {
        if ($(lastSeleted).hasClass('tab-on') === true) {
            $(lastSeleted).addClass('tab-on');
        } else {
            //console.log('sttConfig 출력');
            //server 데이터 출력    
            $('#systemTabs').empty();

            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0 && json[i].status == 1) {
                    $('#systemTabs').append(
                        '<li id="stt' + i + '" class="performanceTab tab bdb">' + json[i].hostname + '</li>'
                    );
                }
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
            //location.href = "../../login.html";
        }
    }
});
//}, 5000);

$(document).on('click', '.tab', function () {
    let selecGetId = $(this).attr('id');
    let selecGetIdTxt = '#' + selecGetId;

    lastSeleted = selecGetIdTxt;

    $(this).addClass('tab-on').siblings().removeClass('tab-on');
    $(this).addClass('tab-on').parent().siblings().children().removeClass('tab-on');
});