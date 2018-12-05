import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const UserMenu = ({logged, location, username}) => (
    <React.Fragment>
        <ul className="navbar-nav">
            <li className={`nav-item ${location == '/' ? 'active' : ''}`}>
                <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
            <li className={`nav-item ${location == '/courses' ? 'active' : ''}`}>
                <NavLink to='/courses' className='nav-link'>Learn</NavLink>
            </li>

        { logged &&
                <li className={`nav-item ${/hub$/g.test(location) ? 'active' : ''}`}>
                    <NavLink to={`/user/${username}/hub`} className='nav-link'>Your Hub</NavLink>
                </li>
        }
             <li className={`nav-item ${location == '/about' ? 'active' : ''}`}>
                <NavLink to='/about' className='nav-link'>About</NavLink>
            </li>
        </ul>
    </React.Fragment>
)
UserMenu.propTypes = {
    location: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    logged: PropTypes.bool.isRequired
}
export default UserMenu
