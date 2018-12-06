import React from 'react'
import PropTypes from 'prop-types'
import ActivityBlank from './ActivityBlank'
const ActivityText = ({ text, blanks, onClick}) => {
    function replaceTextWithBlanks(text,blanks) {
        let newText = text
        blanks.map(b => {
            newText = newText.replace(b, `replace-blank^${b}`)
        })
        return newText
    }
    return (
        <h6 className='activity-text'>
            {
                replaceTextWithBlanks(text,blanks).split(' ').map((word,i) => {

                    return /replace-blank\^/.test(word) ?
                    <ActivityBlank correctValue = {/\^([\w ]+)$/.exec(word)[1]} onClick={onClick} key={word+i} />
                    : <span key={word+i}> {word} </span>
                })
            }
        </h6>
    )
}

ActivityText.propTypes = {
    text: PropTypes.string.isRequired,
    blanks: PropTypes.array.isRequired,
    onClick: PropTypes.func
}
export default ActivityText
