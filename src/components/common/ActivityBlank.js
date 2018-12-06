import React from 'react'
import PropTypes from 'prop-types'

const ActivityBlank = ({correctValue, onClick}) => {
    function onClickBlank(e) {
        e.preventDefault()
        onClick(correctValue)
    }

    return (
        <span className='activity-blank' onClick={onClickBlank}>
             {'_'.repeat(correctValue.length)}
        </span>
    )
}
ActivityBlank.propTypes = {
    correctValue: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default ActivityBlank
