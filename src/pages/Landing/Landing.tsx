// css
import styles from './Landing.module.css'

// npm modules
import { NavLink } from 'react-router-dom'

// assets
import gardening from '../../assets/gardening.svg'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  return (
    <main className={styles.landingContainer} >
      <h1>Never Enough Thyme</h1>
      <div className={styles.svgContainer}>
        <img src={gardening} alt={`A gardening icon.`} />
      </div>
      {!user ? 
      <div className={styles.buttonContainer}>
        <NavLink to="/auth/login" className={styles.navLink}><button className={styles.landingButtons}>Log In</button></NavLink>
        <NavLink to="/auth/signup" className={styles.navLink}><button className={styles.landingButtons}>Sign Up</button></NavLink>
      </div>
      : 
      null
      }
    </main>
  )
}

export default Landing
