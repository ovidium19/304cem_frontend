import React from 'react'
import PropTypes from 'prop-types'

const ActivityTitleDiv = ({title, text, status, color, onPublish}) => (
    <div className='jumbotron my-3 ml-3'>
        <p className='display-4 text-center'>{title}</p>
        <p className='lead text-success font-weight-bold text-center'>{text}</p>
        <p className='lead'>Status: <span style={{color: color ? color : 'green'}}>{status}</span></p>
        <div className='update-options'>
            <button className={`btn float-right ${status === 'Unpublished' ? 'btn-success' : 'btn-danger'}`} onClick={onPublish}>
                {status === 'Unpublished' ? 'Publish' : 'Unpublish'}
            </button>
        </div>
    </div>
)
ActivityTitleDiv.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string,
    onPublish: PropTypes.func
}

export default ActivityTitleDiv
