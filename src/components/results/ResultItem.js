import React from 'react'
import PropTypes from 'prop-types'

const ResultItem = ({ result, onClick}) => {
    let color = result.passed ? 'text-success' : 'text-danger'
    function onClickItem(e) {
        e.preventDefault()
        onClick(result._id)
    }
    return (
        <li className='list-group-item px-2 result-item' onClick={onClickItem}>
            <div className='row'>
                <p className={`result-timestamp col text-muted`}>{new Date(result.timestamp).toLocaleString()}</p>
                <p className={`result-category  col text-center font-weight-bold`}>Cat: {result.category}</p>
                <p className={`result-category  col text-center font-weight-bold`}>Time: {result.total_time} seconds</p>
                <p className={`result-passed ${color}  col text-right font-weight-bold`}>{result.passed ? 'Passed': 'Failed'}</p>
            </div>

        </li>
    )
}

ResultItem.propTypes = {
    result: PropTypes.object.isRequired,
    onClick: PropTypes.func
}
export default ResultItem
