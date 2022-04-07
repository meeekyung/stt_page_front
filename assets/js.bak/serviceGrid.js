let booleanValue = false;

$(function () {
    //서버 호출
    $.ajax({
        url: "http://192.168.20.203:55532/monitor/server-config",
        method: "GET",
        dataType: "JSON",
        headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
        success: function (json) {
            // console.log('서버타입 호출 성공');
            for (let i = 0; i < json.length; i++) {
                if (json.length >= 0) {
                    $('#serverName').append(
                        '<option value="' + json[i].hostname + '">' + json[i].hostname + '</option>'
                    );
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
                //location.href = "../../login.html"
            }
        }
    });

    let cnames = [];
    let outerwidth = $("#serviceGrid").width();

    $('.search-btn').on('click', function () {

        //이전 데이터 초기화
        $(".serviceStatics-area").remove().empty();
        $(".searchRBox").append('<div class="serviceStatics-area"><table id="serviceGrid"></table><div id="serviceGridpager"></div></div>');
        $(".searchRBox").addClass('searchBox');

        let startDateValue = document.getElementById("startDate").value;
        let startTimeValue = document.getElementById("startTime").value;
        let startDate = startDateValue + ' ' + startTimeValue;
        let endDateValue = document.getElementById("endDate").value;
        let endTimeValue = document.getElementById("endTime").value;
        let endDate = endDateValue + ' ' + endTimeValue;
        let tenantName = document.getElementById("tenantName").value;
        let serverName = document.getElementById("serverName").value;
        let timeType = document.getElementById("timeType").value;

        if (booleanValue) {
            console.log('서비스통계 retrun 값 : ' + startDate, endDate, tenantName, serverName, timeType);
        }

        //기간 설정 예외처리
        let startYearLimit = startDateValue.substr(0, 3);
        let startMonLimit = startDateValue.substr(6, 2);
        let startDayLimit = startDateValue.substr(8);
        let endYearLimit = endDateValue.substr(0, 3);
        let endMonLimit = endDateValue.substr(6, 2);
        let endDayLimit = endDateValue.substr(8);

        $.ajax({
            url: `http://192.168.20.203:55532/monitor/static/service?time=${timeType}&tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            method: "GET",
            dataType: "JSON",
            success: function (json) {
                cnamesData = ['시간', '테넌트명', '호스트명', '요청건수', '성공건수', '실패건수', '음성길이', '음성처리시간', '평균처리속도'];
                cnames.push(cnamesData);
                serviceGrid(cnamesData);
            },
            error: function (request, status, error) {
                //console.log('service 통계 조회 실패');
                if (startDayLimit > endDayLimit || startMonLimit > endMonLimit || startYearLimit > endYearLimit) {
                    $('.alert-cont').append(`<p class="alert-cont-txt">기간설정이 잘못되었습니다.</p>`);
                    $('#alert').show();
                    $(".serviceStatics-area").remove().empty();
                }
                else if (startTimeValue > endTimeValue) {
                    $('.alert-cont').append(`<p class="alert-cont-txt">기간설정이 잘못되었습니다.</p>`);
                    $('#alert').show();
                    $(".serviceStatics-area").remove().empty();
                } else {
                    $('.alert-cont').append(`<p class="alert-cont-txt">설정이 잘못되었습니다.</p>`);
                    $('#alert').show();
                }
            }
        });

        function serviceGrid(cnamesData) {

            $("#serviceGrid").jqGrid({
                url: `http://192.168.20.203:55532/monitor/static/service?time=${timeType}&tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                datatype: "json",
                mtype: "get",
                loadBeforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("Bearer"));
                },
                colNames: cnamesData,
                colModel: [
                    { name: 'time', index: 'time', width: 100, align: 'center' },
                    { name: 'tenant', index: 'tenant', width: 50, align: 'center' },
                    { name: 'hostname', index: 'hostname', width: 50, align: 'center' },
                    { name: 'request__sum', index: 'request__sum', width: 50, align: 'center' },
                    { name: 'success__sum', index: 'success__sum', width: 50, align: 'center' },
                    { name: 'fail__sum', index: 'fail__sum', width: 50, align: 'center' },
                    { name: 'tot_audio_len__sum', index: 'tot_audio_len__sum', width: 50, align: 'center' },
                    { name: 'tot_proc_time__sum', index: 'tot_proc_time__sum', width: 50, align: 'center' },
                    { name: 'avg_rtf__sum', index: 'avg_rtf__sum', width: 50, align: 'center' }
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
                    if (isHover === true) {
                        $('.ui-state-highlight').removeClass('selbg');
                    }
                }, onPaging: function (pgButton) {
                    let gridPage = $('#serviceGrid').getGridParam('page');
                    let totalPage = $('#sp_1_serviceGridpager').text();
                    let nowNum = $('#input_serviceGridpager .ui-pg-input').val();

                    if (pgButton == 'next') {
                        if (gridPage < totalPage) {
                            gridPage += 1;
                        } else {
                            gridPage = page;
                        }
                    } else if (pgButton == 'prev') {
                        if (gridPage > 1) {
                            gridPage -= 1;
                        } else {
                            gridPage = page;
                        }
                    } else if (pgButton == 'first') {
                        $('.alert-cont').append(`<p class="alert-cont-txt">첫 페이지입니다.</p>`);
                        $('#alert').show();
                        gridPage = 1;
                    } else if (pgButton == 'last') {
                        $('.alert-cont').append(`<p class="alert-cont-txt">마지막 페이지입니다!</p>`);
                        $('#alert').show();
                        gridPage = totalPage;
                    } else if (pgButton == 'user') {
                        let nowPage = Number($('#input_alarmGridpager .ui-pg-input').val());
                        if (totalPage >= nowPage && nowPage > 0) {
                            gridPage = nowPage;
                        } else {
                            $('.alert-cont').append(`<p class="alert-cont-txt">존재하지 않는 페이지입니다!</p>`);
                            $('#alert').show();
                            $('#input_serviceGridpager .ui-pg-input').val(gridPage);
                            gridPage = gridPage;
                        }
                    } else if (pgButton == 'records') {
                        gridPage = 1;
                    }
                    $('#serviceGrid').setGridParam('page', gridPage);
                    // $('#alarmGrid').setGridParam({
                    //     postDate: jqGridForm.setParam()
                    // });
                }
            });
        }
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

    let startDateValue = document.getElementById("startDate").value;
    let startTimeValue = document.getElementById("startTime").value;
    let startDate = startDateValue + ' ' + startTimeValue;
    let endDateValue = document.getElementById("endDate").value;
    let endTimeValue = document.getElementById("endTime").value;
    let endDate = endDateValue + ' ' + endTimeValue;
    let tenantName = document.getElementById("tenantName").value;
    let serverName = document.getElementById("serverName").value;
    let timeType = document.getElementById("timeType").value;

    $.ajax({
        url: `http://192.168.20.203:55532/monitor/static/service?time=${timeType}&tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
        contentType: "application/json; charset=UTF-8",
        headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
        type: "GET",
        datatype: "JSON",
        success: function (json) {
            //console.log('excel export 성공');

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
            //console.log('excel export 실패');
        },
    });
    // let wb = XLSX.utils.table_to_book(document.getElementById('gview_serviceGrid'), {sheet:"서비스 통계",raw:true});
    // console.log(wb);
    // XLSX.writeFile(wb, ('서비스통계.xlsx'));

    function excelExport(json) {

    }
});