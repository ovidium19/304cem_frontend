import React from 'react'
import PropTypes from 'prop-types'
import './LoadingSpinner.less'

const LoadingSpinner = ({message}) => (
    <React.Fragment>
        <div className="container-loader">
            <div className="dash uno"></div>
            <div className="dash dos"></div>
            <div className="dash tres"></div>
            <div className="dash cuatro"></div>
        </div>
        <div className='my-3 w-75 font-weight-bold message'>
            <p className='display-4 text-center'>{message}</p>
        </div>
    </React.Fragment>
)
LoadingSpinner.propTypes = {
    message: PropTypes.string
}

export default LoadingSpinner
