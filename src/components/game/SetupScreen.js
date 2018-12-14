import React from 'react'
import PropTypes from 'prop-types'
import RadioInput from '../common/formElements/RadioInput'
import SelectInputInline from '../common/formElements/SelectInputInline'
const SetupScreen = ({ onChange, onSubmit, errors, categoryOptions, params}) => {

    return (
        <div className='d-flex justify-content-center align-items-center flex-nowrap flex-column'>
            <p className='display-4'>Hello {params.username}</p>
            <div className='instructions border border-white jumbotron'>
                <h4 className='font-weight-bold text-center'>Instructions</h4>
                <ol className='instruction-list p-3'>
                 <li><span>1.</span><p>You will receive 5 questions from your chosen category.</p></li>
                 <li><span>2.</span><p>Each question has a 30 second timer. If you don't submit an answer in time, it will count as wrong.</p></li>
                 <li><span>3.</span><p>Question text will appear on screen with blanked areas. You need to find the right answer for each blank area.</p></li>
                 <li><span>4.</span><p>Answers will be at the bottom of the screen. Drag and drop answers on blank areas to fill them.</p></li>
                 <li><span>5.</span><p>When you submit your answer, some questions will have a wrong or right sound which can let your know if it was correct</p></li>
                 <li><span>6.</span><p>When you finish the 5 questions, the result screen will show up. You can rate the questions and leave feedback if available.</p></li>
                </ol>
            </div>
            <form name='params' className='w-75'>
                <div className='param-set border border-danger p-2 mt-2'>
                    <SelectInputInline
                            name='category'
                            label='Category'
                            onChange={onChange}
                            defaultOption='Random'
                            value={params.category}
                            error={errors && errors.category}
                            options={categoryOptions}
                        />
                    <RadioInput
                        name='allow_anon'
                        label='Only questions that allow anonymous answers'
                        onChange={onChange}
                        value={params.allow_anon == true ? 'false' : 'true'}
                        checked={params.allow_anon == true}
                        keyId = '1'
                        />
                </div>
                <div className='start-button mt-3 text-center'>
                    <button className='btn btn-success' onClick={onSubmit}>Start Game</button>
                </div>
            </form>
        </div>
    )
}
SetupScreen.propTypes = {
    params: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    categoryOptions: PropTypes.array
}

export default SetupScreen
