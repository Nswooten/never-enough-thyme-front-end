// npm modules
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//components
import Icon from '../../components/Icon/Icon'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//css
import styles from './SeedCard.module.css'

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
  const [isHovered, setIsHovered] = useState(false)
  const { seed, gardenBedDetails, handleAddSeedToGardenBed, handleRemoveSeedFromGardenBed, profileId, seedIdx } = props
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  if (gardenBedDetails) {
    return (
      <>
        {profileId === gardenBedDetails.profileId && handleRemoveSeedFromGardenBed &&
          <div
            className={styles.seedCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {!isHovered &&
              <Icon vegetable={`image${seed.id}`} />
            }
            {isHovered &&
              <button className={styles.deleteButton} onClick={() => handleRemoveSeedFromGardenBed(gardenBedDetails.id.toString(), seed.id.toString(), seedIdx)}>
                <FontAwesomeIcon icon={faTrash} size="2xl" style={{ color: "#ffffff", }} />
              </button>
            }
          </div>
        }
        {profileId === gardenBedDetails.profileId && handleAddSeedToGardenBed &&
          <div className={styles.seedcardcontainer}>
            <div>{seed.name}</div>
            <Link to={`/seeds/${seed.id}`}>
              <Icon vegetable={`image${seed.id}`} />
            </Link>
            <button onClick={() => handleAddSeedToGardenBed(gardenBedDetails.id.toString(), seed.id.toString())}>
              Add
            </button>
          </div>
        }
        {!(profileId === gardenBedDetails.profileId) &&
          <>
            <Link className={styles.link} to={`/seeds/${seed.id}`}>
              <Icon vegetable={`image${seed.id}`} />
            </Link>
          </>
        }
      </>
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

