let socket2 = new WebSocket("ws://192.168.20.194:55532/ws/hardware-status");

//연결설정
socket2.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket2.send("My name is John");
};

//데이터 수신 됨
socket2.onmessage = function (json) {
    //console.log(`[message] Data received from server: ${event.data}`);

    //전체 데이터 출력
    const hwData = JSON.parse(json.data);
    console.log(hwData);

    //cpu 사용률 - 도넛형 차트
    const cpuUseData = hwData.message.cpu;
    console.log('cpu 사용률' + cpuUseData);

    const cpuChart = document.getElementById("cpuChart").getContext("2d");
    const networkChart1 = new Chart(cpuChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: '# of Votes',
                data: [100, cpuUseData],
                backgroundColor: [
                    '#ececec',
                    '#5d6778'
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
                            text: cpuUseData + '%',
                            font: {
                                size: '30',
                                family: 'Roboto ,Arial, Helvetica, sans-serif',
                                weight: 'bold'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: false,
            legend: {
                position: 'right',
                display: true,
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

    //메모리 사용률 - 도넛형 차트
    const memoryUseData = hwData.message.memory;
    console.log('메모리 사용률' + memoryUseData);

    const memoryChart = document.getElementById("memoryChart").getContext("2d");
    const networkChart2 = new Chart(memoryChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: '# of Votes',
                data: [100, memoryUseData],
                backgroundColor: [
                    '#ececec',
                    '#5d6778'
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
                            text: memoryUseData + '%',
                            font: {
                                size: '30',
                                family: 'Roboto ,Arial, Helvetica, sans-serif',
                                weight: 'bold'
                            },
                            color: '#5d6778'
                        }
                    ]
                }
            },
            animation: {
                duration: 0
            },
            responsive: false,
            legend: {
                position: 'right',
                display: true,
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

    //디스크 사용률 - 가로형 막대 차트
    console.log(hwData.message);
    const diskUseDataRoot = hwData.message.disk[0]['/'];
    console.log('디스크 사용률' + diskUseDataRoot);

    const diskUseDataHome = hwData.message.disk[1]['/boot'];
    console.log('디스크 사용률' + diskUseDataHome);

    const diskUseData = hwData.message.disk[2]['/home'];
    console.log('디스크 사용률' + diskUseData);

    const diskChart = document.getElementById("diskChart").getContext("2d");
    const networkChart3 = new Chart(diskChart, {
        type: "horizontalBar",
        data: {
            labels: ["/root", "/home", "/data"],
            datasets: [
                {
                    label: "server",
                    data: [diskUseDataRoot, diskUseDataHome, diskUseData],
                    backgroundColor: ["#5d6778", "#5d6778", "#5d6778"],
                    barPercentage: 0.5,
                },
            ],
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            min: 0,
                            max: 50,
                            stepSize: 50,
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
                        display: true,
                        ticks: {
                            min: 0,
                            max: 50,
                            stepSize: 50,
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

    //네트워크 사용률 - 가로형 막대 차트
    const networkUseData0 = hwData.message.network[0][''];
    console.log('네트워크 사용률' + networkUseData0);

    const networkUseData1 = hwData.message.network[1][''];
    console.log('네트워크 사용률' + networkUseData1);


    const networkChart = document.getElementById("networkChart").getContext("2d");
    const networkChart4 = new Chart(networkChart, {
        type: "horizontalBar",
        data: {
            labels: ["/eth0", "/eth1"],
            datasets: [
                {
                    label: "server",
                    data: [networkUseData0, networkUseData1],
                    backgroundColor: ["#5d6778", "#5d6778"],
                    barPercentage: 0.5,
                },
            ],
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            min: 0,
                            max: 1,
                            stepSize: 0.2,
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
                        display: true,
                        ticks: {
                            min: 0,
                            max: 1,
                            stepSize: 0.2,
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

//연결닫힘
socket2.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

//웹 소켓 오류
socket2.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};
