function startSocket() {
    let socket = new WebSocket("ws://192.168.20.194:55532/ws/performance");

    let performanceData;

    //연결설정
    socket.onopen = function (e) {
        socket.send("[open] Connection established dashboard");
    };

    //데이터 수신이 안될 때
    function earlySet() {
        document.querySelector(".request-data").innerHTML = 0;

        let suceessChart = document.getElementById("suceessChart").getContext("2d");
        myChart = new Chart(suceessChart, {
            type: 'doughnut',
            data: {
                labels: ['실패', '성공'],
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
    }

    //데이터 수신 됨 - 전체 데이터를 출력해줌
    socket.onmessage = function (json) {
        //전체 데이터 출력
        let boardData = JSON.parse(json.data);

        //json key 가져오기
        const dataKey = Object.keys(boardData);

        //let stt1 = dataKey[0];
        let stt2 = dataKey[0];
        let total = dataKey[1];

        if (performanceData == stt2) {
            earlySet();
            // $(this).addClass('tab-on').siblings().removeClass('tab-on');

            //stt2 데이터 출력
            const boardData2 = JSON.parse(json.data);

            //요청건수 출력
            const requestTotalStt2 = boardData2["bona-stt2"].request_number;
            document.querySelector(".request-data").innerHTML = requestTotalStt2;

            //성공률 출력 - 도넛형 차트
            const successNumStt2 = boardData2["bona-stt2"].success;
            const failPerNumStt2 = boardData2["bona-stt2"].fail;
            let bunmo = (successNumStt2 + failPerNumStt2) ? (successNumStt2 + failPerNumStt2) : 1;

            const successPerStt2 = Math.floor(boardData["bona-stt2"].success / bunmo * 100);
            const failPerStt2 = (boardData2["bona-stt2"].fail / bunmo * 100).toFixed(0);

            document.querySelector("#legendNum1").innerHTML = successNumStt2;
            document.querySelector("#legendNum2").innerHTML = failPerNumStt2;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#suceessChart").remove();
            $(".success-chart").empty();
            $(".success-chart").append('<canvas id="suceessChart"></canvas>');

            const suceessChart = document.getElementById("suceessChart").getContext("2d");
            myChart = new Chart(suceessChart, {
                type: 'doughnut',
                data: {
                    labels: ['실패', '성공'],
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
            const audioLengthStt2 = boardData2["bona-stt2"].audio_len / 60;
            document.querySelector(".length-data").innerHTML = audioLengthStt2.toFixed(1);

            //평균처리 속도 출력
            const averageSpeedStt2 = boardData2["bona-stt2"].average_speed;
            document.querySelector(".speed-data").innerHTML = averageSpeedStt2.toFixed(1); //소수점 첫째자리까지

            //채널상태 - 전체(도넛형 차트)
            const totalCh = boardData2["bona-stt2"].channels.total;
            const useCh = boardData2["bona-stt2"].channels.running;
            const useChPer = ((boardData["bona-stt2"].channels.running / totalCh) * 100).toFixed(0);;

            document.querySelector("#legendNum3").innerHTML = totalCh;
            document.querySelector("#legendNum4").innerHTML = useCh;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#statusChart").remove();
            $('.status-area').empty();
            $(".status-area").append('<canvas id="statusChart"></canvas>');

            statusChart = document.getElementById("statusChart").getContext("2d");
            channelChart1 = new Chart(statusChart, {
                type: 'doughnut',
                data: {
                    labels: ['전체 채널 수', '사용중인 채널 수'],
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
            const restTotalStt2 = boardData2["bona-stt2"].channels.rest.total;
            const grpcTotalStt2 = boardData2["bona-stt2"].channels.grpc.total;
            const grpcStreamTotalStt2 = boardData2["bona-stt2"].channels.grpc_stream.total;

            const restRunningStt2 = boardData2["bona-stt2"].channels.rest.running;
            const grpcRunningStt2 = boardData2["bona-stt2"].channels.grpc.running;
            const grpcStreamRunningStt2 = boardData2["bona-stt2"].channels.grpc_stream.running;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#serverChChart").remove();
            $(".severchannel-area").empty();
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
        else if (performanceData == total) {
            earlySet();
            // $(this).addClass('tab-on').siblings().removeClass('tab-on');
            //전체 데이터 출력
            const boardData = JSON.parse(json.data);

            //요청건수 출력
            const requestTotal = boardData["bona-total-stt"].request_number;
            document.querySelector(".request-data").innerHTML = requestTotal;

            //성공률 출력 - 도넛형 차트
            const successNum = boardData["bona-total-stt"].success;
            const failPerNum = boardData["bona-total-stt"].fail;
            let bunmo = (successNum + failPerNum) ? (successNum + failPerNum) : 1;

            const successPer = Math.floor(boardData["bona-total-stt"].success / bunmo * 100);
            const failPer = (boardData["bona-total-stt"].fail / bunmo * 100).toFixed(0);

            document.querySelector("#legendNum1").innerHTML = successNum;
            document.querySelector("#legendNum2").innerHTML = failPerNum;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#suceessChart").remove();
            $(".success-chart").empty();
            $(".success-chart").append('<canvas id="suceessChart"></canvas>');

            const suceessChart = document.getElementById("suceessChart").getContext("2d");
            myChart = new Chart(suceessChart, {
                type: 'doughnut',
                data: {
                    labels: ['실패', '성공'],
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
            const useChPer = ((boardData["bona-total-stt"].channels.running / totalCh) * 100).toFixed(0);;

            document.querySelector("#legendNum3").innerHTML = totalCh;
            document.querySelector("#legendNum4").innerHTML = useCh;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#statusChart").remove();
            $('.status-area').empty();
            $(".status-area").append('<canvas id="statusChart"></canvas>');

            const statusChart = document.getElementById("statusChart").getContext("2d");
            channelChart1 = new Chart(statusChart, {
                type: 'doughnut',
                data: {
                    labels: ['전체 채널 수 ', '사용중인 채널 수'],
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
            $(".severchannel-area").empty();
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
        else {
            //요청건수 출력
            let requestTotal = boardData["bona-total-stt"].request_number;
            if (requestTotal == undefined) {
                document.querySelector(".request-data").innerHTML = 0;
            } else {
                document.querySelector(".request-data").innerHTML = requestTotal;
            }

            //성공률 출력 - 도넛형 차트
            let successNum = boardData["bona-total-stt"].success;
            const failPerNum = boardData["bona-total-stt"].fail;
            let bunmo = (successNum + failPerNum) ? (successNum + failPerNum) : 1;

            const successPer = Math.floor(boardData["bona-total-stt"].success / bunmo * 100);
            const failPer = (boardData["bona-total-stt"].fail / bunmo * 100).toFixed(0);

            document.querySelector("#legendNum1").innerHTML = successNum;
            document.querySelector("#legendNum2").innerHTML = failPerNum;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#suceessChart").remove();
            $(".success-chart").empty();
            $(".success-chart").append('<canvas id="suceessChart"></canvas>');

            let suceessChart = document.getElementById("suceessChart").getContext("2d");
            myChart = new Chart(suceessChart, {
                type: 'doughnut',
                data: {
                    labels: ['실패', '성공'],
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
            const useChPer = ((boardData["bona-total-stt"].channels.running / totalCh) * 100).toFixed(0);

            document.querySelector("#legendNum3").innerHTML = totalCh;
            document.querySelector("#legendNum4").innerHTML = useCh;

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#statusChart").remove();
            $('.status-area').empty();
            $(".status-area").append('<canvas id="statusChart"></canvas>');

            let statusChart = document.getElementById("statusChart").getContext("2d");
            channelChart1 = new Chart(statusChart, {
                type: 'doughnut',
                data: {
                    labels: ['전체 채널 수', '사용중인 채널 수'],
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
            $(".severchannel-area").empty();
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
    }

    //전체탭 클릭 시 total 데이터가 출력되야함
    $(document).on('click', '#allTab', function (e) {
        e.preventDefault();
        performanceData = "bona-total-stt";
    });

    //#stt0탭 클릭 시 stt1 데이터가 출력되야함
    $(document).on('click', '#stt0', function (e) {
        e.preventDefault();
        let tabTxt = $(this).text();
        performanceData = tabTxt;
    });

    //#stt1탭 클릭 시 stt2 데이터가 출력되야함
    // $(document).on('click', '#stt1', function (e) {
    //     e.preventDefault();

    //     performanceData = "bona-stt2";
    // });

    //연결닫힘
    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');

            socket = null
            setTimeout(startSocket, 5000);
        }
    };

    //웹 소켓 오류
    socket.onerror = function (error) {
        console.log(`[error] ${error.message}`);
    };

}
startSocket();