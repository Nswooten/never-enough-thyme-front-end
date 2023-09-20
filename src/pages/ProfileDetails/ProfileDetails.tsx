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
import { GardenBed, Profile, User } from '../../types/models'

interface ProfileDetailsProps {
  user: User | null;
}

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const [profileDetails, setProfileDetails] = useState<Profile>()
  const { profileId } = useParams()
  console.log(user)
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
        {user?.profile.id === parseInt(profileId || "") && (
          <div>
            <Link to="/auth/change-password">
              <div className={styles.changepassword}>
                Change Password
              </div>
            </Link>
            <Link to="/gardenBeds/new">
              <div className={styles.createagardenbed}>
                Create a new Garden Bed
              </div>
            </Link>
          </div>
        )}
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
        <h1>Loading...</h1>
      </main>
    )
  }
}

export default ProfileDetails