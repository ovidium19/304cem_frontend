import React from 'react'
import PropTypes from 'prop-types'
import ActivityText from '../common/ActivityText'
import ActivityStats from './ActivityStats'
const ActivitiesItem = ({ activity, onClick, onBlankClick}) => {
    function onClickItem(e) {
        e.preventDefault()
        onClick(activity._id)
    }
    return (
        <li className='list-group-item px-2 activity-item' onClick={onClickItem}>
            <p className='display-4'>{activity.name}</p>
            <div className='py-2 pl-3'>
                <p className={`lead ${activity.published ? 'text-success' : 'text-danger'}`}>
                    {activity.published ? 'Published': activity.under_review ? 'Under review' : 'Not published'}
                    <span className='text-muted float-right'>Created at: {activity.timestamp}</span>
                </p>

            </div>
            <div className='px-2 pb-2'>
                <ActivityText text={activity.text} blanks={activity.blanks} onClick={onBlankClick} />
            </div>
            <ActivityStats activity={activity} />
        </li>
    )
}

ActivitiesItem.propTypes = {
    activity: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onBlankClick: PropTypes.func
}
export default ActivitiesItem
