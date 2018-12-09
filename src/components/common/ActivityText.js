import React from 'react'
import PropTypes from 'prop-types'
import ActivityBlank from './ActivityBlank'
const ActivityText = ({ text, blanks, onDrag, klass, showValues}) => {
    function replaceTextWithBlanks(text,blanks) {
        let newText = text
        blanks.map(b => {
            newText = newText.replace(b, `replace-blank^${b}`)
        })
        return newText
    }
    return (
        <p className={`activity-text ${klass}`}>
            {
                replaceTextWithBlanks(text,blanks).split(' ').map((word,i) => {
                    if (/replace-blank\^/.test(word)){
                        let correctValue = /\^([\w ]+)\b/.exec(word)[1]
                        let index = blanks.find(b => b == correctValue)
                        console.log(index)
                        return (
                            <ActivityBlank
                            correctValue = {correctValue}
                            report={onDrag}
                            key={word+i}
                            index = {index}
                            showValue = {showValues[index]}/>
                        )

                    }
                    else {
                        return  <span key={word+i}> {word} </span>
                    }
                })
            }
        </p>
    )
}

ActivityText.propTypes = {
    text: PropTypes.string.isRequired,
    blanks: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    klass: PropTypes.string,
    onDrag: PropTypes.func,
    showValues: PropTypes.array
}
export default ActivityText
