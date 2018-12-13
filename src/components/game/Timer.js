import React from 'react'
import PropTypes from 'prop-types'

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerInterval: null
        }
        this.formatTime = this.formatTime.bind(this)
    }

    componentDidMount() {
        this.setState({
            timerInterval: setInterval(
                () => {
                    this.props.callback()
                }
            , 1000)
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timerInterval)
    }
    formatTime(val) {
        return `00:${val >= 10 ? val : `0${val}`}`
    }
    render() {
        return (
            <div className='timer'>
                <p className='display-4 text-white'>{this.formatTime(this.props.displayTime)}</p>
            </div>
        )
    }
}
Timer.propTypes = {
    displayTime: PropTypes.number,
    callback: PropTypes.func
}

export default Timer
