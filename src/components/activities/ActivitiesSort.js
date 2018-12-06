import React from 'react'
import PropTypes from 'prop-types'
import RadioInput from '../common/formElements/RadioInput'
import SelectInput from '../common/formElements/SelectInput'

const ActivitiesSort = ({onChange, sort, sortOptions}) => (
        <SelectInput
        name='sort'
        label='Sort By: '
        onChange={onChange}
        defaultOption='None'
        value={sort}
        error=''
        options={sortOptions}
        />
)
ActivitiesSort.propTypes = {
    onChange: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    sortOptions: PropTypes.array.isRequired
}

export default ActivitiesSort
