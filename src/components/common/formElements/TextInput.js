import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({name, label, placeholder, onChange, error, value, type}) => (
    <div className={`form-group ${error && 'has-error'}`}>
        <label htmlFor={name+'id'}>{label}</label>
        <input type={type} className={`form-control ${error && 'border-danger'}`} value={value} name={name} placeholder={placeholder} onChange={onChange} id={name+'id'} />
        {error &&
            <small id={name+'help'} className="form-text text-danger">{error}</small>
        }
    </div>
)
TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default TextInput
