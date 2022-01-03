function startSocket3() {
    const socket3 = new WebSocket("ws://192.168.20.123:55532/ws/alarm");

    //연결설정
    socket3.onopen = function (e) {
        console.log("[open] Connection established");
        console.log("Sending to server alarm");
        socket3.send("My name is John");
    };

    //데이터 수신 됨 - 전체 데이터를 출력해줌
    socket3.onmessage = function (json) {
        //팝업창 생성
        $('.notice-error-popup').slideDown();

        //창없애기
        $('.close-icon, .notice-error-btn').on('click', function () {
            $('.notice-error-popup').hide();
        });

        const alarmData = JSON.parse(json.data);

        //서버이름
        let alarmHostname = alarmData.hostname;

        //level명
        let alarmLevel = alarmData.level;

        //메시지
        let alarmMssg = alarmData.message;

        //시간
        let alarmTime = alarmData.logtime;

        //호스트네임 출력
        document.querySelector(".notice-error-tit .notice-error-hostname").innerHTML = alarmHostname;

        //level명 출력
        document.querySelector(".notice-error-tit .notice-error-level").innerHTML = alarmLevel;

        //메시지 출력
        document.querySelector(".notice-error-txt").innerHTML = alarmMssg;

        //시간 출력
        document.querySelector(".notice-error-time").innerHTML = alarmTime;

        //level에 따른 색상값 변경   
        if (alarmLevel === "CRITICAL") {            
            $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({ "background-position-x": "-43px" });
            $('.notice-error-popup .notice-error').css({ "border": "2px solid #bd362f" });

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                console.log(status.length);
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                console.log(statusTit);
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');
                console.log(statusTitHtml);

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#bd362f",
                        "color": "#fff"
                    });
                }
            }
        } else if (alarmLevel === "MAJOR") {
            $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({ "background-position-x": "0px" });
            $('.notice-error-popup .notice-error').css({ "border": "2px solid #e95420" });

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                console.log(status.length);
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                console.log(statusTit);
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');
                console.log(statusTitHtml);

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#e95420",
                        "color": "#fff"
                    });
                }
            }

        } else if (alarmLevel === "MINOR") {
            $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({ "background-position-x": "-89px" });
            $('.notice-error-popup .notice-error').css({ "border": "2px solid #f9a825" });

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                console.log(status.length);
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                console.log(statusTit);
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');
                console.log(statusTitHtml);

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#f9a825",
                        "color": "#fff"
                    });
                }
            }

        } else if (alarmLevel === "INFO") {
            $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({ "background-position-x": "-133px" });
            $('.notice-error-popup .notice-error').css({ "border": "2px solid #22b24c" });

            const status = document.getElementsByClassName('staus-tit');
            for (let i = 0; i < status.length; i++) {
                console.log(status.length);
                let statusTit = document.querySelector('#statusTit' + i).innerHTML;
                console.log(statusTit);
                let statusTitHtml = document.querySelector('#statusTit' + i).getAttribute('id');
                console.log(statusTitHtml);

                if (statusTit == alarmHostname) {
                    $('#' + statusTitHtml).parent().parent().css({
                        "background": "#22b24c",
                        "color": "#fff"
                    });
                }
            }
        }
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
