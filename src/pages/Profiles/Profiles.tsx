// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './Profiles.module.css'


// types
import { Profile } from '../../types/models'

const Profiles = (): JSX.Element => {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className={styles.container}>
      <h1>Profile List</h1>
      {profiles.map((profile: Profile) => (
        <div className={styles.profilenamecontainer} key={profile.id}>
          <Link to={`/profiles/${profile.id}`} >
            <h1>{profile.name}</h1>
          </Link>
        </div>
      ))}
    </main>
  )
}

export default Profiles
