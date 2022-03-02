$(function () {
    let cnames = ['시간', '요청건수', '성공건수', '실패건수', '음성길이', '음성처리시간', '평균처리속도'];
    let outerwidth = $("#serviceGrid").width();

    $('.search-btn').on('click', function () {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let tenantName = document.getElementById("tenantName").value;
        let serverName = document.getElementById("serverName").value;
        let timeType = document.getElementById("timeType").value;

        //?time=minute&tenant=broadcns&hostname=bona-stt1&start_date=2021-1-1&end_date=2023-10-10


        $("#serviceGrid").jqGrid({
            url: `http://192.168.20.203:55532/monitor/static/service?time=${timeType}
            &tenant=${tenantName}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
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