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
                <NavLink to='/app/courses' className='nav-link'>Learn</NavLink>
            </li>

        { logged &&
                <li className={`nav-item dropdown ${/hub$/g.test(location) ? 'active' : ''}`}>
                   <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                    Your Hub
                    </a>
                    <div className="dropdown-menu">
                        <NavLink to={`/app/user/${username}/activities`} className='dropdown-item'>Activities</NavLink>
                        <NavLink to={`/app/user/${username}/stats`} className='dropdown-item'>Stats</NavLink>
                    </div>
                </li>
        }
             <li className={`nav-item ${location == '/about' ? 'active' : ''}`}>
                <NavLink to='/app/about' className='nav-link'>About</NavLink>
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
