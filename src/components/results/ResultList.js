import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem'
const ResultList = ({ results, onClick}) => (
    <div className='results-list p-0 card'>
        <div className='card-header'>
            <p className='display-4 text-center'>Latest results</p>
            <p className='text-muted text-center'>Click to see more details.</p>
        </div>
        <div className='card-body m-0 p-0'>
            <ul className='list-group w-100 p-0 '>
            { results && results.map(r =>
                    <ResultItem result = {r} key = {r._id} onClick = {onClick} />
                )}
            </ul>
        </div>

    </div>
)
ResultList.propTypes = {
    results: PropTypes.array,
    onClick: PropTypes.func
}
export default ResultList
