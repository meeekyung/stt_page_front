let booleanValue = false;

$(function () {
    let cnames = ['아이디', '등급', '호스트명', '구분', '대상', '항목', '세부항목', '조건', '임계치', '메세지', 'sms알림'];
    let outerwidth = $("#alarmGrid").width();

    $.getJSON("../../config/config.json", function (json) {
        // console.log(json);
        // console.log(json.urls);

        $("#alarmGrid").jqGrid({
            url: "http://" + json.urls + "/monitor/alarm",
            datatype: "json",
            mtype: "get",
            loadBeforeSend: function (jqXHR) {
                jqXHR.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("Bearer"));
            },
            colNames: cnames,
            colModel: [
                { name: 'id', index: 'id', width: 15, align: 'center' },
                { name: 'level', index: 'level', width: 15, align: 'center' },
                { name: 'hostname', index: 'hostname', width: 15, align: 'center' },
                { name: 'type', index: 'type', width: 15, align: 'center' },
                { name: 'item', index: 'item', width: 15, align: 'center' },
                { name: 'param1', index: 'param1', width: 15, align: 'center' },
                { name: 'param2', index: 'param2', width: 15, align: 'center' },
                { name: 'comparision', index: 'comparision', width: 15, align: 'center' },
                { name: 'value', index: 'value', width: 15, align: 'center' },
                { name: 'message', index: 'message', width: 30, align: 'center' },
                { name: 'sms_noti', index: 'sms_noti', width: 15, align: 'center' }
            ],
            width: outerwidth,
            autowidth: true,
            height: 'auto',
            shrinkToFit: true,
            rowNum: 20,
            rowList: [10, 20, 30, 40],
            multiselect: true,
            pager: '#alarmGridpager',
            //rownumbers: true,
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
            }, onPaging: function (pgButton) {
                let gridPage = $('#alarmGrid').getGridParam('page');
                let totalPage = $('#sp_1_alarmGridpager').text();
                let nowNum = $('#input_alarmGridpager .ui-pg-input').val();

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
                    // $('.alert-cont').append(`<p class="alert-cont-txt">마지막 페이지입니다!</p>`);
                    // $('#alert').show();
                    gridPage = totalPage;
                } else if (pgButton == 'user') {
                    let nowPage = Number($('#input_alarmGridpager .ui-pg-input').val());
                    if (totalPage >= nowPage && nowPage > 0) {
                        gridPage = nowPage;
                    } else {
                        $('.alert-cont').append(`<p class="alert-cont-txt">존재하지 않는 페이지입니다!</p>`);
                        $('#alert').show();
                        $('#input_alarmGridpager .ui-pg-input').val(gridPage);
                        gridPage = gridPage;
                    }
                } else if (pgButton == 'records') {
                    gridPage = 1;
                }
                $('#alarmGrid').setGridParam('page', gridPage);
                // $('#alarmGrid').setGridParam({
                //     postDate: jqGridForm.setParam()
                // });
            },
            loadError: function (jqXHR, textStatus, errorThrown) {
                console.log('HTTP status code: ' + jqXHR.status + '\n' +
                    'textStatus: ' + textStatus + '\n' +
                    'errorThrown: ' + errorThrown);
                console.log('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
                if (jqXHR.status == '403') {
                    //console.log('로그아웃 성공');
                    sessionStorage.removeItem('Bearer'); //삭제
                    //sessionStorage.clear(); // 전체삭제
                    console.log(jqXHR.responseText);
                    location.href = "../../login.html"
                }
            }
        });

        // 체크박스 전체 선택 및 해제
        let alarmOnOff = true;
        $('#jqgh_alarmGrid_cb').on('click', function () {

            alarmOnOff = !alarmOnOff;
            if (!alarmOnOff) {
                $('tr[aria-selected="false"]').each(function () {
                    const id = $(this).attr('id');

                    $("#jqg_alarmGrid_" + id).parent().parent('tr').attr("aria-selected", true);
                    $("#jqg_alarmGrid_" + id).prop("checked", true);
                    $("#jqg_alarmGrid_" + id).parent().parent('tr').addClass('ui-state-highlight');
                });
            } else {
                $('tr[aria-selected="true"]').each(function () {
                    const id = $(this).attr('id');

                    $("#jqg_alarmGrid_" + id).parent().parent('tr').attr("aria-selected", false);
                    $("#jqg_alarmGrid_" + id).prop("checked", false);
                    $("#jqg_alarmGrid_" + id).parent().parent('tr').removeClass('ui-state-highlight');
                });
            }

        });

        //화면 리사이즈
        $(window).on('resize.jqGrid', function () {
            $("#alarmGrid").jqGrid('setGridWidth', $('.set-box').width() - 150);
        });

        //조회
        $('.userT-look').on('click', function () {
            $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
        });

        //삭제버튼 클릭 시 팝업 이벤트
        $('.userT-delete').on('click', function () {
            // 선택된 row rowId를 구한다.
            let selRowIds = jQuery('#alarmGrid').jqGrid('getGridParam', 'selarrrow');
            if (booleanValue) { console.log(selRowIds) }

            // 선택된 row의 개수를 구한다.​
            let selRowIdsLength = selRowIds.length;
            if (booleanValue) {
                console.log(selRowIdsLength);
            }

            //​ 선택된 row가 없다면 리턴
            if (selRowIds.length == 0) {
                alert("삭제할 행을 선택하세요.");
                return;
            }
            // 선택한 row가 있다면 모달창
            else if (selRowIds.length > 0) {
                $('.alert-cont, .alert-btn-area').empty();
                $('.alert-cont').append(`<p class="alert-cont-txt">선택한 행을 삭제하시겠습니까?</p>`);
                $('.alert-btn-area').append(`<input type="button" value="확인" id="alarmDeleteOk" class="btn okay-btn">`);
                $('.alert-btn-area').append(`<input type="button" value="취소" id="alarmDeleteCancel" class="btn cancel-btn" style="margin-left: 10px">`);
                $('#alert').show();
            }
        });

        //삭제 취소
        $(document).on('click', '#alarmDeleteCancel', function () {
            $('#alert').hide();
        });

        //삭제
        $(document).on('click', '#alarmDeleteOk', function () {
            $('#alert').hide();
            // 선택된 row rowId를 구한다.
            let selRowIds = jQuery('#alarmGrid').jqGrid('getGridParam', 'selarrrow');
            if (booleanValue) { console.log(selRowIds) }

            //배열을 텍스트로 추출
            let selRowIdsJoin = selRowIds.join('%2C');

            // 선택된 row의 개수를 구한다.​
            let selRowIdsLength = selRowIds.length;
            if (booleanValue) {
                console.log(selRowIdsLength);
            }

            console.log(selRowIdsLength);

            //​ 선택된 row가 없다면 리턴
            if (selRowIds.length == 0) {
                alert("삭제할 행을 선택하세요.");
                return;
            }

            // 선택된 row의 개수만큼 반복하면서 해당 id를 삭제한다.​
            for (let i = 0; i < selRowIdsLength; i++) {
                $('#alarmGrid').jqGrid('delRowData', selRowIds[0]);
            }

            $.ajax({
                url: "http://" + json.urls + "/monitor/alarm/delete?ids=" + selRowIdsJoin,
                headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
                method: "DELETE",
                dataType: "JSON",
                success: function (json) {
                    //console.log('알람정보 목록 삭제 성공');
                    $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request, status, error) {
                    console.log(request.status);
                    if (request.status == '403') {
                        //console.log('로그아웃 성공');
                        sessionStorage.removeItem('Bearer'); //삭제
                        //sessionStorage.clear(); // 전체삭제
                        console.log(request.responseText);
                        location.href = "../../login.html"
                    }
                }
            });
        });

        //추가 시 input 입력값 reset
        function addReset() {
            $("#userAddPopup input[type='text']").val("");
        }
        $('.userT-add').on('click', function () {
            addReset();
        });

        //추가
        $('.add-area .add-btn-area .add-btn').on('click', function () {

            let alarmLevel2 = document.getElementById("alarmLevel2").value;
            let alarmHostname2 = document.getElementById("alarmHostname2").value;
            let alarmType2 = document.getElementById("alarmType2").value;
            let alarmItem2 = document.getElementById("alarmItem2").value;
            let alarmParam12 = document.getElementById("alarmParam12").value;
            let alarmParam22 = document.getElementById("alarmParam22").value;
            let alarmBigyo2 = document.getElementById("alarmBigyo2").value;
            let alarmValue2 = document.getElementById("alarmValue2").value;
            let alarmMsg2 = document.getElementById("alarmMsg2").value;;
            let radioSms = $('input:radio[name="smsnoti"]:checked').val();


            if (booleanValue) { console.log('추가 retrun값 : ' + { level: alarmLevel2, hostname: alarmHostname2, type: alarmType2, item: alarmItem2, param1: alarmParam12, param2: alarmParam22, comparision: alarmBigyo2, message: alarmMsg2, value: alarmValue2, sms_noti: radioSms, message: '' }); }

            rowId = $("#alarmGrid").getGridParam("reccount"); // 페이징 처리 시 현 페이지의 Max RowId 값

            //입력값이 빈값일때
            if ($('.add_in>input').val() == '') {
                $('#userAddPopup').show();
                $("#alarmGrid").jqGrid("delRowData", rowId);
            }

            //임계치 입력값이 0일때
            if (alarmValue2 == "") {
                alarmValue2 = 0;
            }

            $.ajax({
                url: "http://" + json.urls + "/monitor/alarm",
                contentType: "application/json; charset=UTF-8",
                headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
                method: "POST",
                dataType: "JSON",
                data: JSON.stringify({ level: alarmLevel2, hostname: alarmHostname2, type: alarmType2, item: alarmItem2, param1: alarmParam12, param2: alarmParam22, comparision: alarmBigyo2, value: alarmValue2, message: alarmMsg2, sms_noti: radioSms }),
                success: function (json) {
                    //console.log('알람발생조건 추가 성공');
                    $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request, status, error) {
                    $('.alert-cont').empty();
                    let err = eval("(" + request.responseText + ")");
                    $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                    $('#alert').show();

                    $('#userAddPopup').show();

                    if (request.status == '403') {
                        //console.log('로그아웃 성공');
                        sessionStorage.removeItem('Bearer'); //삭제
                        //sessionStorage.clear(); // 전체삭제
                        console.log(request.responseText);
                        location.href = "../../login.html"
                    }
                }
            });
        });

        //변경
        $('.userT-change').on('click', function () {
            // 선택된 row rowId를 구한다.
            let selRowIds = jQuery('#alarmGrid').jqGrid('getGridParam', 'selarrrow');

            //​ 선택된 row가 없다면 리턴
            if (selRowIds.length == 0) {
                alert("변경할 행을 선택하세요.");
                return;
            } else if (selRowIds.length > 1) {
                alert('변경할 1개의 행만 선택하세요');
                $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                window.location.reload();
            }

            //배열을 텍스트로 추출
            let setAlarmArr = [];
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
                let selMsg = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_message"]').text();
                let selSms = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_sms_noti2"]').val();
                setAlarmArr.push(selid, selLevel, selHostname, selType, selItem, selParam1, selParam2, selBigyo, selValue, selMsg, selSms);
                if (booleanValue) { console.log('변경 팝업 텍스트값 : ' + setAlarmArr); }
            }

            //운영자관리 변경팝업 생성
            if (selRowIds.length == 1) {
                $('#alarmLevelSel, #alarmHostnameSel, #alarmTypeSel, #alarmItemSel, #alarmParam1Sel, #alarmParam2Sel').empty();
                $("input[name='alarmid']").attr("placeholder", $("input[name='alarmid']").val()).val(setAlarmArr[0]).focus().blur();
                $("input[name='alarmLevelSel']").attr("placeholder", $("input[name='alarmLevelSel']").val()).val(setAlarmArr[1]).focus().blur();
                $("input[name='alarmHostnameSel']").attr("placeholder", $("input[name='alarmHostnameSel']").val()).val(setAlarmArr[2]).focus().blur();
                $("input[name='alarmtypeSel']").attr("placeholder", $("input[name='alarmtypeSel']").val()).val(setAlarmArr[3]).focus().blur();
                $("input[name='alarmitemSel']").attr("placeholder", $("input[name='alarmitemSel']").val()).val(setAlarmArr[4]).focus().blur();
                $("input[name='alarmparam1Sel']").attr("placeholder", $("input[name='alarmparam1Sel']").val()).val(setAlarmArr[5]).focus().blur();
                $("input[name='alarmparam2Sel']").attr("placeholder", $("input[name='alarmparam2Sel']").val()).val(setAlarmArr[6]).focus().blur();
                $("input[name='alarmbigyoSel']").attr("placeholder", $("input[name='alarmbigyoSel']").val()).val(setAlarmArr[7]).focus().blur();
                $("input[name='alarmvalue']").attr("placeholder", $("input[name='alarmvalue']").val()).val(setAlarmArr[8]).focus().blur();
                $("input[name='alarmMsg']").attr("placeholder", $("input[name='alarmMsg']").val()).val(setAlarmArr[9]).focus().blur();
                if (setAlarmArr[10] == "No") {
                    $("#smsNo2").prop("checked", true);
                } else if (setAlarmArr[10] == "Yes") {
                    $("#smsYes2").prop("checked", true);
                }

                //빈공백 제거
                let param2 = $("input[name='alarmparam2']");
                let alarmNull = setAlarmArr[6].trim();
                if (alarmNull == '') {
                    param2.attr("disabled", true);
                } else {
                    param2.attr("disabled", false);
                }

                $('#userChPopup').show();

            } else {
                $('#userChPopup').hide();
            }

        });
        //변경 버튼 클릭 시 이벤트
        $('.add-area .add-btn-area .change-btn').on('click', function () {
            let alarmId = document.getElementById("alarmId").value;
            let alarmLevel = document.getElementById("alarmLevelSel").value;
            let alarmHostname = document.getElementById("alarmHostnameSel").value;
            let alarmType = document.getElementById("alarmTypeSel").value;
            let alarmItem = document.getElementById("alarmItemSel").value;
            let alarmParam1 = document.getElementById("alarmParam1Sel").value;
            let alarmParam2 = document.getElementById("alarmParam2Sel").value;
            let alarmBigyo = document.getElementById("alarmBigyoSel").value;
            let alarmValue = document.getElementById("alarmValue").value;
            let alarmSmsnoti2 = $('input:radio[name="smsnoti2"]:checked').val();
            let alarmMsg = document.getElementById("alarmMsg").value;

            if (booleanValue) {
                console.log('변경 버튼 클릭 시 retrun값 : ' + { id: alarmId, level: alarmLevel, hostname: alarmHostname, type: alarmType, item: alarmItem, param1: alarmParam1, param2: alarmParam2, comparision: alarmBigyo, value: alarmValue, message: alarmMsg, sms_noti: alarmSmsnoti2 });
            }

            $.ajax({
                url: "http://" + json.urls + "/monitor/alarm/" + alarmId,
                contentType: "application/json; charset=UTF-8",
                method: "PUT",
                headers: { Authorization: "bearer " + sessionStorage.getItem("Bearer") },
                dataType: "JSON",
                data: JSON.stringify({ id: alarmId, level: alarmLevel, hostname: alarmHostname, type: alarmType, item: alarmItem, param1: alarmParam1, param2: alarmParam2, comparision: alarmBigyo, value: alarmValue, message: alarmMsg, sms_noti: alarmSmsnoti2 }),
                success: function (json) {
                    let localToken = sessionStorage.getItem('Bearer');
                    //console.log('알람발생조건 변경 성공');
                    $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request, status, error) {
                    $('.alert-cont').empty();
                    //console.log('알람발생조건 변경 실패');
                    let err = eval("(" + request.responseText + ")");
                    $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                    $('#alert').show();
                    $('#userChPopup').show();

                    if (request.status == '403') {
                        //console.log('로그아웃 성공');
                        sessionStorage.removeItem('Bearer'); //삭제
                        //sessionStorage.clear(); // 전체삭제
                        console.log(request.responseText);
                        location.href = "../../login.html";
                    }
                }
            });
        });
    });
});
