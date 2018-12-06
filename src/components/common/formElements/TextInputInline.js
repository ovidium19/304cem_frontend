import React from 'react'
import PropTypes from 'prop-types'

const TextInputInline = ({name, label, placeholder, onChange, error, value, type, klass, disabled}) => (
    <div className={`form-group-row ${error && 'has-error'} ${klass}`}>
        <label className='col-form-label-sm col-4' htmlFor={name+'id'}>{label}</label>
        <span className='col-2'></span>
        <div className='col-6'>
            <input type={type}
            className={`form-control-sm ${error && 'border-danger'}`}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            id={name+'id'}
            disabled={disabled ? disabled : false} />
            {error &&
                <small id={name+'help'} className="form-text text-danger">{error}</small>
            }
        </div>

    </div>
)
TextInputInline.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    klass: PropTypes.string,
    disabled: PropTypes.bool
}

export default TextInputInline
