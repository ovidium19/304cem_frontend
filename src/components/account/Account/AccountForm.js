import React from 'react'
import PropTypes from 'prop-types'
import RadioInput from '../../common/formElements/RadioInput'


const AccountForm = ({onChange, onSubmit, loading, user, role}) => (
    <div className='d-flex justify-content-center align-items-center flex-column form-container flex-grow-1 py-2'>
        <div>
            <p className='text-muted'>
                Your current role is: {/reviewer/.test(role) ? 'Advanced User': 'Basic User'}.
                You can update your role from below.
            </p>
        </div>
        <div className='w-100-md w-50-lg form-box-centered '>
            <form name='updateForm'>
            <div className='form-group'>
                    <RadioInput
                    name='roles'
                    value='user'
                    checked={user.roles === 'user'}
                    onChange={onChange}
                    label='Basic user'
                    keyId='1'

                    />
                    <RadioInput
                    name='roles'
                    value='user reviewer'
                    checked={user.roles === 'user reviewer'}
                    onChange={onChange}
                    label="Advanced user (Review and publish other user's questions"
                    keyId='2'
                    />

                </div>
                <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
            </form>
        </div>
    </div>

)
AccountForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    role: PropTypes.string
}
export default AccountForm
