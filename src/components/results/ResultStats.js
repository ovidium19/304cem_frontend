import React from 'react'
import PropTypes from 'prop-types'

const ResultStats = ({passRate, avgTime}) => (
    <div className=' bg-none my-3 stats-page'>
        <div className='flex-grow-1 border-success stats-container'>
            <div className='card stats p-3'>
                <div className='card-body'>
                    <div className = 'card-title text-center py-2 display-4'>
                        Pass Rate
                    </div>
                    <div className = {`${passRate < 50 ? 'text-danger' : 'text-success'} display-3 text-center`}>
                        {passRate+" %"}
                    </div>
                </div>
            </div>
        </div>
        <div className='gutter-20'/>
        <div className='flex-grow-1 border-success stats-container'>
            <div className='card stats p-3'>
                <div className='card-body'>
                    <div className = 'card-title text-center py-2 display-4'>
                        Average Time
                    </div>
                    <div className = {`${avgTime < 50 ? 'text-success' : 'text-danger'} display-3 text-center`}>
                        {avgTime+" sec"}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
ResultStats.propTypes = {
    passRate: PropTypes.number.isRequired,
    avgTime: PropTypes.number.isRequired
}

export default ResultStats
