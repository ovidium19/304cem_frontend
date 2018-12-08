import React from 'react'
import PropTypes from 'prop-types'

const SingleActivityStats = ({title, text, category, status, color}) => (
    <div className='jumbotron my-3 ml-3'>
        <p className='display-4 text-center'>{title}</p>
        <p className='lead text-success font-weight-bold text-center'>{text}</p>
        <p className='lead'>Status: <span style={{color: color ? color : 'green'}}>{status}</span></p>
        <p className='lead'>Category: {category}</p>
    </div>
)
SingleActivityStats.propTypes = {
    answers: PropTypes.array,
    total_answers: PropTypes.number
}

export default SingleActivityStats
