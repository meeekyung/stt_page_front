const socket3 = new WebSocket("ws://192.168.20.194:55532/ws/alarm");

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
    $('.close-icon, .notice-error-btn').on('click', function(){
        $('.notice-error-popup').hide();
    });
    
    const alarmData = JSON.parse(json.data);
    console.log(alarmData);

    //서버이름
    let alarmHostname = alarmData.hostname;
    console.log('알람호스트네임' + alarmHostname);

    //level명
    let alarmLevel = alarmData.level;
    console.log('알람레벨' + alarmLevel);

    //메시지
    let alarmMssg = alarmData.message;
    console.log('알람텍스트' + alarmMssg);

    //시간
    let alarmTime = alarmData.logtime;
    console.log('알람시간' + alarmTime);

    //호스트네임 출력
    document.querySelector(".notice-error-tit .notice-error-hostname").innerHTML = alarmHostname;

    //level명 출력
    document.querySelector(".notice-error-tit .notice-error-level").innerHTML = alarmLevel;

    //메시지 출력
    document.querySelector(".notice-error-txt").innerHTML = alarmMssg;

    //시간 출력
    document.querySelector(".notice-error-time").innerHTML = alarmTime;

    //level에 따른 색상값 변경   

    if(alarmLevel === "CRITICAL"){
        console.log("CRITICAL 에러 발생");
        $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({"background-position-x" : "-43px"});
        $('.notice-error-popup .notice-error').css({"border" : "2px solid #bd362f"});
 
        let serverTit = $('#severStausArea .status-box .status-box-inner>h3').attr('id');
        let severTitTxt = $("#" + serverTit).text();
        let severTitHtml = $("#" + serverTit);
        console.log(serverTit, severTitTxt);
        
        if(alarmHostname == severTitTxt){
            console.log(severTitHtml.parent('.status-box-inner'));
            severTitHtml.parents('.status-box-inner').css({
                "background" : "#bd362f",
                "color" : "#fff"
            });
        }
    }else if(alarmLevel === "MAJOR"){
        console.log("MAJOR 에러 발생");
        $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({"background-position-x" : "0px"});
        $('.notice-error-popup .notice-error').css({"border" : "2px solid #e95420"});

        let serverTit = $('#severStausArea .status-box .status-box-inner>h3').attr('id');
        let severTitTxt = $("#" + serverTit).text();
        let severTitHtml = $("#" + serverTit);
        console.log(serverTit, severTitTxt);
        
        if(alarmHostname == severTitTxt){
            console.log(severTitHtml.parent('.status-box-inner'));
            severTitHtml.parents('.status-box-inner').css({
                "background" : "#e95420",
                "color" : "#fff"
            });
        }

    }else if(alarmLevel === "MINOR"){
        console.log("MINOR 에러 발생");
        $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({"background-position-x" : "-89px"});
        $('.notice-error-popup .notice-error').css({"border" : "2px solid #2196f3"});

        let serverTit = $('#severStausArea .status-box .status-box-inner>h3').attr('id');
        let severTitTxt = $("#" + serverTit).text();
        let severTitHtml = $("#" + serverTit);
        console.log(serverTit, severTitTxt);
        
        if(alarmHostname == severTitTxt){
            console.log(severTitHtml.parent('.status-box-inner'));
            severTitHtml.parents('.status-box-inner').css({
                "background" : "#2196f3",
                "color" : "#fff"
            });
        }

    }else if(alarmLevel === "INFO"){
        console.log("INFO 에러 발생");
        $('.notice-error-popup .notice-error .notice-error-tit .notice-error-icon').css({"background-position-x" : "-133px"});
        $('.notice-error-popup .notice-error').css({"border" : "2px solid #22b24c"});

        let serverTit = $('#severStausArea .status-box .status-box-inner>h3').attr('id');
        let severTitTxt = $("#" + serverTit).text();
        let severTitHtml = $("#" + serverTit);
        console.log(serverTit, severTitTxt);
        
        if(alarmHostname == severTitTxt){
            console.log(severTitHtml.parent('.status-box-inner'));
            severTitHtml.parents('.status-box-inner').css({
                "background" : "#2196f3",
                "color" : "#fff"
            });
        }
    }
};