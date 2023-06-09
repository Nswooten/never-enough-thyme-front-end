// npm modules
import { useState, useEffect, } from 'react'
import { Link, } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as gardenBedService from '../../services/gardenBedService'
import * as seedService from '../../services/seedService'

// css
import styles from './GardenBedDetails.module.css'


// types
import { GardenBed, Seed } from '../../types/models'
import SeedCard from '../../components/SeedCard/SeedCard'
import { User } from '../../types/models'


interface GardenDetailsProps {
  user?: User | null;
  profileId?: number;
  handleDeleteGardenBed: (gardenBedId: string) => Promise<void>;
}

const GardenBedDetails = (props: GardenDetailsProps): JSX.Element => {
  const { profileId, handleDeleteGardenBed } = props
  const [gardenBedDetails, setGardenBedDetails] = useState<GardenBed>()
  const [seeds, setSeeds] = useState<Seed[]>([])
  const { gardenBedId } = useParams()

  useEffect((): void => {
    const fetchGardenBedDetails = async (): Promise<void> => {
      try {
        if (gardenBedId) {
          const gardenBedData: GardenBed = await gardenBedService.show(gardenBedId)
          setGardenBedDetails(gardenBedData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchGardenBedDetails()
  }, [gardenBedId])


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

  const handleAddSeedToGardenBed = async (gardenBedId: string, seedId: string): Promise<void> => {
    const newSeedInfo = await gardenBedService.associateSeed(gardenBedId, seedId)
    if (gardenBedDetails) {
      setGardenBedDetails({
        ...gardenBedDetails,
        seeds: [newSeedInfo.seed, ...gardenBedDetails.seeds],
      })
    }
  }

  const handleRemoveSeedFromGardenBed = async (gardenBedId: string, seedId: string, seedIdx: number | undefined): Promise<void> => {
    await gardenBedService.deleteSeedAssociation(gardenBedId, seedId)
    if (gardenBedDetails) {
      setGardenBedDetails({
        ...gardenBedDetails, seeds: gardenBedDetails.seeds.filter((_, idx) => {
          return idx !== seedIdx
        })
      })
    }
  }


  if (gardenBedDetails && profileId === gardenBedDetails.profileId) {
    return (
      <main className={styles.gardenbedpage}>
        <div className={styles.gardenbeddetailscontainer}>
          <div className={styles.gardenbednamecontainer}>
            <h1>{gardenBedDetails.name}</h1>
            <h4 className={styles.gardenbedh4}>{gardenBedDetails.height}ft X {gardenBedDetails.width}ft</h4>
            {profileId === gardenBedDetails.profileId && gardenBedId &&
              <>
                <Link to={`/gardenBeds/${gardenBedId}/edit`} state={gardenBedDetails}>
                  <button>
                    Edit
                  </button>
                </Link>
                <button onClick={() => handleDeleteGardenBed(gardenBedId)}>
                  Delete
                </button>
              </>
            }
          </div>
          <div className={styles.gardenbed}>
            {gardenBedDetails.seeds.length > 0 &&
              gardenBedDetails.seeds.map((seed: Seed, index: number) => (
                <div
                  className={styles.seedsingardenbed}
                  style={{
                    width: `${(800 / (gardenBedDetails.width * 12)) * seed.spacingWidth}px`,
                    height: `${(800 / (gardenBedDetails.height * 12)) * seed.spacingHeight}px`
                  }}
                  key={index}>
                  <SeedCard
                    seed={seed}
                    seedIdx={index}
                    gardenBedDetails={gardenBedDetails}
                    profileId={profileId}
                    handleRemoveSeedFromGardenBed={handleRemoveSeedFromGardenBed}
                  />
                </div>
              ))
            }
          </div>
        </div>
        {profileId === gardenBedDetails.profileId &&
          <>
            <div>
              <h1>This is a list of all the Seeds.</h1>
              <div className={styles.seedlistcontainer}>
                {seeds.map((seed: Seed) => (
                  <div key={seed.id}>
                    <SeedCard
                      seed={seed}
                      profileId={profileId}
                      gardenBedDetails={gardenBedDetails}
                      handleAddSeedToGardenBed={handleAddSeedToGardenBed}
                    />
                  </div>
                ))
                }
              </div>

            </div>
          </>
        }
      </main>
    )
  } else if (gardenBedDetails) {
    return (
      <main className={styles.gardenbedpage}>
        <div>
          <h1>{gardenBedDetails.name}</h1>
          <h4>{gardenBedDetails.height}ft X {gardenBedDetails.width}ft</h4>
          {profileId === gardenBedDetails.profileId && gardenBedId &&
            <>
              <Link to={`/gardenBeds/${gardenBedId}/edit`} state={gardenBedDetails}>
                <button>
                  Edit
                </button>
              </Link>
              <button onClick={() => handleDeleteGardenBed(gardenBedId)}>
                Delete
              </button>
            </>
          }
        </div>
        <div className={styles.gardenbed}>
          {gardenBedDetails.seeds.length > 0 &&
            gardenBedDetails.seeds.map((seed: Seed, index: number) => (
              <div
                className={styles.seedsingardenbed}
                style={{
                  width: `${(800 / (gardenBedDetails.width * 12)) * seed.spacingWidth}px`,
                  height: `${(800 / (gardenBedDetails.height * 12)) * seed.spacingHeight}px`
                }}
                key={index}>
                <SeedCard
                  seed={seed}
                  seedIdx={index}
                  gardenBedDetails={gardenBedDetails}
                  profileId={profileId}
                  handleRemoveSeedFromGardenBed={handleRemoveSeedFromGardenBed}
                />
              </div>
            ))
          }
        </div>
      </main>
    )
  } else {
    return (
      <main>
        this should be a Garden bed and its details.
      </main>

    )
  }
}

export default GardenBedDetails