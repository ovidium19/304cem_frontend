import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

class CategoryChart extends React.Component {
    randomRgba() {

        let o = Math.round, r = Math.random, s = 255
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' +  '0.8)'

    }
    createChart() {
        let data = Object.assign({},this.props.data)
        let elem = document.getElementById('categoryChart')
        let color = data.labels.map(l => this.randomRgba())
        data.datasets[0].backgroundColor = color
        console.log(data.datasets[0])
        if (elem) {
            let chart = new Chart(
               elem,
                {
                    type: 'pie',
                    data,
                    options: {
                        responsive: true,
                        animation: {
                            animateScale: true
                        }
                    }
                })
        }

        return null
    }
    render() {
        return (
            <div className= ''>
                <canvas id="categoryChart"></canvas>
                <React.Fragment>{this.createChart()}</React.Fragment>

            </div>
        )
    }
}

CategoryChart.propTypes = {
    data: PropTypes.object.isRequired
}

export default CategoryChart
