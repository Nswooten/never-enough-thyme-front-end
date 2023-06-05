// npm modules
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as gardenBedService from '../../services/gardenBedService'

// css
import styles from './GardenBeds.module.css'

// components
import GardenBedCard from '../../components/GardenBedCard/GardenBedCard'

// types
import { GardenBed } from '../../types/models'

const GardenBeds = (): JSX.Element => {
  const [gardenBeds, setGardenBeds] = useState<GardenBed[]>([])
  useEffect((): void => {
    const fetchGardenBeds = async (): Promise<void> => {
      try {
        const gardenBedsData: GardenBed[] = await gardenBedService.index()
        setGardenBeds(gardenBedsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGardenBeds()
  }, [])
  

  return ( 
    <main className={styles.container}>
      <h1>Hello. This is a list of all the gardenBeds.</h1>
      {gardenBeds.map((gardenBed: GardenBed) => (
        <Link to={`/gardenBeds/${gardenBed.id}`} key={gardenBed.id}>
          <GardenBedCard
          key={gardenBed.id}
          gardenBed={gardenBed}
          />
        </Link>
      ))}
    </main>
  )
}
 
export default GardenBeds