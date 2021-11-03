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

    const ctx = document.getElementById("doughnutChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["total"],
        datasets: [
          {
            label: "서버 1",
            data: [grpcData, restData],
            backgroundColor: ["rgb(79, 120, 224)", "rgb(125, 214, 249)"],
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