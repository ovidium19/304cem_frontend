import React from 'react'
import PropTypes from 'prop-types'
import ActivityText from '../../common/ActivityText'

const ReviewActivityItem = ({ activity, loading, status, onPublishAct, onRemoveAct, index }) => {
    function onPublish(e) {
        e.preventDefault()
        onPublishAct && onPublishAct(activity, index)
    }
    function onRemove(e) {
        e.preventDefault()
        onRemoveAct && onRemoveAct(activity._id, index)
    }
    return (
        <li className='list-group-item px-2 review-activity-item'>
            <span className='float-right'>Created at: {activity.timestamp}</span>
            <h5 className='mb-3 '>Name: <span className='text-success'>{activity.name}</span></h5>
            <div className='px-2 pb-2'>
                <ActivityText text={activity.text} blanks={activity.blanks} />
            </div>
            <div className='p-2'>
                <ul className='list-group'>
                    {
                        activity.blanks.map((b,i) => (
                            <li className='list-group-item' key={b+i}>
                                <div className='row m-0 p-2'>
                                    <p className='col-3 text-center'>Blank {i+1}</p>
                                    <p className='col-1'></p>
                                    <ul className='list-inline col'>
                                        {activity.options[i].map((o,j) => (

                                            <li
                                            className={`list-inline-item ${j == 0 ? 'text-success' : 'text-danger'}`}
                                            key={o+j}>
                                                {o}
                                            </li>)
                                        )}
                                    </ul>
                                </div>

                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className = 'item-actions button-group text-right'>
                    {
                        status ?
                        status == 'published' ?
                            <span className='text-success'>Published</span>
                            :
                            <span className='text-danger'>Deleted</span>
                        :
                        <React.Fragment>
                            {!(loading) ?
                            <React.Fragment>
                                <button className='btn btn-success mx-2' onClick = {onPublish}>Publish</button>
                                <button className='btn btn-danger mx-2' onClick = {onRemove}>Remove</button>
                            </React.Fragment>
                            :
                            <span>Acting ...</span>
                            }
                        </React.Fragment>

                    }

            </div>
        </li>
    )
}

ReviewActivityItem.propTypes = {
    activity: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    status: PropTypes.string,
    onPublishAct: PropTypes.func,
    onRemoveAct: PropTypes.func,
    index: PropTypes.number
}
export default ReviewActivityItem
