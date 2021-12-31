$('#systemTab').append(
    '<li id="allTab" class="tab tab-on bdb">전체</li>'
);

function sttSetinterval(fn, delay) {
    fn();
    setInterval(fn, delay);
}

//sttSetinterval(function () {
    $.ajax({
        url: "http://192.168.20.123:55532/monitor/stt-config",
        method: "GET",
        dataType: "JSON",

        success: function (json) {
            console.log("server-config 접속 성공");

            //전체 데이터 조회
            //console.log(json);

            //sever 데이터 출력
            $("#systemTabs").empty();
            //$("#systemTab").empty();

            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0) {
                    $('#systemTabs').append(
                        '<li id="stt' + i + '" class="tab bdb">' + json[i].hostname + '</li>'
                    );
                }
            }
        },
        error: function () {
            console.log("server-config 접속 실패");
        }
    });
//}, 5000);