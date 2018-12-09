import React from 'react'
import PropTypes from 'prop-types'
import DraggableOption from './DraggableOption'
const ActivityOptions = ({options}) => {
    return (
        <div className='d-flex align-items-center w-100 mx-2 border border-success activity-options'>
        {
            options.map((o,i) => {
                return (
                    <DraggableOption
                        klass = {'font-weight-bold'}
                        key={i}
                        option = {o}
                    />
                )
            })
        }

        </div>
    )
}

ActivityOptions.propTypes = {
    options: PropTypes.array.isRequired
}

export default ActivityOptions
