$(function () {
    let cnames = ['서버명', '호스트명', '기능', 'IP주소'];
    let outerwidth = $("#serverGrid").width();

    $("#serverGrid").jqGrid({
        url: "http://192.168.20.194:55532/monitor/server-config",
        datatype: "json",
        mtype: "get",
        loadBeforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem("Bearer"));
        },
        colNames: cnames,
        colModel: [
            { name: 'name', index: 'name', width: 100, align: 'center' },
            { name: 'hostname', index: 'hostname', width: 100, align: 'center' },
            { name: 'role', index: 'role', width: 80, align: 'center' },
            { name: 'ipaddr', index: 'ipaddr', width: 100, align: 'center' }
        ],
        width: outerwidth,
        autowidth: true,
        height: 280,
        shrinkToFit: true,
        rowNum: 10,
        multiselect: true,
        pager: '#serverGridpager',
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

            $('.selbg').on('click', function () {
                if ($(this).hasClass('ui-state-highlight') === true) {
                    $('.ui-state-highlight').removeClass('selbg');
                } else if ($(this).hasClass('ui-state-highlight') === false) {
                    $('.ui-state-highlight').addClass('selbg');
                }
            });
        }
    });

    // 체크박스 전체 선택 및 해제
    let serverOnOff = true;
    $('#jqgh_serverGrid_cb').on('click', function () {

        serverOnOff = !serverOnOff;
        if (!serverOnOff) {
            $('tr[aria-selected="false"]').each(function () {
                const id = $(this).attr('id');

                $("#jqg_serverGrid_" + id).parent().parent('tr').attr("aria-selected", true);
                $("#jqg_serverGrid_" + id).prop("checked", true);
                $("#jqg_serverGrid_" + id).parent().parent('tr').addClass('ui-state-highlight');
            });
        } else {
            $('tr[aria-selected="true"]').each(function () {
                const id = $(this).attr('id');

                $("#jqg_serverGrid_" + id).parent().parent('tr').attr("aria-selected", false);
                $("#jqg_serverGrid_" + id).prop("checked", false);
                $("#jqg_serverGrid_" + id).parent().parent('tr').removeClass('ui-state-highlight');
            });
        }

    });

    //화면 리사이즈
    $(window).on('resize.jqGrid', function () {
        $("#serverGrid").jqGrid('setGridWidth', $('.set-box').width() - 150);
    });

    //조회
    $('.userT-look').on('click', function () {
        $("#serverGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
        console.log('서버정보 목록이 조회되었습니다.');
    });

    //삭제       
    $('.userT-delete').on('click', function () {
        // 선택된 row rowId를 구한다.
        let selRowIds = jQuery('#serverGrid').jqGrid('getGridParam', 'selarrrow');
        console.log(selRowIds);

        //배열을 텍스트로 추출
        var setDarr = new Array();
        for (let i = 0; i < selRowIds.length; i++) {
            let selHostname = $('#' + selRowIds[i]).children('td[aria-describedby="serverGrid_hostname"]').text();
            console.log(selHostname);
            console.log(setDarr.push(selHostname));
            console.log(setDarr);
        }

        //선택된 row rowId의 hostname을 텍스트로 추출
        console.log(setDarr);
        let setDarrJoin = setDarr.join('%2C');

        // 선택된 row의 개수를 구한다.​
        let selRowIdsLength = selRowIds.length;

        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("삭제할 행을 선택하세요.");
            return;
        }

        // 선택된 row의 개수만큼 반복하면서 해당 id를 삭제한다.​
        for (let i = 0; i < selRowIdsLength; i++) {
            $('#serverGrid').jqGrid('delRowData', selRowIds[0]);
            //alert("선택하신 행이 삭제 되었습니다.");
            //$("#serverGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
        }

        $.ajax({
            url: "http://192.168.20.194:55532/monitor/server-config/delete?hostname=" + setDarrJoin,
            method: "DELETE",
            dataType: "JSON",
            success: function (json) {
                console.log('서버정보목록 삭제 성공');
            },
            error: function () {
                console.log('서버정보목록 삭제 실패');
            }
        });
    });

    //추가
    $('.add-area .add-btn-area .add-btn').on('click', function () {
        let serverName = document.getElementById("serverName").value;
        let hostName = document.getElementById("hostName").value;
        let severRole = document.getElementById("severRole").value;
        let ipAddr = document.getElementById("ipAddr").value;

        let addData = { name: serverName, hostname: hostName, role: severRole, ipaddr: ipAddr }

        rowId = $("#serverGrid").getGridParam("reccount"); // 페이징 처리 시 현 페이지의 Max RowId 값

        //입력값이 빈값일때
        if ($('.add_in>input').val() == '') {
            $('#userAddPopup').show();
            document.getElementById("serverName").focus();
            $("#mainGrid").jqGrid("delRowData", rowId);
        }
        //$("#serverGrid").jqGrid("addRowData", rowId + 1, addData, 'first'); // 마지막 행에 Row 추가

        $.ajax({
            url: "http://192.168.20.194:55532/monitor/server-config",
            contentType: "application/json; charset=UTF-8",
            headers: { Authorization: "Bearer " + localStorage.getItem("Bearer") },
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify({ name: serverName, hostname: hostName, role: severRole, ipaddr: ipAddr, status: 0, ch_rest: 0, ch_grpc: 0, ch_stream: 0 }),
            success: function (json) {
                console.log('서버정보목록 추가 성공');
                $("#serverGrid").jqGrid("addRowData", rowId + 1, addData, 'first');
                console.log(addReset());
            },
            error: function (request, status, error) {
                console.log('서버정보목록 추가 실패');
                let err = eval("(" + request.responseText + ")");
                $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                $('#alert').show();
            }
        });
    });

    //추가 시 input 입력값 reset
    function addReset() {
        $("#serverName, #hostName, #severRole, #ipAddr").val("");
    }
    $('.userT-add').on('click', function () {
        addReset();
    });

    //변경
    $('.userT-change').on('click', function () {

        // 선택된 row rowId를 구한다.
        let selRowIds = jQuery('#serverGrid').jqGrid('getGridParam', 'selarrrow');
        console.log(selRowIds);

        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("변경할 행을 선택하세요.");
            return;
        } else if (selRowIds.length > 1) {
            alert('변경할 1개의 행만 선택하세요');
            $("#serverGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
            window.location.reload();
        }

        //배열을 텍스트로 추출
        let setCharr = new Array();
        for (let i = 0; i < selRowIds.length; i++) {
            let selName = $("#" + selRowIds[i]).children('td[aria-describedby="serverGrid_name"]').text();
            let selHostname = $("#" + selRowIds[i]).children('td[aria-describedby="serverGrid_hostname"]').text();
            let selRole = $("#" + selRowIds[i]).children('td[aria-describedby="serverGrid_role"]').text();
            let selIpaddr = $("#" + selRowIds[i]).children('td[aria-describedby="serverGrid_ipaddr"]').text();
            console.log(selName, selHostname, selRole, selIpaddr);
            console.log(setCharr.push(selName, selHostname, selRole, selIpaddr));
            console.log(setCharr);
        }

        //운영자관리 변경팝업 생성
        if (selRowIds.length == 1) {
            $("input[name='servername2']").attr("placeholder", $("input[name='servername2']").val()).val(setCharr[0]).focus().blur();
            $("input[name='hostname2']").attr("placeholder", $("input[name='hostname2']").val()).val(setCharr[1]).focus().blur();
            //hostname 변경 안되게..
            $("input[name='hostname2']").attr('disabled', true);
            $("input[name='severrole2']").attr("placeholder", $("input[name='severrole2']").val()).val(setCharr[2]).focus().blur();
            $("input[name='ipaddr2']").attr("placeholder", $("input[name='ipaddr2']").val()).val(setCharr[3]).focus().blur();
            $('#userChPopup').show();
        } else {
            $('#userChPopup').hide();
        }

        //변경 버튼 클릭 시 이벤트
        $('.add-area .add-btn-area .change-btn').on('click', function () {
            let serverName2 = document.getElementById("serverName2").value;
            let hostName2 = document.getElementById("hostName2").value;
            let severRole2 = document.getElementById("severRole2").value;
            let ipAddr2 = document.getElementById("ipAddr2").value;

            $('#userChPopup').show();

            $.ajax({
                url: "http://192.168.20.194:55532/monitor/server-config/" + setCharr[1],
                contentType: "application/json; charset=UTF-8",
                headers: { Authorization: "Bearer " + localStorage.getItem("Bearer") },
                method: "PUT",
                dataType: "JSON",
                data: JSON.stringify({ name: serverName2, hostname: hostName2, role: severRole2, ipaddr: ipAddr2, status: 0, ch_rest: 0, ch_grpc: 0, ch_stream: 0 }),
                success: function (json) {
                    console.log('운영자목록 변경 성공');
                    alert('서버정보가 변경되었습니다');
                    $("#serverGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request, status, error) {
                    console.log('운영자목록 변경 실패');
                    let err = eval("(" + request.responseText + ")");
                    $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                    $('#alert').show();
                }
            });
        });
    });

    //페이지 전환 안되게..
    $('.ui-pg-input').attr('disabled', true);
});