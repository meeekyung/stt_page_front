const url123 = "192.168.20.123:55532";
const url124 = "192.168.20.124:55532";
const url194 = "192.168.20.194:55532";

function onSet() {
    const cpuChart = document.getElementById("cpuChart").getContext("2d");
    const networkChart1 = new Chart(cpuChart, {
        type: 'doughnut',
        data: {
            labels: ['미사용률', '사용률'],
            datasets: [{
                data: [0, 0],
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
                            text: 0 + '%',
                            font: {
                                size: '28',
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

    const memoryChart = document.getElementById("memoryChart").getContext("2d");
    const networkChart2 = new Chart(memoryChart, {
        type: 'doughnut',
        data: {
            labels: ['미사용률', '사용률'],
            datasets: [{
                data: [0, 0],
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
                            text: 0 + '%',
                            font: {
                                size: '28',
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

    const diskChart = document.getElementById("diskChart").getContext("2d");
    const networkChart3 = new Chart(diskChart, {
        type: "horizontalBar",
        data: {
            labels: ["undefind"],
            datasets: [
                {
                    data: [0],
                    backgroundColor: "#5d6778",
                    barPercentage: 0.5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

    const networkChart = document.getElementById("networkChart").getContext("2d");
    const networkChart4 = new Chart(networkChart, {
        type: "horizontalBar",
        data: {
            labels: ["undefind"],
            datasets: [
                {
                    data: [0],
                    backgroundColor: "#5d6778",
                    barPercentage: 0.5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            min: 0,
                            max: 10,
                            stepSize: 2,
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
                            max: 10,
                            stepSize: 2,
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

onSet();

function startSocket2() {
    let socket2 = new WebSocket("ws://192.168.20.203:55532/ws/hardware-status");

    let hardwareData;

    let flag;

    //연결설정
    socket2.onopen = function (e) {
        socket2.send("[open] Connection established hwdata");
    };


    //데이터 수신 됨
    socket2.onmessage = function (json) {
        'use strict';
        //전체 데이터 출력
        let hwData = JSON.parse(json.data);
        let hwName = hwData.hostname;

        if (hardwareData == hwName) {
            'use strict';
            flag = true;
            onSet();

            //cpu 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#cpuChart").remove();
            $('.cpu-area .chartjs-size-monitor').remove();
            $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

            const cpuUseData = hwData.message.cpu;
            const cpuChart = document.getElementById("cpuChart").getContext("2d");
            const networkChart1 = new Chart(cpuChart, {
                type: 'doughnut',
                data: {
                    labels: ['미사용률', '사용률'],
                    datasets: [{
                        data: [100 - cpuUseData, cpuUseData],
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
                                        size: '28',
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

            //메모리 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#memoryChart").remove();
            $('.memory-area .chartjs-size-monitor').remove();
            $(".memory-area").append('<canvas id="memoryChart"></canvas>');

            const memoryUseData = hwData.message.memory;
            const memoryChart = document.getElementById("memoryChart").getContext("2d");
            const networkChart2 = new Chart(memoryChart, {
                type: 'doughnut',
                data: {
                    labels: ['미사용률', '사용률'],
                    datasets: [{
                        data: [100 - memoryUseData, memoryUseData],
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
                                        size: '28',
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

            //디스크 사용률 - 가로형 막대 차트

            //디스트 사용률 key        
            const diskNames = hwData.disk_keys;
            let diskNameArr = Object.values(diskNames);

            //디스크 사용률 value
            let diskValueArr = [];
            let diskValue = hwData.message.disk;
            diskValue.forEach((item, idx) => {
                diskValueArr.push(parseInt(item.unit).toFixed(2));
            });

            //backgroundColor 갯수만큼 배열
            const diskBgN = diskNames.length;
            let diskBgArray = [];
            for (let i = 0; i < diskBgN; i++) {
                diskBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#diskChart").remove();
            $('.disk-area .chartjs-size-monitor').remove();
            $(".disk-area").append('<canvas id="diskChart"></canvas>');

            const diskChart = document.getElementById("diskChart").getContext("2d");
            const networkChart3 = new Chart(diskChart, {
                type: "horizontalBar",
                data: {
                    labels: diskNameArr,
                    datasets: [
                        {
                            data: diskValueArr,
                            backgroundColor: diskBgArray,
                            barPercentage: 0.5,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [
                            {
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

            //네트워크 사용률 - 가로형 막대 차트
            //네트워크 사용률 key  
            const networkNames = hwData.network_keys;
            let networkNameArr = Object.values(networkNames);

            //네트워크 사용률 value
            let networkValueArr = [];
            let networkValue = hwData.message.network;
            networkValue.forEach((item, idx) => {
                networkValueArr.push((parseInt(item.unit).toFixed(2)));
            });
            let networkValueArrMax = Math.max.apply(null, networkValueArr);

            console.log(networkValueArr);

            //backgroundColor 갯수만큼 배열
            const networkBgN = diskNames.length;
            let networkBgArray = [];
            for (let i = 0; i < networkBgN; i++) {
                networkBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#networkChart").remove();
            $('.network-area .chartjs-size-monitor').remove();
            $(".network-area").append('<canvas id="networkChart"></canvas>');

            const networkChart = document.getElementById("networkChart").getContext("2d");
            const networkChart4 = new Chart(networkChart, {
                type: "horizontalBar",
                data: {
                    labels: networkNameArr,
                    datasets: [
                        {
                            data: networkValueArr,
                            backgroundColor: networkBgArray,
                            barPercentage: 0.5,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                ticks: {
                                    min: 0,
                                    max: 20,
                                    stepSize: 2,
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
        }

        if (hwName == "bona-stt2") {
            if (!flag) {
                onSet();

                //cpu 사용률 - 도넛형 차트
                //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                $("#cpuChart").remove();
                $(".cpu-area .chartjs-size-monitor").remove();
                $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

                const cpuUseData = hwData.message.cpu;
                const cpuChart = document.getElementById("cpuChart").getContext("2d");
                const networkChart1 = new Chart(cpuChart, {
                    type: 'doughnut',
                    data: {
                        labels: ['미사용률', '사용률'],
                        datasets: [{
                            data: [100 - cpuUseData, cpuUseData],
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
                                            size: '28',
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
                        responsive: false,
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

                //메모리 사용률 - 도넛형 차트
                //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                $("#memoryChart").remove();
                $(".memory-area .chartjs-size-monitor").remove();
                $(".memory-area").append('<canvas id="memoryChart"></canvas>');

                const memoryUseData = hwData.message.memory;
                const memoryChart = document.getElementById("memoryChart").getContext("2d");
                const networkChart2 = new Chart(memoryChart, {
                    type: 'doughnut',
                    data: {
                        labels: ['미사용률', '사용률'],
                        datasets: [{
                            data: [100 - memoryUseData, memoryUseData],
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
                                            size: '28',
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
                        responsive: false,
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

                //디스크 사용률 - 가로형 막대 차트

                //디스트 사용률 key        
                const diskNames = hwData.disk_keys;
                let diskNameArr = Object.values(diskNames);

                //디스크 사용률 value
                let diskValueArr = [];
                let diskValue = hwData.message.disk;
                diskValue.forEach((item, idx) => {
                    diskValueArr.push((item.unit).toFixed(2));
                });
                console.log(diskValueArr);

                //backgroundColor 갯수만큼 배열
                const diskBgN = diskNames.length;
                let diskBgArray = [];
                for (let i = 0; i < diskBgN; i++) {
                    diskBgArray.push("#5d6778");
                }

                //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                $("#diskChart").remove();
                $(".disk-area .chartjs-size-monitor").remove();
                $(".disk-area").append('<canvas id="diskChart"></canvas>');

                const diskChart = document.getElementById("diskChart").getContext("2d");
                const networkChart3 = new Chart(diskChart, {
                    type: "horizontalBar",
                    data: {
                        labels: diskNameArr,
                        datasets: [
                            {
                                data: diskValueArr,
                                backgroundColor: diskBgArray,
                                barPercentage: 0.5,
                            },
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [
                                {
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

                //네트워크 사용률 - 가로형 막대 차트
                //네트워크 사용률 key  
                const networkNames = hwData.network_keys;
                let networkNameArr = Object.values(networkNames);

                //네트워크 사용률 value
                let networkValueArr = [];
                let networkValue = hwData.message.network;
                networkValue.forEach((item, idx) => {
                    networkValueArr.push(((item.unit).toFixed(2)));
                });
                let networkValueArrMax = Math.max.apply(null, networkValueArr);

                //console.log(networkValueArr);

                //backgroundColor 갯수만큼 배열
                const networkBgN = diskNames.length;
                let networkBgArray = [];
                for (let i = 0; i < networkBgN; i++) {
                    networkBgArray.push("#5d6778");
                }

                //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                $("#networkChart").remove();
                $(".network-area .chartjs-size-monitor").remove();
                $(".network-area").append('<canvas id="networkChart"></canvas>');

                const networkChart = document.getElementById("networkChart").getContext("2d");
                const networkChart4 = new Chart(networkChart, {
                    type: "horizontalBar",
                    data: {
                        labels: networkNameArr,
                        datasets: [
                            {
                                data: networkValueArr,
                                backgroundColor: networkBgArray,
                                barPercentage: 0.5,
                            },
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        plugins: {
                            tooltip: {
                                intersect: false
                            }
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        min: 0,
                                        max: 20,
                                        stepSize: 2,
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
            }
        }
    };

    //#hw0탭 클릭 시 bona-lbmon1a 데이터 출력
    $(document).on('click', '#hw0', function (e) {
        e.preventDefault();
        let tabTxt = $(this).text();
        hardwareData = tabTxt;
    });

    // //#hw1탭 클릭 시 bona-lbmon1b 데이터 출력
    // $(document).on('click', '#hw1', function (e) {
    //     e.preventDefault();
    //     hardwareData = "bona-lbmon1b";
    // });

    // //#hw2탭 클릭 시 bona-stt1 데이터 출력
    // $(document).on('click', '#hw2', function (e) {
    //     e.preventDefault();
    //     hardwareData = "bona-stt1";
    // });

    // //#hw3탭 클릭 시 bona-stt2 데이터 출력
    // $(document).on('click', '#hw3', function (e) {
    //     e.preventDefault();
    //     hardwareData = "bona-stt2";
    // });

    //연결닫힘
    socket2.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');

            socket2 = null
            setTimeout(startSocket2, 5000);
        }
    };

    //웹 소켓 오류
    socket2.onerror = function (error) {
        console.log(`[error] ${error.message}`);
    };

}
startSocket2();