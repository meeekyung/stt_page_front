$(function () {
    let cnames = ['id', '레벨', '호스트명', '타입', 'item', 'param1', 'param2', 'comparision', 'value', 'sms_noti', 'message'];
    let outerwidth = $("#alarmGrid").width();

    $("#alarmGrid").jqGrid({
        url: "http://192.168.20.194:55532/monitor/alarm",
        datatype: "json",
        mtype: "get",
        //headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }, 
        loadBeforeSend: function (jqXHR) {
            const jwtToken = localStorage.getItem("bearer");
            jqXHR.setRequestHeader("Authorization", 'Bearer ' + jwtToken );
        },
        colNames: cnames,
        colModel: [
            { name: 'id', index: 'id', width: 15, align: 'center' },
            { name: 'level', index: 'level', width: 30, align: 'center' },
            { name: 'hostname', index: 'hostname', width: 60, align: 'center' },
            { name: 'type', index: 'type', width: 30, align: 'center' },
            { name: 'item', index: 'item', width: 30, align: 'center' },
            { name: 'param1', index: 'param1', width: 30, align: 'center' },
            { name: 'param2', index: 'param2', width: 50, align: 'center' },
            { name: 'comparision', index: 'comparision', width: 10, align: 'center' },
            { name: 'value', index: 'value', width: 50, align: 'center' },
            { name: 'sms_noti', index: 'sms_noti', width: 10, align: 'center' },
            { name: 'message', index: 'message', width: 100, align: 'center' }
        ],
        width: outerwidth,
        autowidth: true,
        height: 580,
        shrinkToFit: true,
        rowNum: 20,
        multiselect: true,
        pager: '#alarmGridpager',
        rownumbers: true,
        loadonce: true,
        onSelectRow: function (rowid, status) {
            //로우 선택시 처리하는 부분
            let isHighlight = document.getElementsByClassName('ui-state-highlight');
            if (isHighlight.length > 0) {
                $('.ui-state-highlight').addClass('selbg');
            } else if (isHighlight.length < 0) {
                $('.ui-state-hover').removeClass('selbg');
            }
        }
    });

    //화면 리사이즈
    $(window).on('resize.jqGrid', function () {
        $("#alarmGrid").jqGrid('setGridWidth', $('.set-box').width() - 150);
    });

    //조회
    $('.userT-look').on('click', function () {
        $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
        console.log('서버정보 목록이 조회되었습니다.');
    });

    //변경
    $('.userT-change').on('click', function () {

        // 선택된 row rowId를 구한다.
        let selRowIds = jQuery('#alarmGrid').jqGrid('getGridParam', 'selarrrow');
        console.log(selRowIds);

        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("변경할 행을 선택하세요.");
            return;
        }

        //배열을 텍스트로 추출
        let setAlarmArr = new Array();
        for (let i = 0; i < selRowIds.length; i++) {
            let selid = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_id"]').text();
            let selLevel = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_level"]').text();
            let selHostname = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_hostname"]').text();
            let selType = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_type"]').text();
            let selItem = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_item"]').text();
            let selParam1 = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_param1"]').text();
            let selParam2 = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_param2"]').text();
            let selBigyo = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_comparision"]').text();
            let selValue = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_value"]').text();
            let selSms = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_sms_noti"]').text();
            let selMsg = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_message"]').text();
            console.log(selid, selLevel, selHostname, selType, selItem, selParam1, selParam2, selBigyo, selValue, selSms, selMsg);
            console.log(setAlarmArr.push(selid, selLevel, selHostname, selType, selItem, selParam1, selParam2, selBigyo, selValue, selSms, selMsg));
            console.log(setAlarmArr);
        }

        //운영자관리 변경팝업 생성
        if (selRowIds.length >= 1) {
            $("input[name='alarmid']").attr("placeholder", $("input[name='alarmid']").val()).val(setAlarmArr[0]).focus().blur();
            $("input[name='alarmlevel']").attr("placeholder", $("input[name='alarmlevel']").val()).val(setAlarmArr[1]).focus().blur();
            $("input[name='alarmHostname']").attr("placeholder", $("input[name='alarmHostname']").val()).val(setAlarmArr[2]).focus().blur();
            $("input[name='alarmtype']").attr("placeholder", $("input[name='alarmtype']").val()).val(setAlarmArr[3]).focus().blur();
            $("input[name='alarmitem']").attr("placeholder", $("input[name='alarmitem']").val()).val(setAlarmArr[4]).focus().blur();
            $("input[name='alarmparam1']").attr("placeholder", $("input[name='alarmparam1']").val()).val(setAlarmArr[5]).focus().blur();
            $("input[name='alarmparam2']").attr("placeholder", $("input[name='alarmparam2']").val()).val(setAlarmArr[6]).focus().blur();
            let param2 = $("input[name='alarmparam2']");
            $("input[name='alarmbigyo']").attr("placeholder", $("input[name='alarmbigyo']").val()).val(setAlarmArr[7]).focus().blur();
            $("input[name='alarmvalue']").attr("placeholder", $("input[name='alarmvalue']").val()).val(setAlarmArr[8]).focus().blur();
            $("input[name='alarmsmsnoti']").attr("placeholder", $("input[name='alarmsmsnoti']").val()).val(setAlarmArr[9]).focus().blur();
            $("input[name='alarmmsg']").attr("placeholder", $("input[name='alarmmsg']").val()).val(setAlarmArr[10]).focus().blur();

            let alarmNull = setAlarmArr[6].trim();
            console.log(alarmNull);
            if(alarmNull == ''){
                param2.attr("disabled",true);
            }else{
                param2.attr("disabled",false);
            }
            $('#userChPopup').show();
        }

        //변경 버튼 클릭 시 이벤트
        $('.add-area .add-btn-area .change-btn').on('click', function () {
            let alarmId = document.getElementById("alarmId").value;
            let alarmLevel = document.getElementById("alarmLevel").value;
            let alarmHostname = document.getElementById("alarmHostname").value;
            let alarmType = document.getElementById("alarmType").value;
            let alarmItem = document.getElementById("alarmItem").value;
            let alarmParam1 = document.getElementById("alarmParam1").value;
            let alarmParam2 = document.getElementById("alarmParam2").value;
            let alarmBigyo = document.getElementById("alarmBigyo").value;
            console.log(typeof alarmParam2);
            let alarmValue = document.getElementById("alarmValue").value;
            let alarmSmsnoti = document.getElementById("alarmSmsnoti").value;
            let alarmMsg = document.getElementById("alarmMsg").value;

            $.ajax({
                url: "http://192.168.20.194:55532/monitor/alarm/" + setAlarmArr[0],
                contentType: "application/json; charset=UTF-8",
                method: "PUT",
                headers: { Authorization: "bearer " + localStorage.getItem("bearer") },
                dataType: "JSON",
                data: JSON.stringify({id: alarmId, level: alarmLevel, hostname: alarmHostname, type: alarmType, item: alarmItem, param1: alarmParam1, param2: alarmParam2, comparision: alarmBigyo, value: alarmValue, sms_noti: alarmSmsnoti, message: alarmMsg }),
                success: function (json) {
                    let localToken = localStorage.getItem('bearer');
                    console.log(localToken);
                    //localStorage.setItem("bearer", json.token);
                    console.log('알람발생조건 변경 성공');                    
                    alert('알람발생조건이 변경되었습니다');
                    $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request,status,error) {
                    console.log('알람발생조건 변경 실패');
                    //console.log('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
                }
            });
        });
    });

});