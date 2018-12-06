import React from 'react'
import PropTypes from 'prop-types'
import RadioInput from '../common/formElements/RadioInput'
import SelectInput from '../common/formElements/SelectInput'
import ActivitiesSort from './ActivitiesSort'
const ActivityFilters = ({onChange, onSubmit, filters, loading, selectOptions ,sort, onSortUpdate, sortOptions}) => (
    <div className='mt-2 p-2 border border-success'>
            <form name='updateForm'>
            <div className='form-group'>
                    <RadioInput
                    name='published'
                    value='true'
                    checked={filters.published === 'true'}
                    onChange={onChange}
                    label='Published'
                    keyId='1'

                    />
                    <RadioInput
                    name='published'
                    value='false'
                    checked={filters.published === 'false'}
                    onChange={onChange}
                    label="Unpublished"
                    keyId='2'
                    />
                    <RadioInput
                    name='published'
                    value=''
                    checked={filters.published === ''}
                    onChange={onChange}
                    label="Any"
                    keyId='3'
                    />
                </div>
                <div className='form-row'>
                    <div className='col'>
                        <SelectInput
                        name='category'
                        label='Category'
                        onChange={onChange}
                        defaultOption='None'
                        value={filters.category}
                        error=''
                        options={selectOptions}
                        />
                    </div>
                    <div className='col'>
                        <ActivitiesSort
                             onChange={onSortUpdate}
                             sort = {sort}
                             sortOptions = {sortOptions}
                            />
                    </div>
                </div>
                <div className='text-center'>
                    <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Apply Filters' disabled={loading} />
                </div>

            </form>
        </div>
)
ActivityFilters.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    onSortUpdate: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    sortOptions: PropTypes.array.isRequired
}

export default ActivityFilters
