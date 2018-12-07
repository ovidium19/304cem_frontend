import React from 'react'
import PropTypes from 'prop-types'

const TextAreaInput = ({name, label, placeholder, onChange, value, error, klass}) => (
    <div className={`form-group ${error && 'has-error'} ${klass}`}>
        <label htmlFor={name+'id'}>{label}</label>
        <textarea className={`form-control ${error && 'border-danger'}`} value={value} name={name} placeholder={placeholder} onChange={onChange} id={name+'id'} />
        {error &&
            <small id={name+'help'} className="form-text text-danger">{error}</small>
        }
    </div>
)

TextAreaInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    klass: PropTypes.string
}

export default TextAreaInput
