import BarChart from '@/core/chart/BarChart'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
        datasets: [
          {
            label: ['Ligações', 'Ligações', 'Ligações', 'Ligações'],
            backgroundColor: ['red', 'blue', 'green', 'yellow'],
            data: [10, 20, 10, 5]
          }
        ]
      }
    }
  }
}
