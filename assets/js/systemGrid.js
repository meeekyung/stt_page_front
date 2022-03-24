$(function () {
    //서버 호출
    $.ajax({
        url: "http://192.168.20.203:55532/monitor/server-config",
        method: "GET",
        dataType: "JSON",
        headers: { Authorization: "Bearer " + localStorage.getItem("Bearer") },
        success: function (json) {
            console.log('서버타입 호출 성공');
            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0) {
                    $('#serverName').append(
                        '<option value="' + json[i].hostname + '">' + json[i].hostname + '</option>'
                    );
                }
            }
        },
        error: function () {
        }
    });

    let systemCnames = [];
    let networkCnames = [];
    let diskCnames = [];
    let channelCnames = [];
    const outerwidth = $("#systemGrid").width();

    $('.search-btn').on('click', function () {
        let systemType = document.getElementById("systemType").value;
        let startDateValue = document.getElementById("startDate").value;
        let startTimeValue = document.getElementById("startTime").value;
        let startDate = startDateValue + ' ' + startTimeValue;
        let endDateValue = document.getElementById("endDate").value;
        let endTimeValue = document.getElementById("endTime").value;
        let endDate = endDateValue + ' ' + endTimeValue;
        let serverName = document.getElementById("serverName").value;
        let timeType = document.getElementById("timeType").value;

        //기간 설정 예외처리
        let startDateLimit = startDateValue.substr(8);
        let endDateLimit = endDateValue.substr(8);
        if (startDateLimit > endDateLimit) {
            alert('기간설정이 잘못되었습니다.');
        }
        else if (startTimeValue > endTimeValue) {
            alert('시간설정이 잘못되었습니다.');
        }

        // $.ajax({
        //     url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
        //     method: "GET",
        //     dataType: "JSON",
        //     success: function (json) {
        //         console.log('데이터 호출 성공');
        //         let systemCnames = [json[0].date, 'CPU 사용률', '메모리 사용률'];
        //         systemCnames.push(systemCnames);
        //         systemCnames(systemCnames);

        //         let networkCnames = [json[0].date, '인터페이스', '네트워크 트래픽(MB/s)'];
        //         cnames.push(cnamesData);

        //         let diskCnames = [json[0].date, '파티션', '디스크 사용률'];
        //         cnames.push(cnamesData);

        //         let channelCnames = [json[0].date, '전체 채널 수', '사용중인 채널 수', '채널 사용률', 'REST 사용률'];
        //         cnames.push(cnamesData);
        //     }
        // });

        if (systemType == "systems") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $.ajax({
                url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                method: "GET",
                dataType: "JSON",
                success: function (json) {
                    systemCnames = ['시간', '호스트명', 'CPU 사용률', '메모리 사용률'];
                    systems(systemCnames);
                }
            });

            function systems(systemCnames) {

                $("#systemGrid").jqGrid({
                    url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                    datatype: "json",
                    mtype: "get",
                    colNames: systemCnames,
                    colModel: [
                        { name: 'time', index: 'time', width: 100, align: 'center' },
                        { name: 'hostname', index: 'hostname', width: 100, align: 'center' },
                        { name: 'cpu_usage__avg', index: 'cpu_usage__avg', width: 100, align: 'center' },
                        { name: 'cpu_usage__avg', index: 'mem_usage__avg', width: 100, align: 'center' }
                    ],
                    width: outerwidth,
                    autowidth: true,
                    height: 280,
                    shrinkToFit: true,
                    rowNum: 10,
                    pager: '#systemGridpager',
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
            }
        }
        else if (systemType == "networks") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $.ajax({
                url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                method: "GET",
                dataType: "JSON",
                success: function (json) {
                    networkCnames = ['시간', '호스트명', '인터페이스', '네트워크 트래픽(MB/s)'];
                    networks(networkCnames);
                }
            });

            function networks(networkCnames) {
                $("#systemGrid").jqGrid({
                    url: `http://192.168.20.203:55532/monitor/static/resources/networks?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                    datatype: "json",
                    mtype: "get",
                    colNames: networkCnames,
                    colModel: [
                        { name: 'time', index: 'time', width: 100, align: 'center' },
                        { name: 'hostname', index: 'hostname', width: 100, align: 'center' },
                        { name: 'interface', index: 'interface', width: 100, align: 'center' },
                        { name: 'bandwidth__avg', index: 'bandwidth__avg', width: 100, align: 'center' }
                    ],
                    width: outerwidth,
                    autowidth: true,
                    height: 280,
                    shrinkToFit: true,
                    rowNum: 10,
                    pager: '#systemGridpager',
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
            }
        }
        else if (systemType == "disks") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $.ajax({
                url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                method: "GET",
                dataType: "JSON",
                success: function (json) {
                    diskCnames = ['시간', '호스트명', '파티션', '디스크 사용률'];
                    disks(diskCnames);
                }
            });

            function disks(diskCnames) {
                $("#systemGrid").jqGrid({
                    url: `http://192.168.20.203:55532/monitor/static/resources/disks?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                    datatype: "json",
                    mtype: "get",
                    colNames: diskCnames,
                    colModel: [
                        { name: 'time', index: 'time', width: 100, align: 'center' },
                        { name: 'hostname', index: 'hostname', width: 100, align: 'center' },
                        { name: 'disk_partition', index: 'disk_partition', width: 100, align: 'center' },
                        { name: 'disk_usage__avg', index: 'disk_usage__avg', width: 100, align: 'center' }
                    ],
                    width: outerwidth,
                    autowidth: true,
                    height: 280,
                    shrinkToFit: true,
                    rowNum: 10,
                    pager: '#systemGridpager',
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
            }
        }
        else if (systemType == "channels") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $.ajax({
                url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                method: "GET",
                dataType: "JSON",
                success: function (json) {
                    channelCnames = ['시간', '호스트명', '전체 채널 수', '사용중인 채널 수', '채널 사용률', 'REST 사용률'];
                    channels(channelCnames);
                }
            });

            function channels(channelCnames) {

                $("#systemGrid").jqGrid({
                    url: `http://192.168.20.203:55532/monitor/static/resources/channels?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                    datatype: "json",
                    mtype: "get",
                    colNames: channelCnames,
                    colModel: [
                        { name: 'time', index: 'time', width: 100, align: 'center' },
                        { name: 'hostname', index: 'hostname', width: 100, align: 'center' },
                        { name: 'total_channel__avg', index: 'total_channel__avg', width: 100, align: 'center' },
                        { name: 'channel_used__avg', index: 'channel_used__avg', width: 100, align: 'center' },
                        { name: 'channel_usage__avg', index: 'channel_usage__avg', width: 100, align: 'center' },
                        { name: 'rest_usage__avg', index: 'rest_usage__avg', width: 100, align: 'center' }
                    ],
                    width: outerwidth,
                    autowidth: true,
                    height: 280,
                    shrinkToFit: true,
                    rowNum: 10,
                    pager: '#systemGridpager',
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
            }
        }
    });

    //화면 리사이즈
    $(window).on('resize.jqGrid', function () {
        $("#systemGrid").jqGrid('setGridWidth', $('.searchBox').width() - 150);
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

    let systemType = document.getElementById("systemType").value;
    let startDateValue = document.getElementById("startDate").value;
    let startTimeValue = document.getElementById("startTime").value;
    let startDate = startDateValue + ' ' + startTimeValue;
    let endDateValue = document.getElementById("endDate").value;
    let endTimeValue = document.getElementById("endTime").value;
    let endDate = endDateValue + ' ' + endTimeValue;
    let serverName = document.getElementById("serverName").value;
    let timeType = document.getElementById("timeType").value;

    $.ajax({
        url: `http://192.168.20.203:55532/monitor/static/resources/${systemType}?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
        contentType: "application/json; charset=UTF-8",
        type: "GET",
        datatype: "JSON",
        success: function (json) {
            console.log('excel 저장 성공');

            let valArr = [];
            let wsData = [];
            if (systemType == 'systems') {
                for (let i = 0; i < json.length; i++) {
                    let val = [json[i].time, json[i].cpu_usage__avg, json[i].mem_usage__avg];
                    valArr.push(val);
                }
                // 이중 배열 형태로 데이터가 들어간다.
                let wsDataArr = ['시간', 'CPU 사용률', '메모리 사용률'];
                // var wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우
                wsData.push(wsDataArr);
            }
            else if (systemType == 'networks') {
                for (let i = 0; i < json.length; i++) {
                    let val = [json[i].time, json[i].interface, json[i].bandwidth__avg];
                    valArr.push(val);
                }
                // 이중 배열 형태로 데이터가 들어간다.
                let wsDataArr = ['시간', '인터페이스', '네트워크 트래픽(MB/s)'];
                // var wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우
                wsData.push(wsDataArr);
            }
            else if (systemType == 'disks') {
                for (let i = 0; i < json.length; i++) {
                    let val = [json[i].time, json[i].disk_partition, json[i].disk_usage__avg];
                    valArr.push(val);
                }
                // 이중 배열 형태로 데이터가 들어간다.
                let wsDataArr = ['시간', '파티션', '디스트 사용률'];
                // var wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우
                wsData.push(wsDataArr);
            }
            else if (systemType == 'channels') {
                for (let i = 0; i < json.length; i++) {
                    let val = [json[i].time, json[i].total_channel__avg, json[i].channel_used__avg, json[i].channel_usage__avg, json[i].rest_usage__avg,];
                    valArr.push(val);
                }
                // 이중 배열 형태로 데이터가 들어간다.
                let wsDataArr = ['시간', '전체 채널 수', '사용중인 채널 수', '채널 사용률', 'REST 사용률'];
                // var wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우
                wsData.push(wsDataArr);
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
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `시스템통계_${systemType}_excel.xlsx`);

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