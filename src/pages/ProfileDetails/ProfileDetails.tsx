// npm modules
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

// css
// import Styles from './ProfileDetails.module.css'

// types
import { GardenBed, Profile } from '../../types/models'
import GardenBedCard from '../../components/GardenBedCard/GardenBedCard'

const ProfileDetails = (): JSX.Element => {
  const [profileDetails, setProfileDetails] = useState<Profile>()
  const { profileId } = useParams()
  useEffect((): void => {
    const fetchProfileDetails = async (): Promise<void> => {
      try {
      if(profileId){
        const profileData: Profile = await profileService.show(profileId)
        setProfileDetails(profileData)
      }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileDetails()
  }, [profileId])
  
  if(profileDetails){
  return ( 
    <main >
      <h1>{profileDetails.name}'s' Profile</h1>
      {profileDetails.gardenBeds.length > 0 && 
        profileDetails.gardenBeds.map((gardenBed: GardenBed) =>(
          <Link to={`/gardenBeds/${gardenBed.id}`} key={gardenBed.id}>
            <div>
              <GardenBedCard gardenBed={gardenBed}/>
            </div>
          </Link>
        ))
      }
    </main>
  )
  }else{
    return (
      <main >
      <h1>Hello. This should be a profile.</h1>
      </main>
    )
  }
}
 
export default ProfileDetails