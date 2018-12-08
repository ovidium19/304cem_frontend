import React from 'react'
import PropTypes from 'prop-types'

const ActivityTitleDiv = ({title, text, status, color}) => (
    <div className='jumbotron my-3 ml-3'>
        <p className='display-4 text-center'>{title}</p>
        <p className='lead text-success font-weight-bold text-center'>{text}</p>
        <p className='lead'>Status: <span style={{color: color ? color : 'green'}}>{status}</span></p>
    </div>
)
ActivityTitleDiv.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default ActivityTitleDiv
