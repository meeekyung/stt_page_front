$(function () {
    let cnames = ['시간', '요청건수', '성공건수', '실패건수', '음성길이', '음성처리시간', '평균처리속도'];
    let outerwidth = $("#serviceGrid").width();

    $('.search-btn').on('click', function () {

        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let tenantName = document.getElementById("tenantName").value;
        let serverName = document.getElementById("serverName").value;
        let timeType = document.getElementById("timeType").value;

        $("#serviceGrid").jqGrid({
            url: `http://192.168.20.194:55532/monitor/static/service?time=${timeType}&tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
            datatype: "json",
            mtype: "get",
            //data: JSON.stringify({ id: user_name, password: user_pw }),
            colNames: cnames,
            colModel: [
                { name: 'time', index: 'time', width: 50, align: 'center' },
                { name: 'request__sum', index: 'request__sum', width: 100, align: 'center' },
                { name: 'success__sum', index: 'success__sum', width: 100, align: 'center' },
                { name: 'fail__sum', index: 'fail__sum', width: 100, align: 'center' },
                { name: 'tot_audio_len__sum', index: 'tot_audio_len__sum', width: 100, align: 'center' },
                { name: 'tot_proc_time__sum', index: 'tot_proc_time__sum', width: 100, align: 'center' },
                { name: 'avg_rtf__sum', index: 'avg_rtf__sum', width: 100, align: 'center' }
            ],
            width: outerwidth,
            autowidth: true,
            height: 280,
            shrinkToFit: true,
            rowNum: 10,
            pager: '#serviceGridpager',
            rownumbers: true,
            loadonce: true,
            onSelectRow: function (rowid, status) {
                //로우 선택시 처리하는 부분
                let isHighlight = document.getElementsByClassName('ui-state-highlight');
                if (isHighlight.length > 0) {
                    $('.ui-state-highlight').addClass('selbg');
                } else {
                    $('.ui-state-hover, .ui-state-highlight').removeClass('selbg');
                }

                let isHover = $('tr[aria-selected="true"]');
                console.log(isHover === true);
                if (isHover === true) {
                    $('.ui-state-highlight').removeClass('selbg');
                }
            }
        });
    });

    //화면 리사이즈
    $(window).on('resize.jqGrid', function () {
        $("#serviceGrid").jqGrid('setGridWidth', $('.searchBox').width() - 150);
    });
});

//jquery-ui calendar
$(function () {
    //시작일
    $("#startDate").datepicker().datepicker("setDate", new Date());
    $("#startDate").datepicker("option", "dateFormat", "yy-mm-dd");
    $("#startDate").datepicker({ minDate: 0 });

    //종료일
    $("#endDate").datepicker().datepicker("setDate", new Date());
    $("#endDate").datepicker("option", "dateFormat", "yy-mm-dd");
});

//excel 저장
$('.execl-btn').on('click', function () {

    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let tenantName = document.getElementById("tenantName").value;
    let serverName = document.getElementById("serverName").value;
    let timeType = document.getElementById("timeType").value;

    $.ajax({
        url: `http://192.168.20.194:55532/monitor/static/service?time=${timeType}&tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
        contentType: "application/json; charset=UTF-8",
        type: "GET",
        datatype: "JSON",
        success: function (json) {
            console.log('excel export 성공');

            let valArr = [];
            for (let i = 0; i < json.length; i++) {
                let val = [json[i].time, json[i].request__sum, json[i].success__sum, json[i].fail__sum, json[i].tot_audio_len__sum, json[i].tot_proc_time__sum, json[i].avg_rtf__sum,];
                valArr.push(val);
            }

            //ArrayBuffer 만들어주는 함수
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                var view = new Uint8Array(buf);  //create uint8array as viewer
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                return buf;
            }

            // workbook 생성
            let wb = XLSX.utils.book_new();

            // sheet명 생성
            wb.SheetNames.push("sheet 1");
            // wb.SheetNames.push("sheet 2"); // 시트가 여러개인 경우

            // 이중 배열 형태로 데이터가 들어간다.
            let wsData = [['시간', '요청건수', '성공건수', '실패건수', '음성길이', '음성처리시간', '평균처리속도']];
            // var wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우
            wsAllData = wsData.concat(valArr);

            // 배열 데이터로 시트 데이터 생성
            let ws = XLSX.utils.aoa_to_sheet(wsAllData);
            // var ws2 = XLSX.utils.aoa_to_sheet(wsData2); 	//시트가 여러개인 경우

            // 시트 데이터를 시트에 넣기 ( 시트 명이 없는 시트인경우 첫번째 시트에 데이터가 들어감 )
            wb.Sheets["sheet 1"] = ws;
            // wb.Sheets["sheet 2"] = ws2;	//시트가 여러개인 경우

            // 엑셀 파일 쓰기
            let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

            // 파일 다운로드
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), '서비스통계_excel.xlsx');

        },
        error: function (data) {
            console.log('excel export 실패');
        },
    });
    // let wb = XLSX.utils.table_to_book(document.getElementById('gview_serviceGrid'), {sheet:"서비스 통계",raw:true});
    // console.log(wb);
    // XLSX.writeFile(wb, ('서비스통계.xlsx'));

    function excelExport(json) {

    }
});