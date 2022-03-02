$(function () {
    const systemCnames = ['시간', 'CPU 사용률', '메모리 사용률'];
    const networkCnames = ['시간', '인터페이스', '네트워크 속도'];
    const diskCnames = ['시간', '파티션', '디스크 사용률'];
    const channelCnames = ['시간', '전체 채널 수', '사용중인 채널 수', '채널 사용률', 'REST 사용률'];
    const outerwidth = $("#systemGrid").width();

    $('.search-btn').on('click', function () {
        let systemType = document.getElementById("systemType").value;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let serverName = document.getElementById("serverName").value;
        let timeType = document.getElementById("timeType").value;

        console.log(systemType, startDate, endDate, serverName, timeType);
        //$("#systemGrid").jqGrid("GridUnload");        

        if (systemType == "cpumemory") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $("#systemGrid").jqGrid({
                url: `http://192.168.20.203:55532/monitor/static/resources/systems?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                datatype: "json",
                mtype: "get",
                colNames: systemCnames,
                colModel: [
                    { name: 'time', index: 'time', width: 50, align: 'center' },
                    { name: 'cpu_usage__sum', index: 'cpu_usage__sum', width: 100, align: 'center' },
                    { name: 'mem_usage__sum', index: 'mem_usage__sum', width: 100, align: 'center' }
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
        else if (systemType == "network") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $("#systemGrid").jqGrid({
                url: `http://192.168.20.203:55532/monitor/static/resources/networks?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                datatype: "json",
                mtype: "get",
                colNames: networkCnames,
                colModel: [
                    { name: 'time', index: 'time', width: 50, align: 'center' },
                    { name: 'interface', index: 'interface', width: 100, align: 'center' },
                    { name: 'bandwidth__sum', index: 'bandwidth__sum', width: 100, align: 'center' }
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
        else if (systemType == "disk") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $("#systemGrid").jqGrid({
                url: `http://192.168.20.203:55532/monitor/static/resources/disks?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                datatype: "json",
                mtype: "get",
                colNames: diskCnames,
                colModel: [
                    { name: 'time', index: 'time', width: 50, align: 'center' },
                    { name: 'disk_partition', index: 'disk_partition', width: 100, align: 'center' },
                    { name: 'disk_usage__sum', index: 'disk_usage__sum', width: 100, align: 'center' }
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
        else if (systemType == "channel") {
            //이전 데이터 초기화
            $(".systemStatics-area").remove().empty();
            $(".searchRBox").append('<div class="systemStatics-area"><table id="systemGrid"></table><div id="systemGridpager"></div></div>');
            $(".searchRBox").addClass('searchBox');

            $("#systemGrid").jqGrid({
                url: `http://192.168.20.203:55532/monitor/static/resources/channels?time=${timeType}&hostname=${serverName}&start_date=${startDate}&end_date=${endDate}`,
                datatype: "json",
                mtype: "get",
                colNames: channelCnames,
                colModel: [
                    { name: 'time', index: 'time', width: 50, align: 'center' },
                    { name: 'total_channel__sum', index: 'total_channel__sum', width: 100, align: 'center' },
                    { name: 'channel_used__sum', index: 'channel_used__sum', width: 100, align: 'center' },
                    { name: 'channel_usage__sum', index: 'channel_usage__sum', width: 100, align: 'center' },
                    { name: 'rest_usage__sum', index: 'rest_usage__sum', width: 100, align: 'center' }
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