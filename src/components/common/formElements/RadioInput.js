import React from 'react'
import PropTypes from 'prop-types'

const RadioInput = ({name, label, checked, onChange, value, keyId}) => (
    <div className='form-check'>
        <input type='checkbox'
        className='form-check-input'
        value={value} name={name}
        onChange={onChange}
        id={name+'id'+keyId}
        checked={checked} />
        <label htmlFor={name+'id1'} className='form-check-label'>{label}</label>
    </div>
)
RadioInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    keyId:PropTypes.string.isRequired

}

export default RadioInput
