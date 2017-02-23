import {
  Radar
} from 'vue-chartjs'

export default Radar.extend({
  props: {
    flavor: {
      type: Object,
      required: true
    },
    limits: {
      type: Object,
      required: true
    }
  },
  mounted() {
    var self = this;
    this.renderChart({
      labels: ['Ram', 'Disk', 'Cpu'],
      datasets: [{
          label: 'limits',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [100, 100, 100]
        },
        {
          label: self.flavor.name,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [
            self.retrieveValue(self.flavor.ram, 16384),
            self.retrieveValue(self.flavor.disk, 160),
            self.retrieveValue(self.flavor.vcpus, 8)
          ]
        }
      ]
    }, {
      scale: {
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                    beginAtZero: true
                }
            },
      responsive: true,
      maintainAspectRatio: false
    })
  },
  methods: {
    retrieveValue(partial, total) {
      var value = (parseFloat(partial)*100)/total
      console.log(value);
      return value;
    }
  }
})
