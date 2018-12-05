import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../common/formElements/TextInput'
import { NavLink } from 'react-router-dom'

const SignupForm = ({onChange, onSubmit, loading, errors, user}) => (
    <div className='d-flex justify-content-center align-items-center form-container flex-grow-1'>
        <div className='w-100-md w-50-lg form-box-centered '>
            <form name='SignupForm'>
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

                <TextInput
                value={user.repeatPassword}
                onChange={onChange}
                error={errors.repeatPassword}
                name='repeatPassword'
                label='Confirm Password'
                placeholder='Enter password again...'
                type='password' />

                <TextInput
                value={user.email}
                onChange={onChange}
                error={errors.email}
                name='email'
                label='E-mail'
                placeholder='xxx@y.zzz'
                type='email' />

                <TextInput
                value={user.name}
                onChange={onChange}
                error={errors.name}
                name='name'
                label='Name'
                placeholder=''
                type='text' />

                <div className='row'>
                    <div className='col-4'>
                        <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
                    </div>
                    <div className='col-2' />
                    <div className='col-6'>
                        <NavLink to='/account/login' className='small'>Already have an account? Log in here</NavLink>
                    </div>
                </div>


            </form>
        </div>
    </div>

)
SignupForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
export default SignupForm
