function startSocket() {
  $.getJSON("../../config/config.json", function (json) {
    // console.log(json);
    // console.log(json.urls);

    //성공률(%) 도넛형 그래프
    const suceessChart = document.getElementById("suceessChart").getContext("2d");
    const suceessChartData = {
      type: "doughnut",
      data: {
        labels: ["실패", "성공"],
        datasets: [
          {
            label: "# of Votes",
            data: 0,
            backgroundColor: ["#ececec", "#2e88de"],
            borderWidth: 0,
            barPercentage: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: 0 + "%",
                font: {
                  size: "30",
                  family: "Roboto ,Arial, Helvetica, sans-serif",
                },
                color: "#5d6778",
              },
            ],
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.labels[tooltipItem.index];
              return label;
            }
          }
        },
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "left",
          display: false,
          labels: {
            fontColor: "#5d6778",
            fontSize: 15,
            defaultFontFamily: "Roboto",
            boxWidth: 15,
            padding: 15,
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
    let mySuceessChart = new Chart(suceessChart, suceessChartData);

    //채널상태(개) 도넛형 그래프
    const statusChart = document.getElementById("statusChart").getContext("2d");
    const statusChartData = {
      type: "doughnut",
      data: {
        labels: ["전체 채널 수", "사용중인 채널 수"],
        datasets: [
          {
            label: "# of Votes",
            data: 0,
            backgroundColor: ["#ececec", "#3adaba"],
            borderWidth: 0,
            barPercentage: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: 0 + "%",
                font: {
                  size: "35",
                  family: "Roboto ,Arial, Helvetica, sans-serif",
                },
                color: "#5d6778",
              },
            ],
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.labels[tooltipItem.index];
              return label;
            }
          }
        },
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          display: false,
          labels: {
            fontColor: "#5d6778",
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
    };
    let myStatusChart = new Chart(statusChart, statusChartData);

    //채널상태(서버별) 누적형 막대그래프
    const serverChChart = document.getElementById("serverChChart").getContext("2d");
    const serverChChartData = {
      type: "bar",
      data: {
        labels: ["REST", "gRPC", "Streaming"],
        datasets: [
          {
            label: "사용 중",
            data: 0,
            backgroundColor: "#3adaba",
            barPercentage: 0.3,
          },
          {
            label: "미사용",
            data: 0,
            backgroundColor: "#ececec",
            barPercentage: 0.3,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: "right",
          labels: {
            fontColor: "#5d6778",
            fontSize: 15,
            defaultFontFamily: "Roboto",
            boxWidth: 15,
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
                defaultFontFamily: "Roboto",
              },
              gridLines: {
                color: "#fff",
                lineWidth: 0.5,
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
                color: "#fff",
                lineWidth: 0.5,
              },
            },
          ],
        },
      },
    };
    let myServerChChart = new Chart(serverChChart, serverChChartData);

    let socket = new WebSocket("ws://" + json.urls + "/ws/performance");

    let performanceData;

    //연결설정
    socket.onopen = function (e) {
      socket.send("[open] Connection established dashboard");
    };

    //데이터 수신 됨 - 전체 데이터를 출력해줌
    socket.onmessage = function (json) {
      //전체 데이터 출력
      let boardData = JSON.parse(json.data);

      //json key 가져오기
      const dataKey = Object.keys(boardData);

      //console.log(dataKey.includes(performanceData)); 클릭한 탭의 문자열과 json key네임 일치하면 true를 추출함

      //let stt2 = dataKey[0];
      let total = dataKey.find(v => v === "total"); //"bona-total-stt"의 문자열을 json key 배열에서 찾아줌

      let systemTabsLi = document.querySelector('#systemTabs li');

      //json key 배열 중 일치하는지 참/거짓 판별
      function isdataKey(dataKeyName) {
        let dataKeyNames = Object.keys(boardData);
        if (dataKeyNames.indexOf(dataKeyNames) > -1) {
          return true;
        } else {
          return false;
        }
      }
      const isData = isdataKey(performanceData);
      const allTab = document.getElementById('total');

      if (systemTabsLi != null) {
        if (dataKey.includes(performanceData)) {
          //earlySet();
          // $(this).addClass('tab-on').siblings().removeClass('tab-on');

          //stt2 데이터 출력
          const boardData2 = JSON.parse(json.data);

          //요청건수 출력
          const requestTotalStt2 = boardData2[performanceData].request_number;
          document.querySelector(".request-data").innerHTML = requestTotalStt2;

          //성공률 출력 - 도넛형 차트
          const successNumStt2 = boardData2[performanceData].success;
          const failPerNumStt2 = boardData2[performanceData].fail;
          let bunmo = successNumStt2 + failPerNumStt2 ? successNumStt2 + failPerNumStt2 : 1;

          const successPerStt2 = Math.floor(
            (boardData[performanceData].success / bunmo) * 100
          );
          const failPerStt2 = (
            (boardData2[performanceData].fail / bunmo) *
            100
          ).toFixed(0);

          document.querySelector("#legendNum1").innerHTML = successNumStt2;
          document.querySelector("#legendNum2").innerHTML = failPerNumStt2;

          mySuceessChart.data.datasets[0].data = [failPerStt2, successPerStt2];
          mySuceessChart.options.plugins.doughnutlabel.labels[0].text = successPerStt2 + ' %';

          mySuceessChart.update();

          //총 음성길이 출력
          const audioLengthStt2 = boardData2[performanceData].audio_len / 60;
          document.querySelector(".length-data").innerHTML =
            audioLengthStt2.toFixed(1);

          //평균처리 속도 출력
          const averageSpeedStt2 = boardData2[performanceData].average_speed;
          document.querySelector(".speed-data").innerHTML =
            averageSpeedStt2.toFixed(1); //소수점 첫째자리까지

          //채널상태 - 전체(도넛형 차트)
          const totalCh = boardData2[performanceData].channels.total;
          const useCh = boardData2[performanceData].channels.running;
          const useChPer = (
            (boardData[performanceData].channels.running / totalCh) *
            100
          ).toFixed(0);

          if (isNaN(useChPer)) { // 값이 없어서 NaN값이 나올 경우

            useChPer = 0;

          }

          document.querySelector("#legendNum3").innerHTML = totalCh;
          document.querySelector("#legendNum4").innerHTML = useCh;

          myStatusChart.data.datasets[0].data = [100 - useChPer, useChPer];
          myStatusChart.options.plugins.doughnutlabel.labels[0].text = useChPer + ' %';

          myStatusChart.update();

          //채널상태 - 서버별(누적형 막대차트)
          const restTotalStt2 = boardData2[performanceData].channels.rest.total;
          const grpcTotalStt2 = boardData2[performanceData].channels.grpc.total;
          const grpcStreamTotalStt2 = boardData2[performanceData].channels.grpc_stream.total;

          const restRunningStt2 = boardData2[performanceData].channels.rest.running;
          const grpcRunningStt2 = boardData2[performanceData].channels.grpc.running;
          const grpcStreamRunningStt2 = boardData2[performanceData].channels.grpc_stream.running;

          myServerChChart.data.datasets[0].data = [restRunningStt2, grpcRunningStt2, grpcStreamRunningStt2];
          myServerChChart.data.datasets[1].data = [restTotalStt2 - restRunningStt2, grpcTotalStt2 - grpcRunningStt2, grpcStreamTotalStt2 - grpcStreamRunningStt2];

          myServerChChart.update();


        }
        else if (performanceData == total) {
          //earlySet();
          // $(this).addClass('tab-on').siblings().removeClass('tab-on');
          //전체 데이터 출력
          const boardData = JSON.parse(json.data);

          //요청건수 출력
          const requestTotal = boardData[total].request_number;
          document.querySelector(".request-data").innerHTML = requestTotal;

          //성공률 출력 - 도넛형 차트
          const successNum = boardData[total].success;
          const failPerNum = boardData[total].fail;
          let bunmo = successNum + failPerNum ? successNum + failPerNum : 1;

          const successPer = Math.floor(
            (boardData[total].success / bunmo) * 100
          );
          const failPer = (
            (boardData[total].fail / bunmo) *
            100
          ).toFixed(0);

          document.querySelector("#legendNum1").innerHTML = successNum;
          document.querySelector("#legendNum2").innerHTML = failPerNum;

          mySuceessChart.data.datasets[0].data = [failPer, successPer];
          mySuceessChart.options.plugins.doughnutlabel.labels[0].text = successPer + ' %';

          mySuceessChart.update();

          //총 음성길이 출력
          const audioLength = boardData[total].audio_len / 60;
          document.querySelector(".length-data").innerHTML = audioLength.toFixed(1);

          //평균처리 속도 출력
          const averageSpeed = boardData[total].average_speed;
          document.querySelector(".speed-data").innerHTML = averageSpeed.toFixed(1); //소수점 첫째자리까지

          //채널상태 - 전체(도넛형 차트)
          const totalCh = boardData[total].channels.total;
          const useCh = boardData[total].channels.running;
          const useChPer = (
            (boardData[total].channels.running / totalCh) *
            100
          ).toFixed(0);

          document.querySelector("#legendNum3").innerHTML = totalCh;
          document.querySelector("#legendNum4").innerHTML = useCh;

          myStatusChart.data.datasets[0].data = [100 - useChPer, useChPer];
          myStatusChart.options.plugins.doughnutlabel.labels[0].text = useChPer + ' %';

          myStatusChart.update();

          //채널상태 - 서버별(누적형 막대차트)
          const restTotal = boardData[total].channels.rest.total;
          const grpcTotal = boardData[total].channels.grpc.total;
          const grpcStreamTotal = boardData[total].channels.grpc_stream.total;

          const restRunning = boardData[total].channels.rest.running;
          const grpcRunning = boardData[total].channels.grpc.running;
          const grpcStreamRunning = boardData[total].channels.grpc_stream.running;

          myServerChChart.data.datasets[0].data = [restRunning, grpcRunning, grpcStreamRunning];
          myServerChChart.data.datasets[1].data = [restTotal - restRunning, grpcTotal - grpcRunning, grpcStreamTotal - grpcStreamRunning];

          myServerChChart.update();
        }
        else if (allTab.textContent == total) {
          console.log('첫 로딩시 출력');
          const boardData = JSON.parse(json.data);

          //요청건수 출력
          const requestTotal = boardData[total].request_number;
          document.querySelector(".request-data").innerHTML = requestTotal;

          //성공률 출력 - 도넛형 차트
          const successNum = boardData[total].success;
          const failPerNum = boardData[total].fail;
          let bunmo = successNum + failPerNum ? successNum + failPerNum : 1;

          const successPer = Math.floor(
            (boardData[total].success / bunmo) * 100
          );
          const failPer = (
            (boardData[total].fail / bunmo) *
            100
          ).toFixed(0);

          document.querySelector("#legendNum1").innerHTML = successNum;
          document.querySelector("#legendNum2").innerHTML = failPerNum;

          if (failPer == 0 && successNum == 0) {
            mySuceessChart.data.datasets[0].data = [100, 0];
            mySuceessChart.options.plugins.doughnutlabel.labels[0].text = successPer + ' %';
          } else {
            mySuceessChart.data.datasets[0].data = [failPer, successPer];
            mySuceessChart.options.plugins.doughnutlabel.labels[0].text = successPer + ' %';
          }

          mySuceessChart.update();

          //총 음성길이 출력
          const audioLength = boardData[total].audio_len / 60;
          document.querySelector(".length-data").innerHTML = audioLength.toFixed(1);

          //평균처리 속도 출력
          const averageSpeed = boardData[total].average_speed;
          document.querySelector(".speed-data").innerHTML = averageSpeed.toFixed(1); //소수점 첫째자리까지

          //채널상태 - 전체(도넛형 차트)
          const totalCh = boardData[total].channels.total;
          const useCh = boardData[total].channels.running;
          const useChPer = (
            (boardData[total].channels.running / totalCh) *
            100
          ).toFixed(0);

          document.querySelector("#legendNum3").innerHTML = totalCh;
          document.querySelector("#legendNum4").innerHTML = useCh;

          myStatusChart.data.datasets[0].data = [100 - useChPer, useChPer];
          myStatusChart.options.plugins.doughnutlabel.labels[0].text = useChPer + ' %';

          myStatusChart.update();

          //채널상태 - 서버별(누적형 막대차트)
          const restTotal = boardData[total].channels.rest.total;
          const grpcTotal = boardData[total].channels.grpc.total;
          const grpcStreamTotal = boardData[total].channels.grpc_stream.total;

          const restRunning = boardData[total].channels.rest.running;
          const grpcRunning = boardData[total].channels.grpc.running;
          const grpcStreamRunning = boardData[total].channels.grpc_stream.running;

          myServerChChart.data.datasets[0].data = [restRunning, grpcRunning, grpcStreamRunning];
          myServerChChart.data.datasets[1].data = [restTotal - restRunning, grpcTotal - grpcRunning, grpcStreamTotal - grpcStreamRunning];

          myServerChChart.update();
        }
        else if (!isData) {
          console.log('데이터값이 유효하지 않음');
          const boardData = JSON.parse(json.data);

          //요청건수 출력
          const requestTotal = 0;
          document.querySelector(".request-data").innerHTML = requestTotal;

          //성공률 출력 - 도넛형 차트
          const successNum = 0;
          const failPerNum = 0;
          let bunmo = successNum + failPerNum ? successNum + failPerNum : 1;

          const successPer = 0;
          const failPer = 0;

          document.querySelector("#legendNum1").innerHTML = 0;
          document.querySelector("#legendNum2").innerHTML = 0;

          if (failPer == 0 && successNum == 0) {
            mySuceessChart.data.datasets[0].data = [100, 0];
            mySuceessChart.options.plugins.doughnutlabel.labels[0].text = 0 + ' %';
          } else {
            mySuceessChart.data.datasets[0].data = [failPer, successPer];
            mySuceessChart.options.plugins.doughnutlabel.labels[0].text = 0 + ' %';
          }

          mySuceessChart.update();

          //총 음성길이 출력
          const audioLength = 0;
          document.querySelector(".length-data").innerHTML = audioLength;

          //평균처리 속도 출력
          const averageSpeed = 0;
          document.querySelector(".speed-data").innerHTML = averageSpeed; //소수점 첫째자리까지

          //채널상태 - 전체(도넛형 차트)
          const totalCh = 0;
          const useCh = 0;
          const useChPer = 0;

          document.querySelector("#legendNum3").innerHTML = totalCh;
          document.querySelector("#legendNum4").innerHTML = useCh;

          myStatusChart.data.datasets[0].data = [0, 0];
          myStatusChart.options.plugins.doughnutlabel.labels[0].text = 0 + ' %';

          myStatusChart.update();

          //채널상태 - 서버별(누적형 막대차트)
          myServerChChart.data.datasets[0].data = [0, 0, 0];
          myServerChChart.data.datasets[1].data = [0, 0, 0];

          myServerChChart.update();
        }
      }
    };

    //전체탭 클릭 시 total 데이터가 출력되야함
    $(document).on("click", "#total", function (e) {
      e.preventDefault();

      performanceData = "total";
    });

    //#stt0탭 클릭 시 stt1 데이터가 출력되야함
    $(document).on('click', '.performanceTab', function (e) {
      e.preventDefault();
      let tabTxt = $(this).text();
      if (booleanValue) {
        console.log(tabTxt);
      }
      performanceData = tabTxt;
    });

    //#stt1탭 클릭 시 stt2 데이터가 출력되야함
    //   $(document).on("click", "#stt1", function (e) {
    //     e.preventDefault();

    //     performanceData = "bona-stt2";
    //   });

    //연결닫힘
    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died");

        socket = null;
        setTimeout(startSocket, 5000);
      }
    };

    //웹 소켓 오류
    socket.onerror = function (error) {
      if (booleanValue) {
        console.log(`[error] ${error.message}`);
      }
    };
  });
}
startSocket();
