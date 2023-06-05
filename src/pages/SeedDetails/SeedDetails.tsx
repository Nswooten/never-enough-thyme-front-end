// npm modules
import { useState, useEffect, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as seedService from '../../services/seedService'

// css
// import styles from './GardenBeds.module.css'

// components
// import GardenBedCard from '../../components/GardenBedCard/GardenBedCard'

// types
import { GardenBed, Seed } from '../../types/models'
import SeedCard from '../../components/SeedCard/SeedCard'

const SeedDetails = (): JSX.Element => {
  const [seedDetails, setSeedDetails] = useState<Seed>()
  const { seedId } = useParams()
  useEffect((): void => {
    const fetchSeedDetails = async (): Promise<void> => {
      try {
      if(seedId){
        const seedData: Seed = await seedService.show(seedId)
        setSeedDetails(seedData)
      }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSeedDetails()
  }, [seedId])
  
  if(seedDetails){
  return ( 
    <main >
      <h1>{seedDetails.name}</h1>
    </main>
  )
  }else{
    return (
      <main >
      <h1>Hello. This should be a seed.</h1>
      </main>
    )
  }
}
 
export default SeedDetails