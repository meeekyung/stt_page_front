$(function () {
    let cnames = ['NO.', '이름', '아이디', '전화번호', 'sms 알림'];
    let outerwidth = $("#jqGrid").width();

    $("#jqGrid").jqGrid({
        url: "http://192.168.20.203:55532/users/list",
        datatype: "json",
        mtype: "get",
        colNames: cnames,
        colModel: [
            { name: 'id' },
            { name: 'name' },
            { name: 'id' },
            { name: 'phone_number' },
            { name: 'sms_noti' }
        ],
        width: outerwidth,
        height: 280,
        shrinkToFit: true,
        rowNum: 10,
        multiselect: true,
        pager: '#gridpager',
        rownumbers: false
    });
});
