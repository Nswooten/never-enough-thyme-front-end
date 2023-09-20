// css
import styles from './GardenBedCard.module.css'

// types
import { GardenBed } from "../../types/models"

interface GardenBedCardProps {
  gardenBed: GardenBed;
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const GardenBedCard = (props: GardenBedCardProps): JSX.Element => {
  const { gardenBed } = props

  return (
    <div className={styles.gardenBedCard}>
      <h1 className={styles.gardenBedCardH1}>{gardenBed.name}</h1>
      <h4 className={styles.gardenBedCardH4}>{gardenBed.height}ft X {gardenBed.width}ft</h4>
    </div>
  )
}

export default GardenBedCard