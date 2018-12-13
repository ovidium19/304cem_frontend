import React from 'react'
import PropTypes from 'prop-types'
import * as types from '../game/itemTypes'
import {DropTarget} from 'react-dnd'

const dropTarget = {
    drop(props,monitor) {
        let elem = monitor.getItem()
        props.report(elem.text,props.index, props.showValue)
    }
}
function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
export const ActivityBlank = ({correctValue, showValue, report, index, connectDropTarget, isOver}) => {
    console.log(showValue)
    if (showValue==undefined) {
        return (
            <span className='activity-blank' style={{background: isOver ? 'green' : 'inherit'}}>
            { '_'.repeat(correctValue.length) }
            </span>
        )
    }
    return connectDropTarget(
        <span className='activity-blank' style={{background: isOver ? 'green' : 'inherit'}}>
            { showValue && showValue.length > 0 ? showValue : '_'.repeat(correctValue.length) }
        </span>
    )
}
ActivityBlank.propTypes = {
    correctValue: PropTypes.string.isRequired,
}

export const ActivityBlankConnected =  DropTarget(types.OPTION, dropTarget, collect)(ActivityBlank)
