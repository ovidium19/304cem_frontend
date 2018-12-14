import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

class PieChart extends React.Component {
    randomRgba() {

        let o = Math.round, r = Math.random, s = 255
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' +  '0.8)'

    }
    createChart() {
        let data = Object.assign({},this.props.data)
        let elem = document.getElementById(this.props.id)
        let color = data.labels.map(l => this.randomRgba())
        data.datasets[0].backgroundColor = color
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
        else {
            console.log('canvas not found')
            setTimeout(() => {
                this.createChart()
            },200)
        }

        return null
    }
    render() {
        return (
            <div className= {`mx-2 pie-chart p-1 my-3 ${this.props.klass ? this.props.klass : ''}`}>
                {this.props.title && <p className='text-center pie-title text-danger'>{this.props.title}</p>}
                {this.props.description && <p className='text-muted mb-2 text-center'>{this.props.description}</p>}
                <canvas id={this.props.id} />
                <React.Fragment>{this.createChart()}</React.Fragment>

            </div>
        )
    }
}

PieChart.propTypes = {
    data: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    klass: PropTypes.string,
}

export default PieChart
