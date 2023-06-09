import { useState, useEffect } from 'react'

// services
import * as seedService from '../../services/seedService'

// css
import styles from './Seeds.module.css'

// components
import SeedCard from '../../components/SeedCard/SeedCard'

// types
import { Seed } from '../../types/models'

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
    <main >
      <div className={styles.seedscontainer}>
        {seeds.map((seed: Seed) => (
          <div key={seed.id}>
            <SeedCard seed={seed} />
          </div>
        ))
        }
      </div >
    </main>

  )
}

export default Seeds