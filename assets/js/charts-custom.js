
function chartUpdate(fn, delay) {
  fn();
  setInterval(fn, delay);
}

chartUpdate(function () {
  const xmlhttp = new XMLHttpRequest();
  const url = "http://192.168.20.193:55535/channels/server-info";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // 속성이 변경될 때 마다 호출되는 이벤트 핸들러
  xmlhttp.onreadystatechange = function () {
    // readyState == 4 는 작업이 완료된 상태
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);

      // * Array.prototype.map(callback(currentValue[, index[, array]])[, thisArg])
      // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
      let grpcData = data.ch_grpc;
      let restData = data.ch_rest;
      let totalData = data.ch_total;
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
              backgroundColor: ["#009FF3", "#00C0E0"],
              barPercentage: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  min: 0,
                  max: 50,
                  stepSize: 10,
                },
              },
            ],
          },
        },
      });

      const ctx2 = document.getElementById("doughnutChart").getContext("2d");
      const myChart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["server" + data.server_id, "total"],
          datasets: [
            {
              label: "total",
              data: [totalData, allTotal],
              backgroundColor: ["#0475DF", "rgb(238, 238, 238)"],
              barPercentage: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: true,
          },
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
