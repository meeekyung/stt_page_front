//로그인 버튼 클릭 시 화면전환
$("#introBtn").on("click", function () {

    let user_name = document.getElementById("userNames").value;
    let user_pw = document.getElementById("userPws").value;

    $.getJSON("../../config/config.json", function (json) {
        // console.log(json);
        console.log(json.urls);

        $.ajax({
            url: "http://" + json.urls + "/users/login",
            contentType: "application/json; charset=UTF-8",
            type: "POST",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("Bearer") },
            data: JSON.stringify({ id: user_name, password: user_pw }),
            success: function (data) {
                //console.log('로그인 성공');
                let jwtToken = data.token;
                let localToken = sessionStorage.getItem('Bearer');
                const dT = sessionStorage.setItem("Bearer", data.token);
                //if(jwtToken = localToken){
                location.href = "../../index.html"; //페이지 이동
                //}else{
                //  alert('이미 로그인되어 있는 계정입니다.');
                //}

            },
            error: function (data) {
                alert("아이디 또는 비밀번호 오류입니다.");
                $('#userNames').focuse();
            },
        });
    });
});

//#okBtn 엔터키에도 적용
$("#userPws").keypress(function (e) {
    if (e.which == 13) {
        $("#introBtn").click();
    }
});

// username : test111
// password : !Bcsic123

$('.logout-area').on('click', function () {
    //console.log('로그아웃 성공');
    sessionStorage.removeItem('Bearer'); //삭제
    //sessionStorage.clear(); // 전체삭제
    location.href = "../../login.html"
});