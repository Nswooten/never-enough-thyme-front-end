// npm modules
import { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'

//components
import Icon from '../../components/Icon/Icon'

// services
import * as seedService from '../../services/seedService'

// css
import styles from './SeedDetails.module.css'

// types
import { Seed } from '../../types/models'

const SeedDetails = (): JSX.Element => {
  const [seedDetails, setSeedDetails] = useState<Seed>()
  const { seedId } = useParams()

  useEffect((): void => {
    const fetchSeedDetails = async (): Promise<void> => {
      try {
        if (seedId) {
          const seedData: Seed = await seedService.show(seedId)
          setSeedDetails(seedData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSeedDetails()
  }, [seedId])

  if (seedDetails) {
    return (
      <main className={styles.mainseedcontainer}>
        <div className={styles.seeddetailscontainer}>
          <h1>{seedDetails.name}</h1>
          <div className={styles.imagecontainer}>
            <Icon vegetable={`image${seedDetails.id}`} />
          </div>
          <h4>{seedDetails.instructions}</h4>
          <span>Plant Type: {seedDetails.plantType}</span>
          <ul>
            <li>Days to Germinate: {seedDetails.daysToGerm}</li>
            <li>Days to Maturity: {seedDetails.daysToMaturity}</li>
            <li>Days to Harvest: {seedDetails.daysToHarvest}</li>
            <li>Grows up to {seedDetails.growingHeight} inches tall</li>
            <li>You should plant rows {seedDetails.spacingHeight}'' apart</li>
            <li>Each individual plant should be {seedDetails.spacingWidth}'' away from the adjacent plant on each row</li>
            <li>This plant grows best in {seedDetails.growsBestIn.toLowerCase()}</li>
            <li>You should plant these seeds {seedDetails.plantingDepth}'' deep</li>
          </ul>
        </div>
      </main>
    )
  } else {
    return (
      <main >
        <h1>Hello. This should be a seed.</h1>
      </main>
    )
  }
}

export default SeedDetails