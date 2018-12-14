import React from 'react'
import PropTypes from 'prop-types'
import { NavLink} from 'react-router-dom'

const WelcomeUserMessage = ({user}) => (
    <div className = 'py-2 d-flex justify-content-center flex-column align-items-center user-welcome'>
        <p className='my-2 display-4'>{`Welcome ${user.name}`}</p>
        <p className='text-muted'>{`Account created: ${user.date_created}`}</p>
        <div className=''>
            <p>
                <span>See your {<NavLink to={`/app/user/${user.username}/activities`} className='text-link'>Activities here</NavLink>}</span>
                <span> or your {<NavLink to={`/app/user/${user.username}/stats`} className='text-link'>Stats here</NavLink>}</span>


            </p>
        </div>

    </div>
)
WelcomeUserMessage.propTypes = {
    user: PropTypes.object.isRequired
}
export default WelcomeUserMessage
