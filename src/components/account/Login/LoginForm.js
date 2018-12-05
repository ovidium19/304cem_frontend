import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../common/formElements/TextInput'
import { NavLink } from 'react-router-dom'

const LoginForm = ({onChange, onSubmit, loading, errors, user}) => (
    <div className='d-flex justify-content-center align-items-center form-container flex-grow-1'>
        <div className='w-100-md w-50-lg form-box-centered '>
            <form name='loginForm'>
                <TextInput
                value={user.username}
                onChange={onChange}
                error={errors.username}
                name='username'
                label='Username'
                placeholder='Enter username...'
                type='text' />

                <TextInput
                value={user.password}
                onChange={onChange}
                error={errors.password}
                name='password'
                label='Password'
                placeholder='Enter password'
                type='password' />

                <div className='row'>
                    <div className='col-4'>
                        <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
                    </div>
                    <div className='col-2' />
                    <div className='col-6'>
                        <NavLink to='/account/signup' className='small'>Register here</NavLink>
                    </div>
                </div>


            </form>
        </div>
    </div>

)
LoginForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
export default LoginForm
