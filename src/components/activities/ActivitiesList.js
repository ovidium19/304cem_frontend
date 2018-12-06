import React from 'react'
import PropTypes from 'prop-types'
import ActivitiesItem from './ActivitiesItem'
const ActivitiesList = ({ activities, onClick, onBlankClick, klass}) => (
        <div className={klass}>
            <ul className='list-group w-100 p-0 '>
            { activities && activities.map(r =>
                    <ActivitiesItem activity = {r} key = {r._id} onClick = {onClick} onBlankClick = {onBlankClick} />
                )}
            </ul>
        </div>
)
ActivitiesList.propTypes = {
    activities: PropTypes.array,
    onClick: PropTypes.func,
    onBlankClick: PropTypes.func,
    klass: PropTypes.string
}
export default ActivitiesList
