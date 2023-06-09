// npm modules
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faSquare, faSeedling, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// types
import { User } from '../../types/models'

// css
import styles from './NavBar.module.css'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props

  return (
    <nav>
      {user ?
        <div className={styles.naviconscontainer}>
          <div><NavLink to={`/profiles/${user.profile.id}`}><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#ffffff", }} /></NavLink></div>
          <div><NavLink to="/profiles"><FontAwesomeIcon icon={faUsers} size="2xl" style={{ color: "#ffffff", }} /></NavLink></div>
          <div><NavLink to="/gardenBeds"><FontAwesomeIcon icon={faSquare} size="2xl" style={{ color: "#ffffff", }} /></NavLink></div>
          <div><NavLink to="/seeds"><FontAwesomeIcon icon={faSeedling} size="2xl" style={{ color: "#ffffff", }} /></NavLink></div>

          <div><NavLink to="" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} size="2xl" style={{ color: "#ffffff", }} /></NavLink></div>
        </div>
        :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
