import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../common/formElements/TextInput'
import SelectInput from '../../common/formElements/SelectInput'
import TextInputInline from '../../common/formElements/TextInputInline'
import TextAreaInput from '../../common/formElements/TextAreaInput'
import RadioInput from '../../common/formElements/RadioInput'
import { NavLink } from 'react-router-dom'

const ActivityForm = ({onChange, onSubmit, loading,
    errors, act, categoryOptions, musicOptions,
    soundOptions, colorOptions, onAddBlank}) => (

    <div className='d-flex justify-content-center align-items-center form-container flex-grow-1 py-2'>
        <div className='form-box-centered create-activity-form '>
            <form name='ActivityForm'>
                <RadioInput
                name='allow_anon'
                label='Allow Anonymous'
                onChange={onChange}
                value={act.allow_anon == true ? 'false' : 'true'}
                checked={act.allow_anon == true}
                keyId = '1'
                />
                <TextInput
                value={act.name}
                onChange={onChange}
                error={errors.name}
                name='name'
                label='Activity Name'
                placeholder='Enter activity name...'
                type='text' />

                <TextAreaInput
                value={act.text}
                onChange={onChange}
                error={errors.text}
                name='text'
                label='Activity Text'
                placeholder='Enter activity text'
                 />

                <SelectInput
                name='category'
                label='Category'
                onChange={onChange}
                defaultOption='None'
                value={act.category}
                error={errors.category}
                options={categoryOptions}
                />
                <SelectInput
                name='music'
                label='Music'
                onChange={onChange}
                defaultOption='None'
                value={act.music}
                error={errors.music}
                options={musicOptions}
                />
                <SelectInput
                name='correctSound'
                label='Correct Sound'
                onChange={onChange}
                defaultOption='None'
                value={act.incorrectSound}
                error={errors.incorrectSound}
                options={soundOptions}
                />
                <SelectInput
                name='incorrectSound'
                label='Incorrect Sound'
                onChange={onChange}
                defaultOption='None'
                value={act.correctSound}
                error={errors.correctSound}
                options={soundOptions}
                />
                <SelectInput
                name='styles backgroundColor'
                label='Background Color'
                onChange={onChange}
                defaultOption='None'
                value={act.styles.backgroundColor}
                error={errors.styles.backgroundColor}
                options={colorOptions}
                />
                <SelectInput
                name='styles color'
                label='Text Color'
                onChange={onChange}
                defaultOption='None'
                value={act.styles.color}
                error={errors.styles.color}
                options={colorOptions}
                />
                {act.blanks.length > 0 && act.blanks.map((b,i) => (
                    <div className='card border-success my-2' key={'blank'+i}>
                        <p className='lead text-center'>{`Blank ${i+1}`}</p>
                        <div className='card-body'>
                                <div className='form-group' >
                                    <TextInputInline
                                    value={act.blanks[i]}
                                    onChange={onChange}
                                    error={errors.blanks[i]}
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
                                                    error={errors.options[i][j]}
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

                ))

                }

               <div className='my-2'>
                        <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
                    </div>
                 <div className='my-2'>
                    <button className='btn btn-success' onClick={onAddBlank}>New Blank Area</button>
                </div>


            </form>
        </div>
    </div>

)
ActivityForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    act: PropTypes.object.isRequired,
    categoryOptions: PropTypes.array,
    musicOptions: PropTypes.array,
    colorOptions: PropTypes.array,
    soundOptions: PropTypes.array,
    onAddBlank: PropTypes.func.isRequired
}
export default ActivityForm
