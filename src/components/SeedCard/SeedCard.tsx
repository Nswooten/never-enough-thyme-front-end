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
  seedIdx?: number;
  handleAddSeedToGardenBed?: (gardenBedId: string, seedId: string) => Promise<void>;
  handleRemoveSeedFromGardenBed?: (gardenBedId: string, seedId: string, seedIdx: number | undefined) => Promise<void>;
}
const SeedCard = (props: SeedCardProps): JSX.Element => {
  const { seed, gardenBedDetails, handleAddSeedToGardenBed, handleRemoveSeedFromGardenBed, profileId, seedIdx } = props
  if (gardenBedDetails) {
    return (
      <article>
        <div>
          {profileId === gardenBedDetails.profileId && handleRemoveSeedFromGardenBed &&
            <div>
              <Icon vegetable={`image${seed.id}`} />
              <button onClick={() => handleRemoveSeedFromGardenBed(gardenBedDetails.id.toString(), seed.id.toString(), seedIdx)}>
                Delete
              </button>
            </div>
          }
          {profileId === gardenBedDetails.profileId && handleAddSeedToGardenBed &&
            <div>
            <div>{seed.name}</div>
              <Icon vegetable={`image${seed.id}`} />
            <button onClick={() => handleAddSeedToGardenBed(gardenBedDetails.id.toString(), seed.id.toString())}>
              Add
            </button>
          <Link to={`/seeds/${seed.id}`}>
          </Link>
            </div>
          }
        </div>
      </article>
    )
  } else {
    return (
      <main>
        <Link to={`/seeds/${seed.id}`}>
        <Icon vegetable={`image${seed.id}`} />
        </Link>
        <h1>{seed.name}</h1>
        <h4>{seed.spacingHeight}in X {seed.spacingWidth}in</h4>
      </main>
    )
  }

}

export default SeedCard