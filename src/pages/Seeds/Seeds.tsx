import { useState, useEffect } from 'react'

// services
import * as seedService from '../../services/seedService'

// css
import styles from './Seeds.module.css'

// components
import SeedCard from '../../components/SeedCard/SeedCard'

// types
import { GardenBed, Seed } from '../../types/models'
import { Link } from 'react-router-dom'

const Seeds = (): JSX.Element => {
  const [seeds, setSeeds] = useState<Seed[]>([])
  useEffect((): void => {
    const fetchSeeds = async (): Promise<void> => {
      try {
        const seedsData: Seed[] = await seedService.index()
        setSeeds(seedsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSeeds()
  }, [])
  

  return ( 
    <main className={styles.container}>
      <h1>Hello. This is a list of all the Seeds.</h1>
      {seeds.map((seed: Seed) => (
        <Link to={`/seeds/${seed.id}`} key={seed.id}>
          <div>
            <SeedCard seed={seed}/>
          </div>
        </Link>
      ))
      }
    </main>
  )
}
 
export default Seeds