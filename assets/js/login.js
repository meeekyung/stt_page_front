//로그인 버튼 클릭 시 화면전환
$("#introBtn").on("click", function () {

    var user_name = document.getElementById("userName").value;
    var user_pw = document.getElementById("userPw").value;

    $.ajax({
        url: "http://192.168.20.194:55532/users/login",
        contentType: "application/json; charset=UTF-8",
        type: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: JSON.stringify({ id: user_name, password: user_pw }),
        success: function (data) {
            console.log('로그인 성공');
            let jwtToken = data.token;
            let localToken = localStorage.getItem('Bearer');
            const dT = localStorage.setItem("Bearer", data.token);
            //if(jwtToken = localToken){
            location.href = "../../index.html"; //페이지 이동
            //}else{
            //  alert('이미 로그인되어 있는 계정입니다.');
            //}

        },
        error: function (data) {
            alert("아이디 또는 비밀번호 오류입니다.")
        },
    });
});

//#okBtn 엔터키에도 적용
$("#userPw").keypress(function (e) {
    if (e.which == 13) {
        $("#introBtn").click();
    }
});

// username : test111
// password : !Bcsic123

$('.logout-area').on('click', function () {
    console.log('로그아웃 성공');
    localStorage.removeItem('Bearer'); //삭제
    //localStorage.clear(); // 전체삭제
    location.href = "../../login.html"
});