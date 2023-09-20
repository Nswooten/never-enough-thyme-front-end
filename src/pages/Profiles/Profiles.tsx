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
  console.log(profiles[0])
  return (
    <main className={styles.container}>
      <h1>Profile List</h1>
      <div className={styles.profilesContainer}>
        {profiles.map((profile: Profile) => (
          <Link to={`/profiles/${profile.id}`} >
            <div className={styles.profilenamecontainer} key={profile.id}>
              <h1 className={styles.profileH1}>{profile.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Profiles
