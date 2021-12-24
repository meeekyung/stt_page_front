let socket2 = new WebSocket("ws://192.168.20.123:55532/ws/hardware-status");

//연결설정
socket2.onopen = function (e) {
    console.log("[open] Connection established hwdata");
    console.log("Sending to server");
    socket2.send("My name is John");
};

const cpuChart = document.getElementById("cpuChart").getContext("2d");
const networkChart1 = new Chart(cpuChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: '# of Votes',
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

const memoryChart = document.getElementById("memoryChart").getContext("2d");
const networkChart2 = new Chart(memoryChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: '# of Votes',
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
                        max: 15,
                        stepSize: 3,
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


//데이터 수신 됨
socket2.onmessage = function (json) {
    $('#hw0').addClass('tab-on').siblings().removeClass('tab-on');
    //console.log(`[message] Data received from server: ${event.data}`);

    //전체 데이터 출력
    const hwData = JSON.parse(json.data);
    const hwName = hwData.hostname;
    if (hwName == "bona-lbmon1a") {
        console.log("bona-lbmon1a 출력");
        //cpu 사용률 - 도넛형 차트
        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#cpuChart").remove();
        $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

        const cpuUseData = hwData.message.cpu;
        const cpuChart = document.getElementById("cpuChart").getContext("2d");
        const networkChart1 = new Chart(cpuChart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: '# of Votes',
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
        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#memoryChart").remove();
        $(".memory-area").append('<canvas id="memoryChart"></canvas>');

        const memoryUseData = hwData.message.memory;
        const memoryChart = document.getElementById("memoryChart").getContext("2d");
        const networkChart2 = new Chart(memoryChart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: '# of Votes',
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

        //디스트 사용률 key        
        const diskNames = hwData.disk_keys;
        let diskNameArr = Object.values(diskNames);

        //디스크 사용률 value
        let diskValueArr = [];
        let diskValue = hwData.message.disk;
        diskValue.forEach((item, idx) => {
            diskValueArr.push(parseInt(item.unit));
        });

        //backgroundColor 갯수만큼 배열
        const diskBgN = diskNames.length;
        let diskBgArray = [];
        for (let i = 0; i < diskBgN; i++) {
            diskBgArray.push("#5d6778");
        }

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#diskChart").remove();
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
            networkValueArr.push(item.unit);
        });

        //backgroundColor 갯수만큼 배열
        const networkBgN = diskNames.length;
        let networkBgArray = [];
        for (let i = 0; i < networkBgN; i++) {
            networkBgArray.push("#5d6778");
        }

        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
        $("#networkChart").remove();
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
                                max: 15,
                                stepSize: 3,
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
                                max: 15,
                                stepSize: 3,
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

        $(document).on('click', '.tab', function () {
            $(this).addClass('tab-on').siblings().removeClass('tab-on');
        });
    }

};

$(document).on('click', '#hw0', function () {
    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket2.onmessage = function (json) {
        //console.log(`[message] Data received from server: ${event.data}`);

        //전체 데이터 출력
        const hwData = JSON.parse(json.data);
        const hwName = hwData.hostname;
        if (hwName == "bona-lbmon1a") {
            console.log("bona-lbmon1a 클릭 후 출력");
            //cpu 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#cpuChart").remove();
            $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

            const cpuUseData = hwData.message.cpu;
            const cpuChart = document.getElementById("cpuChart").getContext("2d");
            const networkChart1 = new Chart(cpuChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#memoryChart").remove();
            $(".memory-area").append('<canvas id="memoryChart"></canvas>');

            const memoryUseData = hwData.message.memory;
            const memoryChart = document.getElementById("memoryChart").getContext("2d");
            const networkChart2 = new Chart(memoryChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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

            //디스트 사용률 key        
            const diskNames = hwData.disk_keys;
            let diskNameArr = Object.values(diskNames);

            //디스크 사용률 value
            let diskValueArr = [];
            let diskValue = hwData.message.disk;
            diskValue.forEach((item, idx) => {
                diskValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const diskBgN = diskNames.length;
            let diskBgArray = [];
            for (let i = 0; i < diskBgN; i++) {
                diskBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#diskChart").remove();
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
                                    max: 50,
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
            //네트워크 사용률 key  
            const networkNames = hwData.network_keys;
            let networkNameArr = Object.values(networkNames);

            //네트워크 사용률 value
            let networkValueArr = [];
            let networkValue = hwData.message.network;
            networkValue.forEach((item, idx) => {
                networkValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const networkBgN = diskNames.length;
            let networkBgArray = [];
            for (let i = 0; i < networkBgN; i++) {
                networkBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#networkChart").remove();
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
                                    max: 15,
                                    stepSize: 3,
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

            $(document).on('click', '.tab', function () {
                $(this).addClass('tab-on').siblings().removeClass('tab-on');
            });
        }

    };
});

$(document).on('click', '#hw1', function () {
    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket2.onmessage = function (json) {
        //console.log(`[message] Data received from server: ${event.data}`);

        //전체 데이터 출력
        const hwData = JSON.parse(json.data);
        const hwName = hwData.hostname;
        if (hwName == "bona-lbmon1b") {
            console.log("bona-lbmon1b 클릭 후 출력");
            //cpu 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#cpuChart").remove();
            $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

            const cpuUseData = hwData.message.cpu;
            const cpuChart = document.getElementById("cpuChart").getContext("2d");
            const networkChart1 = new Chart(cpuChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#memoryChart").remove();
            $(".memory-area").append('<canvas id="memoryChart"></canvas>');

            const memoryUseData = hwData.message.memory;
            const memoryChart = document.getElementById("memoryChart").getContext("2d");
            const networkChart2 = new Chart(memoryChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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

            //디스트 사용률 key        
            const diskNames = hwData.disk_keys;
            let diskNameArr = Object.values(diskNames);

            //디스크 사용률 value
            let diskValueArr = [];
            let diskValue = hwData.message.disk;
            diskValue.forEach((item, idx) => {
                diskValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const diskBgN = diskNames.length;
            let diskBgArray = [];
            for (let i = 0; i < diskBgN; i++) {
                diskBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#diskChart").remove();
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
            //네트워크 사용률 key  
            const networkNames = hwData.network_keys;
            let networkNameArr = Object.values(networkNames);

            //네트워크 사용률 value
            let networkValueArr = [];
            let networkValue = hwData.message.network;
            networkValue.forEach((item, idx) => {
                networkValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const networkBgN = diskNames.length;
            let networkBgArray = [];
            for (let i = 0; i < networkBgN; i++) {
                networkBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#networkChart").remove();
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
                                    max: 15,
                                    stepSize: 3,
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

            $(document).on('click', '.tab', function () {
                $(this).addClass('tab-on').siblings().removeClass('tab-on');
            });
        }

    };
});

$(document).on('click', '#hw2', function () {
    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket2.onmessage = function (json) {
        //console.log(`[message] Data received from server: ${event.data}`);

        //전체 데이터 출력
        const hwData = JSON.parse(json.data);
        const hwName = hwData.hostname;
        if (hwName == "bona-stt1") {
            console.log("bona-stt1 클릭 후 출력");
            //cpu 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#cpuChart").remove();
            $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

            const cpuUseData = hwData.message.cpu;
            const cpuChart = document.getElementById("cpuChart").getContext("2d");
            const networkChart1 = new Chart(cpuChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#memoryChart").remove();
            $(".memory-area").append('<canvas id="memoryChart"></canvas>');

            const memoryUseData = hwData.message.memory;
            const memoryChart = document.getElementById("memoryChart").getContext("2d");
            const networkChart2 = new Chart(memoryChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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

            //디스트 사용률 key        
            const diskNames = hwData.disk_keys;
            let diskNameArr = Object.values(diskNames);

            //디스크 사용률 value
            let diskValueArr = [];
            let diskValue = hwData.message.disk;
            diskValue.forEach((item, idx) => {
                diskValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const diskBgN = diskNames.length;
            let diskBgArray = [];
            for (let i = 0; i < diskBgN; i++) {
                diskBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#diskChart").remove();
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
            //네트워크 사용률 key  
            const networkNames = hwData.network_keys;
            let networkNameArr = Object.values(networkNames);

            //네트워크 사용률 value
            let networkValueArr = [];
            let networkValue = hwData.message.network;
            networkValue.forEach((item, idx) => {
                networkValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const networkBgN = diskNames.length;
            let networkBgArray = [];
            for (let i = 0; i < networkBgN; i++) {
                networkBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#networkChart").remove();
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
                                    max: 15,
                                    stepSize: 3,
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

            $(document).on('click', '.tab', function () {
                console.log(this);
                $(this).addClass('tab-on').siblings().removeClass('tab-on');
            });
        }

    };
});

$(document).on('click', '#hw3', function () {
    $(this).addClass('tab-on').siblings().removeClass('tab-on');

    socket2.onmessage = function (json) {
        //console.log(`[message] Data received from server: ${event.data}`);

        //전체 데이터 출력
        const hwData = JSON.parse(json.data);
        const hwName = hwData.hostname;
        if (hwName == "bona-stt2") {
            console.log("bona-stt1 클릭 후 출력");
            //cpu 사용률 - 도넛형 차트
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#cpuChart").remove();
            $(".cpu-area").append('<canvas id="cpuChart"></canvas>');

            const cpuUseData = hwData.message.cpu;
            const cpuChart = document.getElementById("cpuChart").getContext("2d");
            const networkChart1 = new Chart(cpuChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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
            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#memoryChart").remove();
            $(".memory-area").append('<canvas id="memoryChart"></canvas>');

            const memoryUseData = hwData.message.memory;
            const memoryChart = document.getElementById("memoryChart").getContext("2d");
            const networkChart2 = new Chart(memoryChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
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

            //디스트 사용률 key        
            const diskNames = hwData.disk_keys;
            let diskNameArr = Object.values(diskNames);

            //디스크 사용률 value
            let diskValueArr = [];
            let diskValue = hwData.message.disk;
            diskValue.forEach((item, idx) => {
                diskValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const diskBgN = diskNames.length;
            let diskBgArray = [];
            for (let i = 0; i < diskBgN; i++) {
                diskBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#diskChart").remove();
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
            //네트워크 사용률 key  
            const networkNames = hwData.network_keys;
            let networkNameArr = Object.values(networkNames);

            //네트워크 사용률 value
            let networkValueArr = [];
            let networkValue = hwData.message.network;
            networkValue.forEach((item, idx) => {
                networkValueArr.push(parseInt(item.unit));
            });

            //backgroundColor 갯수만큼 배열
            const networkBgN = diskNames.length;
            let networkBgArray = [];
            for (let i = 0; i < networkBgN; i++) {
                networkBgArray.push("#5d6778");
            }

            //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
            $("#networkChart").remove();
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
                                    max: 15,
                                    stepSize: 3,
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

            $(document).on('click', '.tab', function () {
                $(this).addClass('tab-on').siblings().removeClass('tab-on');
            });
        }

    };
});

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

