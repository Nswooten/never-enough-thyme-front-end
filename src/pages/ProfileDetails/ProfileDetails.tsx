// npm modules
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './ProfileDetails.module.css'

//components
import GardenBedCard from '../../components/GardenBedCard/GardenBedCard'

// types
import { GardenBed, Profile } from '../../types/models'

const ProfileDetails = (): JSX.Element => {
  const [profileDetails, setProfileDetails] = useState<Profile>()
  const { profileId } = useParams()

  useEffect((): void => {
    const fetchProfileDetails = async (): Promise<void> => {
      try {
        if (profileId) {
          const profileData: Profile = await profileService.show(profileId)
          setProfileDetails(profileData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileDetails()
  }, [profileId])

  if (profileDetails) {
    return (
      <main className={styles.profiledetailscontainer}>
        <h1>{profileDetails.name}'s' Profile</h1>
        <div className={styles.changepassword}><Link to="/auth/change-password">Change Password</Link></div>
        <div className={styles.createagardenbed}><Link to="/gardenBeds/new">Create a new Garden Bed</Link></div>
        {profileDetails.gardenBeds.length > 0 &&
          profileDetails.gardenBeds.map((gardenBed: GardenBed) => (
            <Link to={`/gardenBeds/${gardenBed.id}`} key={gardenBed.id}>
              <div className={styles.garbencontainer}>
                <GardenBedCard gardenBed={gardenBed} />
              </div>
            </Link>
          ))
        }
      </main>
    )
  } else {
    return (
      <main >
        <h1>Hello. This should be a profile.</h1>
      </main>
    )
  }
}

export default ProfileDetails