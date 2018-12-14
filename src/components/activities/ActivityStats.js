import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
const ActivityStats = ({activity}) => (
    <div className='activity-stats'>
        <div className='activity-category'>
            <p>Category: </p>
            <p className='text-success font-weight-bold'>{activity.category}</p>
        </div>
        <div className='activity-answers'>
            <p>Total Answers: </p>
            <p className='text-success font-weight-bold '>{activity.total_answers}</p>
        </div>
        <div className='activity-passrate'>
            <p>Pass Rate: </p>
            <p className='text-success font-weight-bold'>{activity.avg_passrate ? activity.avg_passrate.toFixed(1) + ' %' : 'None'}</p>
        </div>
        <div className='activity-rating'>
            <p>Rating: </p>
            <StarRatingComponent
                name={activity['_id']}
                emptyStarColor = {'black'}
                starCount = {5}
                value = {activity.avg_rating >= 0 ? activity.avg_rating : 0}
                editing = {false} />
            <p className='text-center feedback-count'>{activity.feedback && `(${activity.feedback.length})`}</p>
        </div>
        <div className='activity-avgtime'>
            <p>Avg Time: </p>
            <p className='text-success font-weight-bold'>{activity.avg_time ? activity.avg_time.toFixed(1) + ' sec' : 'No answers'}</p>
        </div>
    </div>
)
ActivityStats.propTypes = {
    activity: PropTypes.object.isRequired
}
export default ActivityStats
