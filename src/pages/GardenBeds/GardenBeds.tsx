// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <main className={styles.gardenbedscontainer}>
      <h1>GardenBeds</h1>
      <Link className={styles.createagardenbed} to="/gardenBeds/new">Create a new Garden Bed</Link>
      <div className={styles.gardenBedListContainer}>
        {gardenBeds.map((gardenBed: GardenBed) => (
          <div className={styles.gardenbedcontainer}>
            <Link to={`/gardenBeds/${gardenBed.id}`} key={gardenBed.id}>
              <GardenBedCard
                key={gardenBed.id}
                gardenBed={gardenBed}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}

export default GardenBeds