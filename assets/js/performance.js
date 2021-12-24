let socket = new WebSocket("ws://192.168.20.123:55532/ws/performance");
//연결설정
socket.onopen = function (e) {
    console.log("[open] Connection established dashboard");
    console.log("Sending to server");
    socket.send("My name is John");
};

//데이터 수신이 안될 때
document.querySelector(".request-data").innerHTML = 0;

let suceessChart = document.getElementById("suceessChart").getContext("2d");
    myChart = new Chart(suceessChart, {
        type: 'doughnut',
        data: {
            labels: ['실패     ' + 0 + '건', '성공     ' + 0 + '건'],
            datasets: [{
                label: '# of Votes',
                data: [0, 0],
                backgroundColor: [
                    '#ececec',
                    '#2e88de'
                ],
                borderWidth: 0,
                barPercentage: 0.3,
            }]
        },
        options: {
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: 0 + '%',
                            font: {
                                size: '30',
                                family: 'Roboto ,Arial, Helvetica, sans-serif'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'left',
                display: false,
                labels: {
                    fontColor: '#5d6778',
                    fontSize: 15,
                    defaultFontFamily: "Roboto",
                    boxWidth: 15,
                    padding: 15
                },
            },
            cutoutPercentage: 90,
            scales: {
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            min: 0,
                            max: 20,
                            stepSize: 20,
                        },
                    },
                ],
            },
        },
    });

document.querySelector(".length-data").innerHTML = 0;
document.querySelector(".speed-data").innerHTML = 0;

let statusChart = document.getElementById("statusChart").getContext("2d");
    channelChart1 = new Chart(statusChart, {
        type: 'doughnut',
        data: {
            labels: ['전체 채널 수        ' + 0, '사용중인 채널 수     ' + 0],
            datasets: [{
                label: '# of Votes',
                data: [0, 0],
                backgroundColor: [
                    '#ececec',
                    '#3adaba'
                ],
                borderWidth: 0,
                barPercentage: 0.3,
            }]
        },
        options: {
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: 0 + '%',
                            font: {
                                size: '35',
                                family: 'Roboto ,Arial, Helvetica, sans-serif'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right',
                display: false,
                labels: {
                    fontColor: '#5d6778',
                    fontSize: 15,
                    defaultFontFamily: "Roboto",
                    boxWidth: 15,
                },
            },
            cutoutPercentage: 90,
            scales: {
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            min: 0,
                            max: 20,
                            stepSize: 20,
                        },
                    },
                ],
            },
        },
    });

let serverChChart = document.getElementById("serverChChart").getContext("2d");
channelChart2 = new Chart(serverChChart, {
    type: "bar",
    data: {
        labels: ["REST", "gRPC", "gRPC-Streaming"],
        datasets: [
            {
                label: "전체",
                data: [0, 0, 0],
                backgroundColor: "#05b5fc",
                barPercentage: 0.3,
            },
            {
                label: "사용 중",
                data: [0, 0, 0],
                backgroundColor: "#ffbd60",
                barPercentage: 0.3,
            }
        ],
    },
    options: {
        animation: {
            duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: '#5d6778',
                fontSize: 15,
                defaultFontFamily: "Roboto",
                boxWidth: 15
            },
        },
        scales: {
            xAxes: [
                {
                    stacked: true,
                    display: true,
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        fontColor: "#5d6778",
                        fontSize: 12,
                        defaultFontFamily: "Roboto"
                    },
                    gridLines: {
                        color: '#fff',
                        lineWidth: 0.5
                    },
                },
            ],
            yAxes: [
                {
                    stacked: true,
                    display: true,
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        fontColor: "#5d6778",
                        fontSize: 12,
                        defaultFontFamily: "Roboto",
                    },
                    gridLines: {
                        color: '#fff',
                        lineWidth: 0.5
                    },
                },
            ],
        },
    },
});

//데이터 수신 됨 - 전체 데이터를 출력해줌
socket.onmessage = function (json) {
    console.log("전체 데이터 출력!");

    //전체 데이터 출력
    let boardData = JSON.parse(json.data);

    //요청건수 출력
    let requestTotal = boardData["bona-total-stt"].request_number;
    if(requestTotal == undefined){
        document.querySelector(".request-data").innerHTML = 0;
    }else{
        document.querySelector(".request-data").innerHTML = requestTotal;
    }    

    //성공률 출력 - 도넛형 차트
    let successNum = boardData["bona-total-stt"].success;
    const failPerNum = boardData["bona-total-stt"].fail;
    let bunmo = (successNum+failPerNum) ? (successNum+failPerNum) : 1;
    //건수가 0일 때(삼항연사자로 수정할 것)
    // if (bunmo == 0){
    //     requestTotal = 1;
    //     successNum = 0;

    // }
    const successPer = (boardData["bona-total-stt"].success / bunmo * 100).toFixed(0);
    const failPer = (boardData["bona-total-stt"].fail / bunmo * 100).toFixed(0);

    document.querySelector("#legendNum1").innerHTML = successNum;
    document.querySelector("#legendNum2").innerHTML = failPerNum;

    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
    $("#suceessChart").remove();
    $(".success-chart").append('<canvas id="suceessChart"></canvas>');

    let suceessChart = document.getElementById("suceessChart").getContext("2d");
    myChart = new Chart(suceessChart, {
        type: 'doughnut',
        data: {
            labels: ['실패     ' + failPer + '건', '성공     ' + successPer + '건'],
            datasets: [{
                label: '# of Votes',
                data: [failPerNum, successNum],
                backgroundColor: [
                    '#ececec',
                    '#2e88de'
                ],
                borderWidth: 0,
                barPercentage: 0.3,
            }]
        },
        options: {
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: successPer + '%',
                            font: {
                                size: '30',
                                family: 'Roboto ,Arial, Helvetica, sans-serif'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'left',
                display: false,
                labels: {
                    fontColor: '#5d6778',
                    fontSize: 15,
                    defaultFontFamily: "Roboto",
                    boxWidth: 15,
                    padding: 15
                },
            },
            cutoutPercentage: 90,
            scales: {
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            min: 0,
                            max: 20,
                            stepSize: 20,
                        },
                    },
                ],
            },
        },
    });

    //총 음성길이 출력
    const audioLength = boardData["bona-total-stt"].audio_len / 60;
    document.querySelector(".length-data").innerHTML = audioLength.toFixed(1);

    //평균처리 속도 출력
    const averageSpeed = boardData["bona-total-stt"].average_speed;
    document.querySelector(".speed-data").innerHTML = averageSpeed.toFixed(2); //소수점 첫째자리까지

    //채널상태 - 전체(도넛형 차트)
    const totalCh = boardData["bona-total-stt"].channels.total;
    const useCh = boardData["bona-total-stt"].channels.running;
    const useChPer = (boardData["bona-total-stt"].channels.running / totalCh * 100).toFixed(0);

    document.querySelector("#legendNum3").innerHTML = totalCh;
    document.querySelector("#legendNum4").innerHTML = useCh;

    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
    $("#statusChart").remove();
    $(".status-area").append('<canvas id="statusChart"></canvas>');

    let statusChart = document.getElementById("statusChart").getContext("2d");
    channelChart1 = new Chart(statusChart, {
        type: 'doughnut',
        data: {
            labels: ['전체 채널 수        ' + totalCh, '사용중인 채널 수     ' + useCh],
            datasets: [{
                label: '# of Votes',
                data: [100 - useChPer, useChPer],
                backgroundColor: [
                    '#ececec',
                    '#3adaba'
                ],
                borderWidth: 0,
                barPercentage: 0.3,
            }]
        },
        options: {
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: useChPer + '%',
                            font: {
                                size: '35',
                                family: 'Roboto ,Arial, Helvetica, sans-serif'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right',
                display: false,
                labels: {
                    fontColor: '#5d6778',
                    fontSize: 15,
                    defaultFontFamily: "Roboto",
                    boxWidth: 15,
                },
            },
            cutoutPercentage: 90,
            scales: {
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            min: 0,
                            max: 20,
                            stepSize: 20,
                        },
                    },
                ],
            },
        },
    });

    //채널상태 - 서버별(누적형 막대차트)
    const restTotal = boardData["bona-total-stt"].channels.rest.total;
    const grpcTotal = boardData["bona-total-stt"].channels.grpc.total;
    const grpcStreamTotal = boardData["bona-total-stt"].channels.grpc_stream.total;

    const restRunning = boardData["bona-total-stt"].channels.rest.running;
    const grpcRunning = boardData["bona-total-stt"].channels.grpc.running;
    const grpcStreamRunning = boardData["bona-total-stt"].channels.grpc_stream.running;

    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
    $("#serverChChart").remove();
    $(".severchannel-area").append('<canvas id="serverChChart"></canvas>');

    let serverChChart = document.getElementById("serverChChart").getContext("2d");
    channelChart2 = new Chart(serverChChart, {
        type: "bar",
        data: {
            labels: ["REST", "gRPC", "gRPC-Streaming"],
            datasets: [
                {
                    label: "사용 중",
                    data: [restRunning, grpcRunning, grpcStreamRunning],
                    backgroundColor: "#3adaba",
                    barPercentage: 0.3,
                },
                {
                    label: "미사용",
                    data: [restTotal - restRunning, grpcTotal - grpcRunning, grpcStreamTotal - grpcStreamRunning],
                    backgroundColor: "#ececec",
                    barPercentage: 0.3,
                }                
            ],
        },
        options: {
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
                position: 'right',
                labels: {
                    fontColor: '#5d6778',
                    fontSize: 15,
                    defaultFontFamily: "Roboto",
                    boxWidth: 15
                },
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        display: true,
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20,
                            fontColor: "#5d6778",
                            fontSize: 12,
                            defaultFontFamily: "Roboto"
                        },
                        gridLines: {
                            color: '#fff',
                            lineWidth: 0.5
                        },
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        display: true,
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20,
                            fontColor: "#5d6778",
                            fontSize: 12,
                            defaultFontFamily: "Roboto",
                        },
                        gridLines: {
                            color: '#fff',
                            lineWidth: 0.5
                        },
                    },
                ],
            },
        },
    });
}

//전체 tab 클릭시 데이터 변환 이벤트
$('#allTab').click(function () {

    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket.onmessage = function (json) {
        //console.log(`[message] Data received from server: ${event.data}`);
        console.log('socketTotal 연결 성공!');

        //전체 데이터 출력
        const boardData = JSON.parse(json.data);

        //요청건수 출력
        const requestTotal = boardData["bona-total-stt"].request_number;
        document.querySelector(".request-data").innerHTML = requestTotal;

        //성공률 출력 - 도넛형 차트
        const successNum = boardData["bona-total-stt"].success;
        const failPerNum = boardData["bona-total-stt"].fail;
        let bunmo = (successNum+failPerNum) ? (successNum+failPerNum) : 1;

        const successPer = (boardData["bona-total-stt"].success / bunmo * 100).toFixed(0);
        const failPer = (boardData["bona-total-stt"].fail / bunmo * 100).toFixed(0);

        document.querySelector("#legendNum1").innerHTML = successNum;
        document.querySelector("#legendNum2").innerHTML = failPerNum;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#suceessChart").remove();
        $(".success-chart").append('<canvas id="suceessChart"></canvas>');

        const suceessChart = document.getElementById("suceessChart").getContext("2d");
        myChart = new Chart(suceessChart, {
            type: 'doughnut',
            data: {
                labels: ['실패     ' + failPer + '건', '성공     ' + successPer + '건'],
                datasets: [{
                    label: '# of Votes',
                    data: [failPerNum, successNum],
                    backgroundColor: [
                        '#ececec',
                        '#2e88de'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: successPer + '%',
                                font: {
                                    size: '30',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15,
                        padding: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //총 음성길이 출력
        const audioLength = boardData["bona-total-stt"].audio_len / 60;
        document.querySelector(".length-data").innerHTML = audioLength.toFixed(1);

        //평균처리 속도 출력
        const averageSpeed = boardData["bona-total-stt"].average_speed;
        document.querySelector(".speed-data").innerHTML = averageSpeed.toFixed(1); //소수점 첫째자리까지

        //채널상태 - 전체(도넛형 차트)
        const totalCh = boardData["bona-total-stt"].channels.total;
        const useCh = boardData["bona-total-stt"].channels.running;
        const useChPer = boardData["bona-total-stt"].channels.running / 100;

        document.querySelector("#legendNum3").innerHTML = totalCh;
        document.querySelector("#legendNum4").innerHTML = useCh;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#statusChart").remove();
        $(".status-area").append('<canvas id="statusChart"></canvas>');

        const statusChart = document.getElementById("statusChart").getContext("2d");
        channelChart1 = new Chart(statusChart, {
            type: 'doughnut',
            data: {
                labels: ['전체 채널 수        ' + totalCh, '사용중인 채널 수     ' + useCh],
                datasets: [{
                    label: '# of Votes',
                    data: [totalCh, useCh],
                    backgroundColor: [
                        '#ececec',
                        '#3adaba'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: useChPer + '%',
                                font: {
                                    size: '35',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif',
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //채널상태 - 서버별(누적형 막대차트)
        const restTotal = boardData["bona-total-stt"].channels.rest.total;
        const grpcTotal = boardData["bona-total-stt"].channels.grpc.total;
        const grpcStreamTotal = boardData["bona-total-stt"].channels.grpc_stream.total;

        const restRunning = boardData["bona-total-stt"].channels.rest.running;
        const grpcRunning = boardData["bona-total-stt"].channels.grpc.running;
        const grpcStreamRunning = boardData["bona-total-stt"].channels.grpc_stream.running;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#serverChChart").remove();
        $(".severchannel-area").append('<canvas id="serverChChart"></canvas>');

        const serverChChart = document.getElementById("serverChChart").getContext("2d");
        channelChart2 = new Chart(serverChChart, {
            type: "bar",
            data: {
                labels: ["REST", "gRPC", "gRPC-Streaming"],
                datasets: [                    
                    {
                        label: "사용 중",
                        data: [restRunning, grpcRunning, grpcStreamRunning],
                        backgroundColor: "#3adaba",
                        barPercentage: 0.3,
                    },
                    {
                        label: "미사용",
                        data: [restTotal - restRunning, grpcTotal - grpcRunning, grpcStreamTotal - grpcStreamRunning],
                        backgroundColor: "#05b5fc",
                        barPercentage: 0.3,
                    }
                ],
            },
            options: {
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto"
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto",
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                },
            },
        });
    };
});

//STT0 tab 클릭시 데이터 변환 이벤트
$(document).on('click', '#stt0', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket.onmessage = function (json) {
        console.log('socketStt1 연결 성공!');

        //stt1 데이터 출력
        const sttData1 = JSON.parse(json.data);

        //요청건수 출력
        const requestTotalStt1 = sttData1["bona-stt1"].request_number;
        document.querySelector(".request-data").innerHTML = requestTotalStt1;

        //성공률 출력 - 도넛형 차트
        const successNumStt1 = sttData1["bona-stt1"].success;
        const failPerNumStt1 = sttData1["bona-stt1"].fail;
        let bunmo = (successNumStt1+failPerNumStt1) ? (successNumStt1+failPerNumStt1) : 1;

        const successPerStt1 = (sttData1["bona-stt1"].success / bunmo * 100).toFixed(0);
        const failPerStt1 = (sttData1["bona-stt1"].fail / bunmo * 100).toFixed(0);

        document.querySelector("#legendNum1").innerHTML = successNumStt1;
        document.querySelector("#legendNum2").innerHTML = failPerNumStt1;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#suceessChart").remove();
        $(".success-chart").append('<canvas id="suceessChart"></canvas>');

        const suceessChart = document.getElementById("suceessChart").getContext("2d");
        myChart = new Chart(suceessChart, {
            type: 'doughnut',
            data: {
                labels: ['실패     ' + failPerStt1 + '건', '성공     ' + successPerStt1 + '건'],
                datasets: [{
                    label: '# of Votes',
                    data: [failPerNumStt1, successNumStt1],
                    backgroundColor: [
                        '#ececec',
                        '#2e88de'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: successPerStt1 + '%',
                                font: {
                                    size: '30',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15,
                        padding: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //총 음성길이 출력
        const audioLengthStt1 = sttData1["bona-stt1"].audio_len / 60;
        document.querySelector(".length-data").innerHTML = audioLengthStt1.toFixed(1);

        //평균처리 속도 출력
        const averageSpeedStt1 = sttData1["bona-stt1"].average_speed;
        document.querySelector(".speed-data").innerHTML = averageSpeedStt1.toFixed(1); //소수점 첫째자리까지

        //채널상태 - 전체(도넛형 차트)
        const totalCh = sttData1["bona-stt1"].channels.total;
        const useCh = sttData1["bona-stt1"].channels.running;
        const useChPer = sttData1["bona-stt1"].channels.running / 100;

        document.querySelector("#legendNum3").innerHTML = totalCh;
        document.querySelector("#legendNum4").innerHTML = useCh;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#statusChart").remove();
        $(".status-area").append('<canvas id="statusChart"></canvas>');

        const statusChart = document.getElementById("statusChart").getContext("2d");
        channelChart1 = new Chart(statusChart, {
            type: 'doughnut',
            data: {
                labels: ['전체 채널 수        ' + totalCh, '사용중인 채널 수     ' + useCh],
                datasets: [{
                    label: '# of Votes',
                    data: [totalCh, useCh],
                    backgroundColor: [
                        '#ececec',
                        '#3adaba'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: useChPer + '%',
                                font: {
                                    size: '35',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //채널상태 - 서버별(누적형 막대차트)
        const restTotalStt1 = sttData1["bona-stt1"].channels.rest.total;
        const grpcTotalStt1 = sttData1["bona-stt1"].channels.grpc.total;
        const grpcStreamTotalStt1 = sttData1["bona-stt1"].channels.grpc_stream.total;

        const restRunningStt1 = sttData1["bona-stt1"].channels.rest.running;
        const grpcRunningStt1 = sttData1["bona-stt1"].channels.grpc.running;
        const grpcStreamRunningStt1 = sttData1["bona-stt1"].channels.grpc_stream.running;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#serverChChart").remove();
        $(".severchannel-area").append('<canvas id="serverChChart"></canvas>');

        const serverChChart = document.getElementById("serverChChart").getContext("2d");
        channelChart2 = new Chart(serverChChart, {
            type: "bar",
            data: {
                labels: ["REST", "gRPC", "gRPC-Streaming"],
                datasets: [
                    {
                        label: "사용 중",
                        data: [restRunningStt1, grpcRunningStt1, grpcStreamRunningStt1],
                        backgroundColor: "#3adaba",
                        barPercentage: 0.3,
                    },
                    {
                        label: "미사용",
                        data: [restTotalStt1 - restRunningStt1, grpcTotalStt1 - grpcRunningStt1, grpcStreamTotalStt1 - grpcStreamRunningStt1],
                        backgroundColor: "#05b5fc",
                        barPercentage: 0.3,
                    }                    
                ],
            },
            options: {
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto"
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto",
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                },
            },
        });
    };
});

//STT1 tab 클릭시 데이터 변환 이벤트
$(document).on('click', '#stt1', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket.onmessage = function (json) {
        console.log('socketStt2 연결 성공!');

        //stt2 데이터 출력
        const sttData2 = JSON.parse(json.data);

        //요청건수 출력
        const requestTotalStt2 = sttData2["bona-stt2"].request_number;
        document.querySelector(".request-data").innerHTML = requestTotalStt2;

        //성공률 출력 - 도넛형 차트
        const successNumStt2 = sttData2["bona-stt2"].success;
        const failPerNumStt2 = sttData2["bona-stt2"].fail;
        let bunmo = (successNumStt2+failPerNumStt2) ? (successNumStt2+failPerNumStt2) : 1;

        const successPerStt2 = (sttData2["bona-stt2"].success / bunmo * 100).toFixed(0);
        const failPerStt2 = (sttData2["bona-stt2"].fail / bunmo * 100).toFixed(0);

        document.querySelector("#legendNum1").innerHTML = successNumStt2;
        document.querySelector("#legendNum2").innerHTML = failPerNumStt2;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#suceessChart").remove();
        $(".success-chart").append('<canvas id="suceessChart"></canvas>');

        const suceessChart = document.getElementById("suceessChart").getContext("2d");
        myChart = new Chart(suceessChart, {
            type: 'doughnut',
            data: {
                labels: ['실패     ' + failPerStt2 + '건', '성공     ' + successPerStt2 + '건'],
                datasets: [{
                    label: '# of Votes',
                    data: [failPerNumStt2, successNumStt2],
                    backgroundColor: [
                        '#ececec',
                        '#2e88de'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: successPerStt2 + '%',
                                font: {
                                    size: '30',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15,
                        padding: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //총 음성길이 출력
        const audioLengthStt2 = sttData2["bona-stt2"].audio_len / 60;
        document.querySelector(".length-data").innerHTML = audioLengthStt2.toFixed(1);

        //평균처리 속도 출력
        const averageSpeedStt2 = sttData2["bona-stt2"].average_speed;
        document.querySelector(".speed-data").innerHTML = averageSpeedStt2.toFixed(1); //소수점 첫째자리까지

        //채널상태 - 전체(도넛형 차트)
        const totalCh = sttData2["bona-stt2"].channels.total;
        const useCh = sttData2["bona-stt2"].channels.running;
        const useChPer = sttData2["bona-stt2"].channels.running / 100;

        document.querySelector("#legendNum3").innerHTML = totalCh;
        document.querySelector("#legendNum4").innerHTML = useCh;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#statusChart").remove();
        $(".status-area").append('<canvas id="statusChart"></canvas>');

        statusChart = document.getElementById("statusChart").getContext("2d");
        channelChart1 = new Chart(statusChart, {
            type: 'doughnut',
            data: {
                labels: ['전체 채널 수        ' + totalCh, '사용중인 채널 수     ' + useCh],
                datasets: [{
                    label: '# of Votes',
                    data: [totalCh, useCh],
                    backgroundColor: [
                        '#ececec',
                        '#3adaba'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: useChPer + '%',
                                font: {
                                    size: '35',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //채널상태 - 서버별(누적형 막대차트)
        const restTotalStt2 = sttData2["bona-stt2"].channels.rest.total;
        const grpcTotalStt2 = sttData2["bona-stt2"].channels.grpc.total;
        const grpcStreamTotalStt2 = sttData2["bona-stt2"].channels.grpc_stream.total;

        const restRunningStt2 = sttData2["bona-stt2"].channels.rest.running;
        const grpcRunningStt2 = sttData2["bona-stt2"].channels.grpc.running;
        const grpcStreamRunningStt2 = sttData2["bona-stt2"].channels.grpc_stream.running;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#serverChChart").remove();
        $(".severchannel-area").append('<canvas id="serverChChart"></canvas>');

        const serverChChart = document.getElementById("serverChChart").getContext("2d");
        channelChart2 = new Chart(serverChChart, {
            type: "bar",
            data: {
                labels: ["REST", "gRPC", "gRPC-Streaming"],
                datasets: [
                    {
                        label: "사용 중",
                        data: [restRunningStt2, grpcRunningStt2, grpcStreamRunningStt2],
                        backgroundColor: "#3adaba",
                        barPercentage: 0.3,
                    },
                    {
                        label: "미사용",
                        data: [restTotalStt2 - restRunningStt2, grpcTotalStt2 - grpcRunningStt2, grpcStreamTotalStt2 - grpcStreamRunningStt2],
                        backgroundColor: "#05b5fc",
                        barPercentage: 0.3,
                    }                    
                ],
            },
            options: {
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto"
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto",
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                },
            },
        });
    };
});

//STT2 tab 클릭시 데이터 변환 이벤트
$(document).on('click', '#stt2', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket.onmessage = function (json) {
        console.log('bona-stt3 연결 성공!');

        //stt1 데이터 출력
        const sttData3 = JSON.parse(json.data);

        //요청건수 출력
        const requestTotalSt3 = sttData3["bona-stt3"].request_number;
        document.querySelector(".request-data").innerHTML = requestTotalStt1;

        //성공률 출력 - 도넛형 차트
        const successNumStt3 = sttData3["bona-stt3"].success;
        const failPerNumStt3 = sttData3["bona-stt3"].fail;
        let bunmo = (successNumStt3+failPerNumStt3) ? (successNumStt3+failPerNumStt3) : 1;

        const successPerStt3 = (sttData3["bona-stt3"].success / bunmo * 100).toFixed(0);
        const failPerStt3 = (sttData3["bona-stt3"].fail / bunmo * 100).toFixed(0);

        document.querySelector("#legendNum1").innerHTML = successNumStt3;
        document.querySelector("#legendNum2").innerHTML = failPerNumStt3;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#suceessChart").remove();
        $(".success-chart").append('<canvas id="suceessChart"></canvas>');

        const suceessChart = document.getElementById("suceessChart").getContext("2d");
        myChart = new Chart(suceessChart, {
            type: 'doughnut',
            data: {
                labels: ['실패     ' + failPerStt3 + '건', '성공     ' + successPerStt3 + '건'],
                datasets: [{
                    label: '# of Votes',
                    data: [failPerNumStt3, successNumStt3],
                    backgroundColor: [
                        '#ececec',
                        '#2e88de'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: successPerStt3 + '%',
                                font: {
                                    size: '30',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15,
                        padding: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //총 음성길이 출력
        const audioLengthStt3 = sttData3["bona-stt1"].audio_len / 60;
        document.querySelector(".length-data").innerHTML = audioLengthStt3.toFixed(1);

        //평균처리 속도 출력
        const averageSpeedStt3 = sttData3["bona-stt1"].average_speed;
        document.querySelector(".speed-data").innerHTML = averageSpeedStt3.toFixed(1); //소수점 첫째자리까지

        //채널상태 - 전체(도넛형 차트)
        const totalCh = sttData3["bona-stt3"].channels.total;
        const useCh = sttData3["bona-stt3"].channels.running;
        const useChPer = sttData3["bona-stt3"].channels.running / 100;

        document.querySelector("#legendNum3").innerHTML = totalCh;
        document.querySelector("#legendNum4").innerHTML = useCh;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#statusChart").remove();
        $(".status-area").append('<canvas id="statusChart"></canvas>');

        const statusChart = document.getElementById("statusChart").getContext("2d");
        channelChart1 = new Chart(statusChart, {
            type: 'doughnut',
            data: {
                labels: ['전체 채널 수        ' + totalCh, '사용중인 채널 수     ' + useCh],
                datasets: [{
                    label: '# of Votes',
                    data: [totalCh, useCh],
                    backgroundColor: [
                        '#ececec',
                        '#3adaba'
                    ],
                    borderWidth: 0,
                    barPercentage: 0.3,
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: useChPer + '%',
                                font: {
                                    size: '35',
                                    family: 'Roboto ,Arial, Helvetica, sans-serif'
                                },
                                color: '#5d6778'
                            }
                        ]
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    display: false,
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                cutoutPercentage: 90,
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: 20,
                                stepSize: 20,
                            },
                        },
                    ],
                },
            },
        });

        //채널상태 - 서버별(누적형 막대차트)
        const restTotalStt3 = sttData3["bona-stt1"].channels.rest.total;
        const grpcTotalStt3 = sttData3["bona-stt1"].channels.grpc.total;
        const grpcStreamTotalStt3 = sttData3["bona-stt1"].channels.grpc_stream.total;

        const restRunningStt3 = sttData3["bona-stt1"].channels.rest.running;
        const grpcRunningStt3 = sttData3["bona-stt1"].channels.grpc.running;
        const grpcStreamRunningStt3 = sttData3["bona-stt1"].channels.grpc_stream.running;

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#serverChChart").remove();
        $(".severchannel-area").append('<canvas id="serverChChart"></canvas>');

        const serverChChart = document.getElementById("serverChChart").getContext("2d");
        channelChart2 = new Chart(serverChChart, {
            type: "bar",
            data: {
                labels: ["REST", "gRPC", "gRPC-Streaming"],
                datasets: [
                    {
                        label: "사용 중",
                        data: [restRunningStt3, grpcRunningStt3, grpcStreamRunningStt3],
                        backgroundColor: "#3adaba",
                        barPercentage: 0.3,
                    },
                    {
                        label: "미사용",
                        data: [restTotalStt3 - restRunningStt3, grpcTotalStt3 - grpcRunningStt3, grpcStreamTotalStt3 - grpcStreamRunningStt3],
                        backgroundColor: "#05b5fc",
                        barPercentage: 0.3,
                    },
                    
                ],
            },
            options: {
                animation: {
                    duration: 0
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#5d6778',
                        fontSize: 15,
                        defaultFontFamily: "Roboto",
                        boxWidth: 15
                    },
                },
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto"
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            display: true,
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20,
                                fontColor: "#5d6778",
                                fontSize: 12,
                                defaultFontFamily: "Roboto",
                            },
                            gridLines: {
                                color: '#fff',
                                lineWidth: 0.5
                            },
                        },
                    ],
                },
            },
        });
    };
});

//연결닫힘
socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

//웹 소켓 오류
socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};
