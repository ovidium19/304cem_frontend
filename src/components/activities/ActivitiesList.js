import React from 'react'
import PropTypes from 'prop-types'
const ActivitiesList = ({ activities, onClick, onBlankClick, klass, Item, loading, status, onPublishAct, onRemoveAct}) => (
        <div className={klass}>
            <ul className='list-group w-100 p-0 '>
            { activities && activities.map((r,i) =>(
                    <Item
                    activity = {r}
                    key = {r._id}
                    onClick = {onClick}
                    onBlankClick = {onBlankClick}
                    loading = {loading && loading.length > 0 ? loading[i] : false}
                    status = {status && status.length > 0 ? status[i] : ''}
                    onPublishAct = {onPublishAct}
                    onRemoveAct = {onRemoveAct}
                    index = {i}/>
            )
                )}
            </ul>
        </div>
)
ActivitiesList.propTypes = {
    activities: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    onBlankClick: PropTypes.func,
    klass: PropTypes.string,
    Item: PropTypes.func,
    loading: PropTypes.array,
    status: PropTypes.array,
    onPublishAct: PropTypes.func,
    onRemoveAct: PropTypes.func
}
export default ActivitiesList
