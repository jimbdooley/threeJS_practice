import Chart from 'chart.js/auto';

const chart_data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  
const testChart = new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',
        options: {
          backgroundColor: 'rgba(75, 192, 192, 0.92)',
          animation: false,
          plugins: {
            title: {
            display: true,
            text: 'My Chart Title', // Set the title text here
            font: {
                size: 16, // Set the title font size
            },
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        data: {
          labels: chart_data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: chart_data.map(row => row.count)
            }
          ]
        }
      }
    );

window.MCS = {
    appendData(n) {
        const nxt = {
            year: 1 + chart_data[chart_data.length-1].year,
            count: n
        }
        testChart.data.labels.push(nxt.year)
        testChart.data.datasets[0].data.push(n)
        testChart.update()
    }
}