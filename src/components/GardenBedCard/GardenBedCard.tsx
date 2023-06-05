// assets

// components

// types
import { GardenBed } from "../../types/models"

interface GardenBedCardProps {
  gardenBed: GardenBed;
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const GardenBedCard = (props: GardenBedCardProps): JSX.Element => {
  const { gardenBed } = props

  return (
    <article>
      <h1>{gardenBed.name}</h1>
      <h2>{gardenBed.height} X {gardenBed.width}</h2>
    </article>
  )
}

export default GardenBedCard