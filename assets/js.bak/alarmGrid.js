let booleanValue = false;

$(function () {
    let cnames = ['아이디', '레벨', '호스트명', '타입', '아이템', '세부항목1', '세부항목2', '조건', '수치', 'sms알림'];
    let outerwidth = $("#alarmGrid").width();

    $("#alarmGrid").jqGrid({
        url: "http://192.168.20.203:55532/monitor/alarm",
        datatype: "json",
        mtype: "get",
        loadBeforeSend: function (jqXHR) {
            const jwtToken = sessionStorage.getItem("Bearer");
            jqXHR.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("Bearer"));
        },
        colNames: cnames,
        colModel: [
            { name: 'id', index: 'id', width: 15, align: 'center' },
            { name: 'level', index: 'level', width: 30, align: 'center' },
            { name: 'hostname', index: 'hostname', width: 30, align: 'center' },
            { name: 'type', index: 'type', width: 30, align: 'center' },
            { name: 'item', index: 'item', width: 30, align: 'center' },
            { name: 'param1', index: 'param1', width: 30, align: 'center' },
            { name: 'param2', index: 'param2', width: 30, align: 'center' },
            { name: 'comparision', index: 'comparision', width: 30, align: 'center' },
            { name: 'value', index: 'value', width: 30, align: 'center' },
            { name: 'sms_noti', index: 'sms_noti', width: 30, align: 'center' }
        ],
        width: outerwidth,
        autowidth: true,
        height: 580,
        shrinkToFit: true,
        rowNum: 20,
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

    //삭제
    $('.userT-delete').on('click', function () {
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

        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("삭제할 행을 선택하세요.");
            return;
        }

        // 선택된 row의 개수만큼 반복하면서 해당 id를 삭제한다.​
        for (let i = 0; i < selRowIdsLength; i++) {
            $('#alarmGrid').jqGrid('delRowData', selRowIds[0]);
            //alert("선택하신 행이 삭제 되었습니다.");
            $("#alarmGrid").trigger("reloadGrid");
        }

        $.ajax({
            url: "http://192.168.20.203:55532/monitor/alarm/delete?ids=" + selRowIdsJoin,
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            method: "DELETE",
            dataType: "JSON",
            success: function (json) {
                //console.log('알람정보 목록 삭제 성공');
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
    });

    //추가 select 출력
    $('.userT-add').on('click', function () {
        $(".add_in select option:eq(0)").prop("selected", false);
        $("#alarmParam22").attr("disabled", true);
        $("#alarmValue2").val("");

        $.ajax({
            url: "http://192.168.20.203:55532/monitor/alarm",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            contentType: "application/json; charset=UTF-8",
            method: "GET",
            dataType: "JSON",
            success: function (json) {
                //console.log('알람발생조건 select 데이터 출력 성공');
                //알람레벨 select 출력
                alarmLevelArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmLevel = json[i].level;
                        alarmLevelArr.push(alarmLevel);
                    }
                }
                //중복제거 후 배열출력
                alarmLevelArrSet = new Set(alarmLevelArr);
                const uniqueAlarmLevelArr = [...alarmLevelArrSet];

                if (uniqueAlarmLevelArr.length > 0) {
                    for (let i = 0; i < uniqueAlarmLevelArr.length; i++) {
                        $('#alarmLevel2').append(
                            `<option value="${uniqueAlarmLevelArr[i]}">${uniqueAlarmLevelArr[i]}</option>`
                        );
                    }
                }

                //호스트명 select 출력
                alarmHostnameArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmHostname = json[i].hostname;
                        alarmHostnameArr.push(alarmHostname);
                    }
                }
                //중복제거 후 배열출력
                alarmHostnameArrSet = new Set(alarmHostnameArr);
                const uniqueAlarmHostnameArr = [...alarmHostnameArrSet];

                if (uniqueAlarmHostnameArr.length > 0) {
                    for (let i = 0; i < uniqueAlarmHostnameArr.length; i++) {
                        $('#alarmHostname2').append(
                            `<option value="${uniqueAlarmHostnameArr[i]}">${uniqueAlarmHostnameArr[i]}</option>`
                        );
                    }
                }

                //타입 select 출력
                alarmTypeArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmType = json[i].type;
                        alarmTypeArr.push(alarmType);
                    }
                }
                //중복제거 후 배열출력
                alarmTypeArrSet = new Set(alarmTypeArr);
                const uniqueAlarmTypeArr = [...alarmTypeArrSet];

                if (uniqueAlarmTypeArr.length > 0) {
                    for (let i = 0; i < uniqueAlarmTypeArr.length; i++) {
                        $('#alarmType2').append(
                            `<option value="${uniqueAlarmTypeArr[i]}">${uniqueAlarmTypeArr[i]}</option>`
                        );
                    }
                }

                //아이템 select 출력
                alarmItemArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmItem = json[i].item;
                        alarmItemArr.push(alarmItem);
                    }
                }
                //중복제거 후 배열출력
                alarmItemArrSet = new Set(alarmItemArr);
                const uniqueAlarmItemArr = [...alarmItemArrSet];

                if (uniqueAlarmItemArr.length > 0) {
                    for (let i = 0; i < uniqueAlarmItemArr.length; i++) {
                        $('#alarmItem2').append(
                            `<option value="${uniqueAlarmItemArr[i]}">${uniqueAlarmItemArr[i]}</option>`
                        );
                    }
                }

                //세부항목1 select 출력
                alarmParam1Arr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmParam1 = json[i].param1;
                        alarmParam1Arr.push(alarmParam1);
                    }
                }
                //중복제거 후 배열출력
                alarmParam1ArrSet = new Set(alarmParam1Arr);
                const uniqueAlarmParam1Arr = [...alarmParam1ArrSet];

                if (uniqueAlarmParam1Arr.length > 0) {
                    for (let i = 0; i < uniqueAlarmParam1Arr.length; i++) {
                        $('#alarmParam12').append(
                            `<option value="${uniqueAlarmParam1Arr[i]}">${uniqueAlarmParam1Arr[i]}</option>`
                        );
                    }
                }

                //세부항목2 disable -> able 이벤트
                alarmParam2Arr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmParam2 = json[i].param2;
                        alarmParam2Arr.push(alarmParam2);
                    }
                }
                //중복제거 후 배열출력
                alarmParam2ArrSet = new Set(alarmParam2Arr);
                const uniqueAlarmParam2Arr = [...alarmParam2ArrSet];

                $('#alarmParam12').on('click', function () {
                    let alarmParam12 = $('#alarmParam12').val();
                    if (alarmParam12 == "cpu") {
                        $('#alarmParam22').empty();
                        $('#alarmParam22').attr('disabled', true);
                    }
                    else if (alarmParam12 == "memory") {
                        $('#alarmParam22').empty();
                        $('#alarmParam22').attr('disabled', true);
                    }
                    else if (alarmParam12 == "disk") {
                        $('#alarmParam22').attr('disabled', false);
                        //disk 중 세부항목2 배열
                        const diskParm2Arr = [];
                        if (json.length > 0) {
                            for (let i = 0; i < json.length; i++) {
                                if (json[i].param1 == "disk") {
                                    const diskParam2 = json[i].param2;
                                    diskParm2Arr.push(diskParam2);
                                }
                            }
                        }
                        //중복제거 후 배열출력
                        diskParam2ArrSet = new Set(diskParm2Arr);
                        const uniquediskParm2Arr = [...diskParam2ArrSet];

                        if (uniquediskParm2Arr.length > 0) {
                            $('#alarmParam22').empty();
                            for (let i = 0; i < uniquediskParm2Arr.length; i++) {
                                $('#alarmParam22').append(
                                    `<option value="${uniquediskParm2Arr[i]}">${uniquediskParm2Arr[i]}</option>`
                                );
                            }
                        }
                    }
                    else if (alarmParam12 == "network") {
                        $('#alarmParam22').attr('disabled', false);
                        //disk 중 세부항목2 배열
                        const networkParm2Arr = [];
                        if (json.length > 0) {
                            for (let i = 0; i < json.length; i++) {
                                if (json[i].param1 == "network") {
                                    const networkParam2 = json[i].param2;
                                    networkParm2Arr.push(networkParam2);
                                }
                            }
                        }
                        //중복제거 후 배열출력
                        networkParam2ArrSet = new Set(networkParm2Arr);
                        const uniquenetworkParm2Arr = [...networkParam2ArrSet];

                        if (uniquenetworkParm2Arr.length > 0) {
                            $('#alarmParam22').empty();
                            for (let i = 0; i < uniquenetworkParm2Arr.length; i++) {
                                $('#alarmParam22').append(
                                    `<option value="${uniquenetworkParm2Arr[i]}">${uniquenetworkParm2Arr[i]}</option>`
                                );
                            }
                        }
                    }
                });

                //조건 select 출력
                alarmbigyoArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarmbigyo = json[i].comparision;
                        alarmbigyoArr.push(alarmbigyo);
                    }
                }
                //중복제거 후 배열출력
                alarmbigyoArrSet = new Set(alarmbigyoArr);
                const uniquealarmbigyoArr = [...alarmbigyoArrSet];

                if (uniquealarmbigyoArr.length > 0) {
                    for (let i = 0; i < uniquealarmbigyoArr.length; i++) {
                        $('#alarmBigyo2').append(
                            `<option value="${uniquealarmbigyoArr[i]}">${uniquealarmbigyoArr[i]}</option>`
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
        let radioSms = $('input:radio[name="smsnoti"]:checked').val();
        let alarmMsg2 = document.getElementById("alarmMsg2");

        if (booleanValue) { console.log('추가 retrun값 : ' + { level: alarmLevel2, hostname: alarmHostname2, type: alarmType2, item: alarmItem2, param1: alarmParam12, param2: alarmParam22, comparision: alarmBigyo2, value: alarmValue2, sms_noti: radioSms, message: '' }); }

        $.ajax({
            url: "http://192.168.20.203:55532/monitor/alarm",
            contentType: "application/json; charset=UTF-8",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify({ level: alarmLevel2, hostname: alarmHostname2, type: alarmType2, item: alarmItem2, param1: alarmParam12, param2: alarmParam22, comparision: alarmBigyo2, value: alarmValue2, sms_noti: radioSms }),
            success: function (json) {
                //console.log('알람발생조건 추가 성공');
                $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
            },
            error: function (request, status, error) {
                //console.log('알람발생조건 추가 실패');
                let err = eval("(" + request.responseText + ")");
                $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                $('#alert').show();

                if (request.status == '403') {
                    //console.log('로그아웃 성공');
                    sessionStorage.removeItem('Bearer'); //삭제
                    //sessionStorage.clear(); // 전체삭제
                    console.log(request.responseText);
                    //location.href = "../../login.html"
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
            //let selSms = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_sms_noti2"]').val();
            //let selMsg = $("#" + selRowIds[i]).children('td[aria-describedby="alarmGrid_message"]').text();
            setAlarmArr.push(selid, selLevel, selHostname, selType, selItem, selParam1, selParam2, selBigyo, selValue);
            if (booleanValue) { console.log('변경 팝업 텍스트값 : ' + setAlarmArr); }
        }

        //운영자관리 변경팝업 생성
        if (selRowIds.length == 1) {
            $("input[name='alarmid']").attr("placeholder", $("input[name='alarmid']").val()).val(setAlarmArr[0]).focus().blur();
            $("input[name='alarmlevel']").attr("placeholder", $("input[name='alarmlevel']").val()).val(setAlarmArr[1]).focus().blur();
            $("input[name='alarmHostname']").attr("placeholder", $("input[name='alarmHostname']").val()).val(setAlarmArr[2]).focus().blur();
            $("input[name='alarmtype']").attr("placeholder", $("input[name='alarmtype']").val()).val(setAlarmArr[3]).focus().blur();
            $("input[name='alarmitem']").attr("placeholder", $("input[name='alarmitem']").val()).val(setAlarmArr[4]).focus().blur();
            $("input[name='alarmparam1']").attr("placeholder", $("input[name='alarmparam1']").val()).val(setAlarmArr[5]).focus().blur();
            $("input[name='alarmparam2']").attr("placeholder", $("input[name='alarmparam2']").val()).val(setAlarmArr[6]).focus().blur();
            $("input[name='alarmbigyo']").attr("placeholder", $("input[name='alarmbigyo']").val()).val(setAlarmArr[7]).focus().blur();
            $("input[name='alarmvalue2']").attr("placeholder", $("input[name='alarmvalue2']").val()).val(setAlarmArr[8]).focus().blur();
            //$("input[name='smsnoti2']").attr("placeholder", $("input[name='smsnoti2']").val()).val(setAlarmArr[9]).focus().blur();
            //$("input[name='alarmmsg']").attr("placeholder", $("input[name='alarmmsg']").val()).val(setAlarmArr[10]).focus().blur();

            //빈공백 제거
            let param2 = $("input[name='alarmparam2']");
            let alarmNull = setAlarmArr[6].trim();
            if (alarmNull == '') {
                param2.attr("disabled", true);
            } else {
                param2.attr("disabled", false);
            }
            $('#userChPopup').show();

            //selectbox value 값에 따른 변경
            //레벨값 변경
            $('#alarmLevelSel').on('click', function () {
                var target = document.getElementById("alarmLevelSel");
                //console.log('선택된 옵션 text 값=' + target.options[target.selectedIndex].text);     // 옵션 text 값
                const alarmLevelText = target.options[target.selectedIndex].value;

                document.getElementById("alarmLevel").value = alarmLevelText;
            });

            //호스트명 변경
            $('#alarmHostnameSel').on('click', function () {
                var target = document.getElementById("alarmHostnameSel");
                const alarmHostnameText = target.options[target.selectedIndex].value;

                document.getElementById("alarmHostname").value = target.options[target.selectedIndex].value;
            });

            //타입 변경
            $('#alarmTypeSel').on('click', function () {
                var target = document.getElementById("alarmTypeSel");
                const alarmTypeText = target.options[target.selectedIndex].value;

                document.getElementById("alarmType").value = target.options[target.selectedIndex].value;
            });

            //아이템 변경
            $('#alarmItemSel').on('click', function () {
                var target = document.getElementById("alarmItemSel");
                const alarmItemText = target.options[target.selectedIndex].value;

                document.getElementById("alarmItem").value = target.options[target.selectedIndex].value;
            });

            //세부항목1 변경
            $('#alarmParam1Sel').on('click', function () {
                var target = document.getElementById("alarmParam1Sel");
                const alarmParam1Text = target.options[target.selectedIndex].value;

                document.getElementById("alarmParam1").value = target.options[target.selectedIndex].value;
            });

            //세부항목2 변경
            $('#alarmParam2Sel').on('click', function () {
                var target = document.getElementById("alarmParam2Sel");
                const alarmParam2Text = target.options[target.selectedIndex].value;

                document.getElementById("alarmParam2").value = target.options[target.selectedIndex].value;
            });

            //조건 변경
            $('#alarmBigyoSel').on('click', function () {
                var target = document.getElementById("alarmBigyoSel");
                const alarmBigyoText = target.options[target.selectedIndex].value;

                document.getElementById("alarmBigyo").value = target.options[target.selectedIndex].value;
            });
        } else {
            $('#userChPopup').hide();
        }

        //변경 select 출력
        $.ajax({
            url: "http://192.168.20.203:55532/monitor/alarm",
            contentType: "application/json; charset=UTF-8",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            method: "GET",
            dataType: "JSON",
            success: function (json) {
                //console.log('알람발생조건 변경 select 데이터 출력 성공');
                //알람레벨 select 출력
                alarm2LevelArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Level = json[i].level;
                        alarm2LevelArr.push(alarm2Level);
                    }
                }
                //중복제거 후 배열출력
                alarm2LevelArrSet = new Set(alarm2LevelArr);
                const uniqueAlarm2LevelArr = [...alarm2LevelArrSet];

                if (uniqueAlarm2LevelArr.length > 0) {
                    for (let i = 0; i < uniqueAlarm2LevelArr.length; i++) {
                        $('#alarmLevelSel').append(
                            `<option value="${uniqueAlarm2LevelArr[i]}">${uniqueAlarm2LevelArr[i]}</option>`
                        );
                    }
                }

                //호스트명 select 출력
                alarm2HostnameArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Hostname = json[i].hostname;
                        alarm2HostnameArr.push(alarm2Hostname);
                    }
                }
                //중복제거 후 배열출력
                alarm2HostnameArrSet = new Set(alarm2HostnameArr);
                const uniquealarm2HostnameArr = [...alarm2HostnameArrSet];

                if (uniquealarm2HostnameArr.length > 0) {
                    for (let i = 0; i < uniquealarm2HostnameArr.length; i++) {
                        $('#alarmHostnameSel').append(
                            `<option value="${uniquealarm2HostnameArr[i]}">${uniquealarm2HostnameArr[i]}</option>`
                        );
                    }
                }

                //타입 select 출력
                alarm2TypeArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Type = json[i].type;
                        alarm2TypeArr.push(alarm2Type);
                    }
                }
                //중복제거 후 배열출력
                alarm2TypeArrSet = new Set(alarm2TypeArr);
                const uniquealarm2TypeArr = [...alarm2TypeArrSet];

                if (uniquealarm2TypeArr.length > 0) {
                    for (let i = 0; i < uniquealarm2TypeArr.length; i++) {
                        $('#alarmTypeSel').append(
                            `<option value="${uniquealarm2TypeArr[i]}">${uniquealarm2TypeArr[i]}</option>`
                        );
                    }
                }

                //아이템 select 출력
                alarm2ItemArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Item = json[i].item;
                        alarm2ItemArr.push(alarm2Item);
                    }
                }
                //중복제거 후 배열출력
                alarm2ItemArrSet = new Set(alarm2ItemArr);
                const uniquealarm2ItemArr = [...alarm2ItemArrSet];

                if (uniquealarm2ItemArr.length > 0) {
                    for (let i = 0; i < uniquealarm2ItemArr.length; i++) {
                        $('#alarmItemSel').append(
                            `<option value="${uniquealarm2ItemArr[i]}">${uniquealarm2ItemArr[i]}</option>`
                        );
                    }
                }

                //세부항목1 select 출력
                alarm2Param1Arr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Param1 = json[i].param1;
                        alarm2Param1Arr.push(alarm2Param1);
                    }
                }
                //중복제거 후 배열출력
                alarm2Param1ArrSet = new Set(alarm2Param1Arr);
                const uniquealarm2Param1Arr = [...alarm2Param1ArrSet];

                if (uniquealarm2Param1Arr.length > 0) {
                    for (let i = 0; i < uniquealarm2Param1Arr.length; i++) {
                        $('#alarmParam1Sel').append(
                            `<option value="${uniquealarm2Param1Arr[i]}">${uniquealarm2Param1Arr[i]}</option>`
                        );
                    }
                }

                //세부항목2 disable -> able 이벤트
                alarm2Param2Arr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2Param2 = json[i].param2;
                        alarm2Param2Arr.push(alarm2Param2);
                    }
                }

                let alarm2Param1Default = $('#alarmParam1').val();
                if (alarm2Param1Default == "cpu") {
                    $('#alarmParam2Sel').attr('disabled', true);
                    $('#alarmParam2').attr('disabled', true);
                } else if (alarm2Param1 == "memory") {
                    $('#alarmParam2Sel').attr('disabled', true);
                    $('#alarmParam2').attr('disabled', true);
                }

                //중복제거 후 배열출력
                alarm2Param2ArrSet = new Set(alarm2Param2Arr);
                const uniquealarm2Param2Arr = [...alarm2Param2ArrSet];

                $('#alarmParam1Sel').on('click', function () {
                    let alarm2Param1 = $('#alarmParam1Sel').val();
                    //console.log(alarm2Param12);
                    if (alarm2Param1 == "cpu") {
                        $('#alarmParam2Sel').empty();
                        $('#alarmParam2').val("");
                        $('#alarmParam2Sel').attr('disabled', true);
                        $('#alarmParam2').attr('disabled', true);
                    }
                    else if (alarm2Param1 == "memory") {
                        $('#alarmParam2Sel').empty();
                        $('#alarmParam2').val("");
                        $('#alarmParam2Sel').attr('disabled', true);
                        $('#alarmParam2').attr('disabled', true);
                    }
                    else if (alarm2Param1 == "disk") {
                        $('#alarmParam2Sel, #alarmParam2').attr('disabled', false);
                        //disk 중 세부항목2 배열
                        const diskParm2Arr = [];
                        if (json.length > 0) {
                            for (let i = 0; i < json.length; i++) {
                                if (json[i].param1 == "disk") {
                                    const diskParam2 = json[i].param2;
                                    diskParm2Arr.push(diskParam2);
                                }
                            }
                        }
                        //중복제거 후 배열출력
                        diskParam2ArrSet = new Set(diskParm2Arr);
                        const uniquediskParm2Arr = [...diskParam2ArrSet];

                        if (uniquediskParm2Arr.length > 0) {
                            $('#alarmParam2').val("");
                            $('#alarmParam2Sel, #alarmParam2').empty();
                            for (let i = 0; i < uniquediskParm2Arr.length; i++) {
                                $('#alarmParam2Sel').append(
                                    `<option value="${uniquediskParm2Arr[i]}">${uniquediskParm2Arr[i]}</option>`
                                );
                            }
                        }
                    }
                    else if (alarm2Param1 == "network") {
                        $('#alarmParam2Sel, #alarmParam2').attr('disabled', false);
                        //disk 중 세부항목2 배열
                        const networkParm2Arr = [];
                        if (json.length > 0) {
                            for (let i = 0; i < json.length; i++) {
                                if (json[i].param1 == "network") {
                                    const networkParam2 = json[i].param2;
                                    networkParm2Arr.push(networkParam2);
                                }
                            }
                        }
                        //중복제거 후 배열출력
                        networkParam2ArrSet = new Set(networkParm2Arr);
                        const uniquenetworkParm2Arr = [...networkParam2ArrSet];

                        if (uniquenetworkParm2Arr.length > 0) {
                            $('#alarmParam2').val("");
                            $('#alarmParam2Sel, #alarmParam2').empty();
                            for (let i = 0; i < uniquenetworkParm2Arr.length; i++) {
                                $('#alarmParam2Sel').append(
                                    `<option value="${uniquenetworkParm2Arr[i]}">${uniquenetworkParm2Arr[i]}</option>`
                                );
                            }
                        }
                    }
                });

                //조건 select 출력
                alarm2bigyoArr = [];
                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        const alarm2bigyo = json[i].comparision;
                        alarm2bigyoArr.push(alarm2bigyo);
                    }
                }
                //중복제거 후 배열출력
                alarm2bigyoArrSet = new Set(alarm2bigyoArr);
                const uniquealarm2bigyoArr = [...alarm2bigyoArrSet];

                if (uniquealarm2bigyoArr.length > 0) {
                    for (let i = 0; i < uniquealarm2bigyoArr.length; i++) {
                        $('#alarmBigyoSel').append(
                            `<option value="${uniquealarm2bigyoArr[i]}">${uniquealarm2bigyoArr[i]}</option>`
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
            let alarmValue = document.getElementById("alarmValue2").value;
            let alarmSmsnoti2 = $('input:radio[name="smsnoti2"]:checked').val();
            //let alarmMsg = document.getElementById("alarmMsg").value;

            if (booleanValue) {
                console.log('변경 버튼 클릭 시 retrun값 : ' + { id: alarmId, level: alarmLevel, hostname: alarmHostname, type: alarmType, item: alarmItem, param1: alarmParam1, param2: alarmParam2, comparision: alarmBigyo, value: alarmValue, sms_noti: alarmSmsnoti2 });
            }

            $.ajax({
                url: "http://192.168.20.203:55532/monitor/alarm/" + setAlarmArr[0],
                contentType: "application/json; charset=UTF-8",
                method: "PUT",
                headers: { Authorization: "bearer " + sessionStorage.getItem("Bearer") },
                dataType: "JSON",
                data: JSON.stringify({ id: alarmId, level: alarmLevel, hostname: alarmHostname, type: alarmType, item: alarmItem, param1: alarmParam1, param2: alarmParam2, comparision: alarmBigyo, value: alarmValue, sms_noti: alarmSmsnoti2 }),
                success: function (json) {
                    let localToken = sessionStorage.getItem('Bearer');
                    //console.log('알람발생조건 변경 성공');
                    $("#alarmGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                },
                error: function (request, status, error) {
                    //console.log('알람발생조건 변경 실패');
                    let err = eval("(" + request.responseText + ")");
                    $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                    $('#alert').show();

                    if (request.status == '403') {
                        //console.log('로그아웃 성공');
                        sessionStorage.removeItem('Bearer'); //삭제
                        //sessionStorage.clear(); // 전체삭제
                        console.log(request.responseText);
                        //location.href = "../../login.html";
                    }
                }
            });
        });
    });

});