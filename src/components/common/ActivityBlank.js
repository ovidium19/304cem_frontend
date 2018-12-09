import React from 'react'
import PropTypes from 'prop-types'
import * as types from '../game/itemTypes'
import {DropTarget} from 'react-dnd'

const dropTarget = {
    drop(props,monitor) {
        let elem = monitor.getItem()
        props.report(elem.text,props.index)
    }
}
function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
const ActivityBlank = ({correctValue, showValue, report, index, connectDropTarget, isOver}) => {
    return connectDropTarget(
        <span className='activity-blank' style={{background: isOver ? 'green' : 'inherit'}}>
            { showValue ? showValue : '_'.repeat(correctValue.length) }
        </span>
    )
}
ActivityBlank.propTypes = {
    correctValue: PropTypes.string.isRequired,
}

export default DropTarget(types.OPTION, dropTarget, collect)(ActivityBlank)
