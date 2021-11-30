
function chartUpdate(fn, delay) {
  fn();
  setInterval(fn, delay);
}

chartUpdate(function () {
  const xmlhttp = new XMLHttpRequest();
  const url = "http://192.168.20.193:55532/monitor/server-info";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // 속성이 변경될 때 마다 호출되는 이벤트 핸들러
  xmlhttp.onreadystatechange = function () {
    // readyState == 4 는 작업이 완료된 상태
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);

      // * Array.prototype.map(callback(currentValue[, index[, array]])[, thisArg])
      // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
      let grpcData = data[0].ch_grpc;
      let restData = data[0].ch_rest;
      let totalData = data[0].ch_total;
      let allTotal = (100 - totalData);

      const ctx = document.getElementById("barChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["gRPC", "REST"],
          datasets: [
            {
              label: "server" + data.server_id,
              data: [grpcData, restData],
              backgroundColor: ["#00BCEB", "#00A0E8"],
              barPercentage: 0.3,
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
                  max: 100,
                  stepSize: 20,
                  fontColor : "#5d6778",
						      fontSize : 12,
                  defaultFontFamily: "Roboto"
                },
                gridLines:{
                  color: '#eaeaea',
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
                  fontColor : "#5d6778",
						      fontSize : 12,
                  defaultFontFamily: "Roboto",
                },
                gridLines:{
                  color: '#eaeaea',
                  lineWidth: 0.5
                },
              },
            ],
          },
        },
      });

      const ctx2 = document.getElementById("suceessChart").getContext("2d");
      const myChart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["server" + data[0].server_id, "total"],
          datasets: [
            {
              label: "total",
              data: [totalData, allTotal],
              backgroundColor: ["#00D4D6", "rgb(238, 238, 238)"],
              barPercentage: 0.3,
            },
          ],
        },
        options: {
          plugins: {
            doughnutlabel: {
              labels: [
                {
                  text: totalData + '%',
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
          responsive: true,
          legend: {
            display: true,
            labels: {
              fontColor: '#5d6778',
              defaultFontFamily: "Roboto"
          },
          },
          cutoutPercentage: 80,
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
    }
  };
}, 30000);
