let booleanValue = false;

function startSocket2() {
    $.getJSON("../../config/config.json", function (json) {
        // console.log(json);
        // console.log(json.urls);

        //CPU 사용률(%) 도넛형 그래프
        const cpuChart = document.getElementById("cpuChart").getContext("2d");
        const cpuChartData = {
            type: 'doughnut',
            data: {
                labels: ['미사용률', '사용률'],
                datasets: [{
                    data: 0,
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
        };
        let myCpuChart = new Chart(cpuChart, cpuChartData);

        //메모리 사용률(%) 도넛형 그래프
        const memoryChart = document.getElementById("memoryChart").getContext("2d");
        const memoryChartData = {
            type: 'doughnut',
            data: {
                labels: ['미사용률', '사용률'],
                datasets: [{
                    data: 0,
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
        };
        let myMemoryChart = new Chart(memoryChart, memoryChartData);

        //디스크 사용률(%) 가로형 막대그래프
        const diskChart = document.getElementById("diskChart").getContext("2d");
        const diskChartData = {
            type: "horizontalBar",
            data: {
                labels: '',
                datasets: [
                    {
                        data: 0,
                        backgroundColor: '',
                        barPercentage: 0.5,
                    },
                ],
            },
            animation: {
                duration: 0
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
        }
        let myDiskChart = new Chart(diskChart, diskChartData);

        //네트워크 트래픽(MB/s) 가로형 막대그래프
        const networkChart = document.getElementById("networkChart").getContext("2d");
        const networkChartData = {
            type: "horizontalBar",
            data: {
                labels: '',
                datasets: [
                    {
                        data: 0,
                        backgroundColor: '',
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
                animation: {
                    duration: 0
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
        };
        let myNetworkChart = new Chart(networkChart, networkChartData);

        let socket2 = new WebSocket("ws://" + json.urls + "/ws/hardware-status");

        let hardwareData;

        let flag;

        //연결설정
        socket2.onopen = function (e) {
            socket2.send("[open] Connection established hwdata");
        };

        $('#btn_test').on('click', function () {
            //const cpuUseData1 = hwData.message.cpu;
            // const cpuUseData2 = 100 - cpuUseData1;
            // const cpuUseDataText = cpuUseData1 + ' %';


            myCpuChart.data.datasets[0].data = [90, 10];
            myCpuChart.options.plugins.doughnutlabel.labels[0].text = '10';

            myDiskChart.data.datasets[0].data = [10, 20, 30];
            if (booleanValue) {
                console.log(myCpuChart.data.datasets[0].data);
                console.log(myCpuChart.options.plugins.doughnutlabel.labels[0].text);
            }

            //myCpuChart.clear();
            myCpuChart.update();
            myDiskChart.update();

        });

        $('#btn_test2').on('click', function () {
            //const cpuUseData1 = hwData.message.cpu;
            // const cpuUseData2 = 100 - cpuUseData1;
            // const cpuUseDataText = cpuUseData1 + ' %';


            myCpuChart.data.datasets[0].data = [0, 100];
            myCpuChart.options.plugins.doughnutlabel.labels[0].text = '100';

            myDiskChart.data.datasets[0].data = [40, 50, 60];
            if (booleanValue) {
                console.log(myCpuChart.data.datasets[0].data);
                console.log(myCpuChart.options.plugins.doughnutlabel.labels[0].text);
            }

            //myCpuChart.clear();
            myCpuChart.update();
            myDiskChart.update();

        });
        //데이터 수신 됨
        let hwNameArr = [];
        socket2.onmessage = function (json) {
            //전체 데이터 출력
            let hwData = JSON.parse(json.data);
            let hwName = hwData.hostname;
            let hwTabsLi = document.querySelector('#hwTabs li');
            const hwFirst = document.querySelector('.hwtab:first-child');
            const hwNameArrLi = hwNameArr.push(hwName);
            const hwNameArrIncludes = hwNameArr.includes(hardwareData);

            if (hwTabsLi != null && hardwareData == null) {
                if (hwName == hwFirst.textContent) {
                    if (!flag) {
                        //onSet();   

                        //cpu 사용률 - 도넛형 차트
                        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                        const cpuUseData1 = hwData.message.cpu;
                        const cpuUseData2 = 100 - cpuUseData1;
                        const cpuUseDataText = cpuUseData1 + ' %';

                        myCpuChart.data.datasets[0].data = [100 - cpuUseData1, cpuUseData1];
                        myCpuChart.options.plugins.doughnutlabel.labels[0].text = cpuUseData1 + ' %';

                        if (booleanValue) {
                            console.log(myCpuChart.data.datasets[0].data);
                            console.log(myCpuChart.options.plugins.doughnutlabel.labels[0].text);
                        }

                        myCpuChart.update();

                        //메모리 사용률 - 도넛형 차트
                        //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                        const memoryUseData = hwData.message.memory;
                        myMemoryChart.data.datasets[0].data = [100 - memoryUseData, memoryUseData];
                        myMemoryChart.options.plugins.doughnutlabel.labels[0].text = memoryUseData + ' %';

                        myMemoryChart.update();


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

                        if (booleanValue) {
                            console.log(diskChartData.data.datasets[0].data = diskValueArr);
                        }
                        diskChartData.data.datasets[0].data = diskValueArr;
                        diskChartData.data.datasets[0].backgroundColor = diskBgArray;
                        diskChartData.data.labels = diskNameArr

                        myDiskChart.update();	//차트 업데이트

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

                        //backgroundColor 갯수만큼 배열
                        const networkBgN = diskNames.length;
                        let networkBgArray = [];
                        for (let i = 0; i < networkBgN; i++) {
                            networkBgArray.push("#5d6778");
                        }

                        if (booleanValue) {
                            console.log(diskChartData.data.datasets[0].data = networkValueArr);
                        }
                        networkChartData.data.datasets[0].data = networkValueArr;
                        networkChartData.data.datasets[0].backgroundColor = networkBgArray;
                        networkChartData.data.labels = networkNameArr

                        myNetworkChart.update();	//차트 업데이트
                    }
                }
            }
            else if (hwTabsLi != null) {
                if (hardwareData == hwName) {
                    flag = true;
                    //onSet();

                    //cpu 사용률 - 도넛형 차트
                    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                    const cpuUseData1 = hwData.message.cpu;
                    const cpuUseData2 = 100 - cpuUseData1;
                    const cpuUseDataText = cpuUseData1 + ' %';

                    myCpuChart.data.datasets[0].data = [100 - cpuUseData1, cpuUseData1];
                    myCpuChart.options.plugins.doughnutlabel.labels[0].text = cpuUseData1 + ' %';

                    if (booleanValue) {
                        console.log(myCpuChart.data.datasets[0].data);
                        console.log(myCpuChart.options.plugins.doughnutlabel.labels[0].text);
                    }

                    myCpuChart.update();

                    //메모리 사용률 - 도넛형 차트
                    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                    const memoryUseData = hwData.message.memory;
                    myMemoryChart.data.datasets[0].data = [100 - memoryUseData, memoryUseData];
                    myMemoryChart.options.plugins.doughnutlabel.labels[0].text = memoryUseData + ' %';

                    myMemoryChart.update();


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

                    if (booleanValue) {
                        console.log(diskChartData.data.datasets[0].data = diskValueArr);
                    }
                    diskChartData.data.datasets[0].data = diskValueArr;
                    diskChartData.data.datasets[0].backgroundColor = diskBgArray;
                    diskChartData.data.labels = diskNameArr

                    myDiskChart.update();	//차트 업데이트

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

                    //backgroundColor 갯수만큼 배열
                    const networkBgN = diskNames.length;
                    let networkBgArray = [];
                    for (let i = 0; i < networkBgN; i++) {
                        networkBgArray.push("#5d6778");
                    }

                    if (booleanValue) {
                        console.log(diskChartData.data.datasets[0].data = networkValueArr);
                    }
                    networkChartData.data.datasets[0].data = networkValueArr;
                    networkChartData.data.datasets[0].backgroundColor = networkBgArray;
                    networkChartData.data.labels = networkNameArr

                    myNetworkChart.update();	//차트 업데이트

                }
                else if (!hwNameArrIncludes) {
                    console.log('값이 0일때');
                    //cpu 사용률 - 도넛형 차트
                    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)

                    myCpuChart.data.datasets[0].data = [0, 0];
                    myCpuChart.options.plugins.doughnutlabel.labels[0].text = 0 + ' %';

                    myCpuChart.update();

                    //메모리 사용률 - 도넛형 차트
                    //마우스오버시 이전 데이터가 보이는 현상 제거(성공률)
                    const memoryUseData = hwData.message.memory;
                    myMemoryChart.data.datasets[0].data = [0, 0];
                    myMemoryChart.options.plugins.doughnutlabel.labels[0].text = 0 + ' %';

                    myMemoryChart.update();


                    //디스크 사용률 - 가로형 막대 차트            
                    //디스트 사용률 key   
                    diskChartData.data.datasets[0].data = 0;
                    diskChartData.data.datasets[0].backgroundColor = 0;
                    diskChartData.data.labels = 0

                    myDiskChart.update();	//차트 업데이트

                    //네트워크 사용률 - 가로형 막대 차트
                    //네트워크 사용률 key 
                    networkChartData.data.datasets[0].data = 0;
                    networkChartData.data.datasets[0].backgroundColor = 0;
                    networkChartData.data.labels = 0

                    myNetworkChart.update();	//차트 업데이트
                }
            }
        };

        //#hw0탭 클릭 시 bona-lbmon1a 데이터 출력
        $(document).on('click', '.hwtab', function (e) {
            e.preventDefault();
            let tabTxt = $(this).text();
            if (booleanValue) {
                console.log(tabTxt);
            }
            hardwareData = tabTxt;
        });

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
            if (booleanValue) {
                console.log(`[error] ${error.message}`);
            }
        };
    });

}
startSocket2();
