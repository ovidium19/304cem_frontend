import React from 'react'
import PropTypes from 'prop-types'

const SelectInputInline = ({name, label, onChange, defaultOption, value, error, options}) => {
  return (
    <div className="form-group row">
      <label htmlFor={name} className='col-4'>{label}</label>
      <span className='col-2'/>
      <div className="field col">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control">
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

SelectInputInline.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
}

export default SelectInputInline
