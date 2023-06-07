// npm modules
import { Link } from 'react-router-dom'

//components
import Icon from '../../components/Icon/Icon'
//css
// import Styles from './SeedCard.module.css'

// types
import { GardenBed, Seed } from "../../types/models"

interface SeedCardProps {
  seed: Seed;
  gardenBedDetails?: GardenBed;
  profileId?: number;
  handleAddSeedToGardenBed?: (gardenBedId: string, seedId: string) => Promise<void>;
  handleRemoveSeedFromGardenBed?: (gardenBedId: string, seedId: string) => Promise<void>;
}
const SeedCard = (props: SeedCardProps): JSX.Element => {
  const { seed, gardenBedDetails, handleAddSeedToGardenBed, handleRemoveSeedFromGardenBed, profileId } = props
if(gardenBedDetails){
  return (
      <article>
      <div>
        <Icon vegetable="plant"/>
      {profileId === gardenBedDetails.profileId && handleRemoveSeedFromGardenBed &&
      <button onClick={() => handleRemoveSeedFromGardenBed(gardenBedDetails.id.toString(), seed.id.toString())}>
        Delete
      </button>
      }
      {profileId === gardenBedDetails.profileId && handleAddSeedToGardenBed &&
      <button onClick={() => handleAddSeedToGardenBed(gardenBedDetails.id.toString(), seed.id.toString())}>
        Add
      </button>
      }
      <Link to={`/seeds/${seed.id}`}>
        <div>{seed.name}</div>
      </Link>
      </div>
    </article>
  )
}else{
  return (
    <main>
      <Link to={`/seeds/${seed.id}`}>
        <h1>{seed.name}</h1>
      </Link>
      <h4>{seed.spacingHeight}in X {seed.spacingWidth}in</h4>
    </main>
  )
}

}

export default SeedCard