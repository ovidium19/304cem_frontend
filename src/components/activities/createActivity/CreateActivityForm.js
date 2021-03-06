import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../common/formElements/TextInput'
import SelectInput from '../../common/formElements/SelectInput'
import SelectInputInline from '../../common/formElements/SelectInputInline'
import TextInputInline from '../../common/formElements/TextInputInline'
import TextAreaInput from '../../common/formElements/TextAreaInput'
import RadioInput from '../../common/formElements/RadioInput'
import { NavLink } from 'react-router-dom'

const ActivityForm = ({onChange, onSubmit, loading,
    errors, act, categoryOptions, musicOptions,
    soundOptions, colorOptions, onAddBlank, disabled}) => (

    <div className='d-flex justify-content-center align-items-center form-container flex-grow-1 py-2'>
        <div className='form-box-centered create-activity-form '>
            <form name='ActivityForm'>

                <fieldset className='create-activity-fieldset border border-success p-2 my-3' disabled={disabled}>

                    <legend className='create-activity-legend bg-success text-center font-weight-bold text-white'>
                        Mandatory data
                    </legend>
                    <TextInputInline
                    value={act.name}
                    onChange={onChange}
                    error={errors && errors.name}
                    name='name'
                    label='Activity Name'
                    placeholder='Enter activity name...'
                    type='text' />

                    <TextAreaInput
                    value={act.text}
                    onChange={onChange}
                    error={errors && errors.text}
                    name='text'
                    label='Activity Text'
                    placeholder='Enter activity text'
                    />
                    <SelectInputInline
                    name='category'
                    label='Category'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.category}
                    error={errors && errors.category}
                    options={categoryOptions}
                    />
                </fieldset>

                <fieldset className='create-activity-fieldset border border-success p-2 my-3'>
                    <legend className='create-activity-legend bg-success text-center font-weight-bold text-white'>
                        Styles
                    </legend>
                    <SelectInputInline
                    name='music'
                    label='Music'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.music}
                    error={errors && errors.music}
                    options={musicOptions}
                    />
                    <SelectInputInline
                    name='correctSound'
                    label='Correct Sound'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.correctSound}
                    error={errors && errors.correctSound}
                    options={soundOptions}
                    />
                    <SelectInputInline
                    name='incorrectSound'
                    label='Incorrect Sound'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.incorrectSound}
                    error={errors && errors.incorrectSound}
                    options={soundOptions}
                    />
                    <SelectInputInline
                    name='styles backgroundColor'
                    label='Background Color'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.styles.backgroundColor}
                    error={errors && errors.styles.backgroundColor}
                    options={colorOptions}
                    />
                    <SelectInputInline
                    name='styles color'
                    label='Text Color'
                    onChange={onChange}
                    defaultOption='None'
                    value={act.styles.color}
                    error={errors && errors.styles.color}
                    options={colorOptions}
                    />

                </fieldset>
                <fieldset className='create-activity-fieldset border border-success p-2 my-3'>
                    <legend className='create-activity-legend bg-success text-center font-weight-bold text-white'>
                        Settings
                    </legend>
                    <RadioInput
                    name='allow_anon'
                    label='Allow Anonymous'
                    onChange={onChange}
                    value={act.allow_anon == true ? 'false' : 'true'}
                    checked={act.allow_anon == true}
                    keyId = '1'
                    />
                    <RadioInput
                    name='allow_feedback'
                    label='Allow feedback'
                    onChange={onChange}
                    value={act.allow_feedback == true ? 'false' : 'true'}
                    checked={act.allow_feedback == true}
                    keyId = '2'
                    />
                </fieldset>
                {act.blanks.length > 0 && act.blanks.map((b,i) => (
                    <fieldset disabled={disabled} key={'blank'+i}>
                    <div className='card border-success my-3' >
                        <p className='lead text-center'>{`Blank ${i+1}`}</p>
                        <div className='card-body'>
                                <div className='form-group' >
                                    <TextInputInline
                                    value={act.blanks[i]}
                                    onChange={onChange}
                                    error={errors && errors.blanks[i]}
                                    name={`blanks ${i}`}
                                    label={`Blank area ${i+1}`}
                                    placeholder='Text you want to blank...'
                                    type='text' />
                                    <div className='card'>
                                        <div className='card-body'>
                                            <p className='lead'>Options: </p>
                                            {
                                                [0,1,2,3].map((a,j) => (
                                                    <TextInputInline
                                                    key={`options${i}${j}`}
                                                    value={act.options[i][j]}
                                                    onChange={onChange}
                                                    error={errors && errors.options[i][j]}
                                                    name={`options ${i} ${j}`}
                                                    label={`Option ${j+1}: ${j == 0 ? 'Correct(uneditable)': ''} `}
                                                    disabled={j == 0}
                                                    type='text' />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    </fieldset>

                ))

                }

               <div className='my-2'>
                        <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
                    </div>
                 <div className='my-2'>
                    <button className='btn btn-success' onClick={onAddBlank} disabled={disabled}>New Blank Area</button>
                </div>


            </form>
        </div>
    </div>

)
ActivityForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    act: PropTypes.object.isRequired,
    categoryOptions: PropTypes.array,
    musicOptions: PropTypes.array,
    colorOptions: PropTypes.array,
    soundOptions: PropTypes.array,
    onAddBlank: PropTypes.func,
}
export default ActivityForm
