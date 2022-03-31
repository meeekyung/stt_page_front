let booleanValue = false;

$(function () {
    let cnames = ['이름', '아이디', '전화번호', 'sms 알림'];
    let outerwidth = $("#userGrid").width();

    $("#userGrid").jqGrid({
        url: "http://192.168.20.203:55532/users/list",
        datatype: "json",
        mtype: "get",
        loadBeforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("Bearer"));
        },
        colNames: cnames,
        colModel: [
            { name: 'name', index: 'name', width: 80, align: 'center' },
            { name: 'id', index: 'id', width: 100, align: 'center' },
            { name: 'phone_number', index: 'phone_number', width: 100, align: 'center' },
            { name: 'sms_noti', index: 'sms_noti', width: 50, align: 'center' }
        ],
        width: outerwidth,
        autowidth: true,
        height: 280,
        shrinkToFit: true,
        rowNum: 10,
        multiselect: true,
        pager: '#gridpager',
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
        }, onPaging: function (pgButton) {
            let gridPage = $('#userGrid').getGridParam('page');
            let totalPage = $('#sp_1_gridpager').text();

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
                gridPage = 1;
            } else if (pgButton == 'last') {
                gridPage = totalPage;
            } else if (pgButton == 'user') {
                let nowPage = Number($('#input_gridpager .ui-pg-input').val());
                if (totalPage >= nowPage && nowPage > 0) {
                    gridPage = nowPage;
                } else {
                    $('.alert-cont').append(`<p class="alert-cont-txt">존재하지 않는 페이지입니다!</p>`);
                    $('#alert').show();
                    $('#input_gridpager .ui-pg-input').val(gridPage);
                    gridPage = gridPage;
                }
            } else if (pgButton == 'records') {
                gridPage = 1;
            }
            $('#userGrid').setGridParam('page', gridPage);
            // $('#alarmGrid').setGridParam({
            //     postDate: jqGridForm.setParam()
            // });
        }
    });

    // 체크박스 전체 선택 및 해제
    let userOnOff = true;
    $('#jqgh_userGrid_cb').on('click', function () {

        userOnOff = !userOnOff;
        if (!userOnOff) {
            $('tr[aria-selected="false"]').each(function () {
                const id = $(this).attr('id');

                $("#jqg_userGrid_" + id).parent().parent('tr').attr("aria-selected", true);
                $("#jqg_userGrid_" + id).prop("checked", true);
                $("#jqg_userGrid_" + id).parent().parent('tr').addClass('ui-state-highlight');
            });
        } else {
            $('tr[aria-selected="true"]').each(function () {
                const id = $(this).attr('id');

                $("#jqg_userGrid_" + id).parent().parent('tr').attr("aria-selected", false);
                $("#jqg_userGrid_" + id).prop("checked", false);
                $("#jqg_userGrid_" + id).parent().parent('tr').removeClass('ui-state-highlight');
            });
        }

    });

    //화면 리사이즈
    $(window).on('resize.jqGrid', function () {
        $("#userGrid").jqGrid('setGridWidth', $('.set-box').width() - 150);
    });

    //조회
    $('.userT-look').on('click', function () {
        //$("#userGrid").trigger("reloadGrid");
        $("#userGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
        //console.log('운영자 목록이 조회되었습니다.');
    });

    //삭제       
    $('.userT-delete').on('click', function () {
        // 선택된 row rowId를 구한다.
        let selRowIds = jQuery('#userGrid').jqGrid('getGridParam', 'selarrrow');

        //배열을 텍스트로 추출
        let selRowIdsJoin = selRowIds.join('%2C');

        // 선택된 row의 개수를 구한다.​
        let selRowIdsLength = selRowIds.length;

        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("삭제할 행을 선택하세요.");
            return;
        }

        // 선택된 row의 개수만큼 반복하면서 해당 id를 삭제한다.​
        for (let i = 0; i < selRowIdsLength; i++) {
            $('#userGrid').jqGrid('delRowData', selRowIds[0]);
            //alert("선택하신 행이 삭제 되었습니다.");
            $("#userGrid").trigger("reloadGrid");
        }

        $.ajax({
            url: "http://192.168.20.203:55532/users?ids=" + selRowIdsJoin,
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            method: "DELETE",
            dataType: "JSON",
            success: function (json) {
                //console.log('운영자목록 삭제 성공');
            },
            error: function (request, status, error) {
                console.log(request.status);
                if (request.status == '403') {
                    //console.log('로그아웃 성공');
                    sessionStorage.removeItem('Bearer'); //삭제
                    //sessionStorage.clear(); // 전체삭제
                    location.href = "../../login.html"
                }
            }
        });
    });

    //추가
    $('.add-area .add-btn-area .add-btn').on('click', function () {
        let userName = document.getElementById("userName").value;
        let userId = document.getElementById("userId").value;
        let userPhone = document.getElementById("userPhone").value;
        let userPw = document.getElementById("userPw").value;
        let radioSms = $('input:radio[name="smsnoti"]:checked').val();

        let addData = { name: userName, id: userId, phone_number: userPhone, sms_noti: radioSms }

        rowId = $("#userGrid").getGridParam("reccount"); // 페이징 처리 시 현 페이지의 Max RowId 값

        //입력값이 빈값일때
        if ($('.add_in>input').val() == '') {
            $('#userAddPopup').show();
            document.getElementById("userName").focus();
            $("#mainGrid").jqGrid("delRowData", rowId);
        }

        $.ajax({
            url: "http://192.168.20.203:55532/users/signup",
            contentType: "application/json; charset=UTF-8",
            method: "POST",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            dataType: "JSON",
            data: JSON.stringify({ id: userId, name: userName, password: userPw, phone_number: userPhone, sms_noti: radioSms }),
            success: function (json) {
                //console.log('운영자목록 추가 성공');
                $("#userGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                //$("#userGrid").jqGrid("addRowData", rowId + 1, addData, 'first'); // 마지막 행에 Row 추가                
            },
            error: function (request, status, error) {
                //console.log('운영자목록 추가 실패');
                let err = eval("(" + request.responseText + ")");
                $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                $('#alert').show();
            }
        });
        addReset();
    });

    $('.userT-add').on('click', function () {
        addReset();
    });

    //추가 시 input 입력값 reset
    function addReset() {
        $("#userName, #userId, #userPhone, #userPw").val("");
    }

    //변경
    $('.userT-change').on('click', function () {

        // 선택된 row rowId를 구한다.
        let selRowIds = jQuery('#userGrid').jqGrid('getGridParam', 'selarrrow');
        //​ 선택된 row가 없다면 리턴
        if (selRowIds.length == 0) {
            alert("변경할 행을 선택하세요.");
            // $('.alert-cont').append(`<p class="alert-cont-txt">변경할 행을 선택하세요.</p>`);
            // $('#alert').show();
            return;
        } else if (selRowIds.length > 1) {
            alert('변경할 1개의 행만 선택하세요');
            // $('.alert-cont').append(`<p class="alert-cont-txt">변경할 1개의 행만 선택하세요.</p>`);
            // $('#alert').show();
            $("#userGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
            window.location.reload();
        }

        let selName = $("#" + selRowIds).children('td[aria-describedby="userGrid_name"]').text();
        let selNum = $("#" + selRowIds).children('td[aria-describedby="userGrid_phone_number"]').text();


        //운영자관리 변경팝업 생성
        if (selRowIds.length == 1) {
            $("input[name='username2']").attr("placeholder", $("input[name='username2']").val()).val(selName).focus().blur();
            $("input[name='userphone2']").attr("placeholder", $("input[name='userphone2']").val()).val(selNum).focus().blur();
            $("input[name='userpw2']").val("");
            $('#userChPopup').show();
        } else {
            $('#userChPopup').hide();
        }
        //변경 버튼 클릭 시 이벤트
        $('.add-area .add-btn-area .change-btn').on('click', function () {
            let userName2 = document.getElementById("userName2").value;
            let userPhone2 = document.getElementById("userPhone2").value;
            let userPw2 = document.getElementById("userPw2").value;
            let radioSms2 = $('input:radio[name="smsnoti2"]:checked').val();

            $('#userChPopup').show();

            $.ajax({
                url: "http://192.168.20.203:55532/users/" + selRowIds + "/update",
                headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
                contentType: "application/json; charset=UTF-8",
                method: "PUT",
                dataType: "JSON",
                data: JSON.stringify({ password: userPw2, name: userName2, phone_number: userPhone2, sms_noti: radioSms2 }),
                success: function (json) {
                    //console.log('운영자목록 변경 성공');
                    $("#userGrid").setGridParam({ page: 1, datatype: "json" }).trigger("reloadGrid");
                    $('#userChPopup').hide();
                },
                error: function (request, status, error) {
                    //console.log('운영자목록 변경 실패');
                    let err = eval("(" + request.responseText + ")");
                    $('.alert-cont').append(`<p class="alert-cont-txt">${err.detail}</p>`);
                    $('#alert').show();
                }
            });
        });
    });
});