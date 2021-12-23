$.ajax({
    url: "http://192.168.20.123:55532/monitor/server-config",
    method: "GET",
    dataType: "JSON",

    success: function(json){
        console.log("serverHW-config 접속 성공");

        //전체 데이터 조회
        console.log(json);

        for(let i=0; i < json.length; i++){
            if(json.length >= 0){
                $('#severStausArea').append(
                    '<div class="status-box" id="statusBox'+ i +'"><div class="status-box-inner"><h3 id="statusTit'+ i +'">'+json[i].hostname+'</h3><p>'+json[i].ipaddr+'/<span class="etcText">'+json[i].role+'</span></p></div></div>'
                );
                $('#hwTab').append(
                    '<li id="hw' + i +'" class="tab bdb">'+json[i].hostname+'</li>'
                );
            }

            //서버 상태에 따른 배경색상값 변환
            const statusValue = json[i].status;
            if(statusValue == 1){
                $(".status-box").addClass("onlineBg").siblings().removeClass('offlineBg');
            }else if(statusValue == 0){
                $(".status-box-inner").addClass("offlineBg").siblings().removeClass('onlineBg');
            }
        }
    },
    error: function(){
        console.log("seserverHWrver-config 접속 실패");
    }
});