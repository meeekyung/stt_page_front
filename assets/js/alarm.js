function startSocket3() {
    const socket3 = new WebSocket("ws://" + url123 + "/ws/alarm");

    let num = 0;

    //연결설정
    socket3.onopen = function (e) {
        //console.log("[open] Connection established");
        //console.log("Sending to server alarm");
        socket3.send("Sending to server alarm");
    };

    //데이터 수신 됨 - 전체 데이터를 출력해줌
    socket3.onmessage = function (json) {
        //$('.notice-error-popup').slideDown();

        const alarmData = JSON.parse(json.data);

        //서버이름
        let alarmHostname = alarmData.hostname;

        //level명
        let alarmLevel = alarmData.level;

        //메시지
        let alarmMssg = alarmData.message;

        //시간
        let alarmTime = alarmData.logtime.slice(0, 19);

        //alarm 데이터 출력 함수
        function createPopup() {
            num++;

            if (num < 21) {
                if (alarmData.level === "INFO") {
                    $('.notice-error-popup-wrap').append('<div class="notice-error-popup" id="noticeError' + num + '"><div class="notice-error"><div class="close-icon"><i class="fas fa-times"></i></div><div class="notice-error-tit"><div class="notice-error-icon"></div><span class="notice-error-level">' + alarmLevel + '</span></div><p class="notice-error-txt">' + alarmMssg + '</p><div class="notice-error-bottom-txt"><span class="notice-error-hostname">' + alarmHostname + '</span><p class="notice-error-time">' + alarmTime + '</p></div><input type="button" value="확인" class="notice-error-btn"></div></div>');
                } else {
                    $('.notice-error-popup-wrap').append('<div class="notice-error-popup" id="noticeError' + num + '"><div class="notice-error"><div class="close-icon"><i class="fas fa-times"></i></div><div class="notice-error-tit"><div class="notice-error-icon"></div><span class="notice-error-level">' + alarmLevel + " Warning" + '</span></div><p class="notice-error-txt">' + alarmMssg + '</p><div class="notice-error-bottom-txt"><span class="notice-error-hostname">' + alarmHostname + '</span><p class="notice-error-time">' + alarmTime + '</p></div><input type="button" value="확인" class="notice-error-btn"></div></div>');
                }

                $('#noticeError' + num).css({
                    'display': 'block',
                    'z-index': num,
                    'bottom': num + 9 * num,
                    'right': num + 9 * num
                });
            }
        }

        //확인버튼 또는 엑스 클릭시 위치변경
        $('.notice-error-btn').on('click', function () {
            let current_btn = $(this).parents().parents();
            current_btn.css({
                'bottom': num - 9 * num,
                'right': num - 9 * num
            });
        });

        $('.close-icon>svg').on('click', function(){
            let current_close = $(this).parents().parents().parents();
            current_close.css({
                'bottom': num - 9 * num,
                'right': num - 9 * num
            });
        });

        //level에 따른 색상값 변경   
        if (alarmData.level === "CRITICAL") {
            //팝업창 생성
            createPopup(num);

            $('#noticeError' + num).children('.notice-error').children('.notice-error-tit').children('.notice-error-icon').css({ "background-position-x": "4px" });
            $('#noticeError' + num).children('.notice-error').css({ "border-image": "linear-gradient(to right, #ef7e78, #bd362f)" });
            $('#noticeError' + num).children('.notice-error').children('.notice-error-btn').css({ "background": "linear-gradient(to right, #ef7e78, #bd362f)" });

            //level명 출력
            //document.querySelector(".notice-error-tit .notice-error-level").innerHTML = alarmLevel + " Warning";

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#bd362f",
                        "color": "#fff"
                    });
                }
            }
        }
        if (alarmData.level === "MAJOR") {
            //팝업창 생성
            createPopup(num);

            $('#noticeError' + num).children('.notice-error').children('.notice-error-tit').children('.notice-error-icon').css({ "background-position-x": "-36px" });
            $('#noticeError' + num).children('.notice-error').css({ "border-image": "linear-gradient(to right, #f39d7f, #e95420)" });
            $('#noticeError' + num).children('.notice-error').children('.notice-error-btn').css({ "background": "linear-gradient(to right, #f39d7f, #e95420)" });

            //level명 출력
            //document.querySelector(".notice-error-tit .notice-error-level").innerHTML = alarmLevel + " Warning";

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#e95420",
                        "color": "#fff"
                    });
                }
            }

        }
        if (alarmData.level === "MINOR") {
            //팝업창 생성
            createPopup(num);

            $('#noticeError' + num).children('.notice-error').children('.notice-error-tit').children('.notice-error-icon').css({ "background-position-x": "-74px" });
            $('#noticeError' + num).children('.notice-error').css({ "border-image": "linear-gradient(to right, #ffc973, #f9a825)" });
            $('#noticeError' + num).children('.notice-error').children('.notice-error-btn').css({ "background": "linear-gradient(to right, #ffc973, #f9a825)" });

            //level명 출력
            //document.querySelector(".notice-error-tit .notice-error-level").innerHTML = alarmLevel + " Warning";

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#f9a825",
                        "color": "#fff"
                    });
                }
            }

        }
        if (alarmData.level === "INFO") {
            //팝업창 생성
            createPopup(num);

            $('#noticeError' + num).children('.notice-error').children('.notice-error-tit').children('.notice-error-icon').css({ "background-position-x": "-114px" });
            $('#noticeError' + num).children('.notice-error').css({ "border-image": "linear-gradient(to right, #50d276, #22b24c)" });
            $('#noticeError' + num).children('.notice-error').children('.notice-error-btn').css({ "background": "linear-gradient(to right, #50d276, #22b24c)" });

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#22b24c",
                        "color": "#fff"
                    });
                }
            }
        }
        if (alarmLevel === "CLEAR") {

            const status = document.getElementsByClassName('staus-tit');

            for (let i = 0; i < status.length; i++) {
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');

                $('#' + statusTitHtml).parent().parent().css({
                    "background": "#4c9fff",
                    "color": "#fff"
                });
            }
        }

        $('.notice-error-btn, .close-icon>svg').on('click', function () {
            $(this).parent().parent().slideUp();
            $(this).parent().parent().remove();
        });
    };

    //연결닫힘
    socket3.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');

            socket3 = null
            setTimeout(startSocket3, 5000);
        }
    };

    //웹 소켓 오류
    socket3.onerror = function (error) {
        console.log(`[error] ${error.message}`);
    };

}
startSocket3();
