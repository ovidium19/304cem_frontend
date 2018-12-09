import React from 'react'
import PropTypes from 'prop-types'
import * as types from './itemTypes'
import {DragSource} from 'react-dnd'

const optionSource = {
    beginDrag(props) {
        return {
            text: props.option
        }
    }
}
function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}
const DraggableOption = ({option, connectDragSource, isDragging}) => {
    let id = option.replace(/ /g, '')
    console.log(id)
    return connectDragSource(
        <div className='btn btn-dark text-white option' style={{opacity: isDragging ? 0.75 : 1}} id={id}>{option}</div>
    )
}

DraggableOption.propTypes = {
    option: PropTypes.string
}

export default DragSource(types.OPTION, optionSource, collect)(DraggableOption)
