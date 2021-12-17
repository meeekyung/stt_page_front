$.ajax({
    url: "http://192.168.20.123:55532/monitor/hardware-config",
    method: "GET",
    dataType: "JSON",

    success: function(json){
        console.log("serverHW-config 접속 성공");

        //전체 데이터 조회
        console.log(json);

        for(let i=0; i < json.length; i++){
            if(json.length >= 0){
                $('#hwTab').append(
                    '<li id="hw' + i +'" class="tab bdb">'+json[i].hostname+'</li>'
                );
            }
        }
    },
    error: function(){
        console.log("seserverHWrver-config 접속 실패");
    }
});