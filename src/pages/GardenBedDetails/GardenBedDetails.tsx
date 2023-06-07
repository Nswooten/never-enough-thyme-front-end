// npm modules
import { useState, useEffect, } from 'react'
import { Link, } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as gardenBedService from '../../services/gardenBedService'
import * as seedService from '../../services/seedService'

// // css
// import styles from './GardenBeds.module.css'


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
      if(gardenBedId){
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
    if(gardenBedDetails){
      setGardenBedDetails({
        ...gardenBedDetails,
        seeds: [newSeedInfo.seed, ...gardenBedDetails.seeds],
      })
    }
  }

  const handleRemoveSeedFromGardenBed = async (gardenBedId: string, seedId: string): Promise<void> => {
    const deletedSeedInfo = await gardenBedService.deleteSeedAssociation(gardenBedId, seedId)
    if (gardenBedDetails) {
      const seedIndex = gardenBedDetails.seeds.findIndex((seed) => seed.id === deletedSeedInfo.seed.id)
      console.log(seedIndex);
      
      if (seedIndex !== -1) {
        gardenBedDetails.seeds.splice(seedIndex, 1)
        setGardenBedDetails({ ...gardenBedDetails })
      }
    }
  }

  if(gardenBedDetails){
    return ( 
      <main >
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
          {gardenBedDetails.seeds.length > 0 && 
            gardenBedDetails.seeds.map((seed: Seed, index:number) =>(
                <div key={index}>
                  <SeedCard 
                  seed={seed}
                  gardenBedDetails={gardenBedDetails}
                  profileId={profileId}
                  handleRemoveSeedFromGardenBed={handleRemoveSeedFromGardenBed } 
                  />
                </div>
            ))
          }
        </div>
        {profileId === gardenBedDetails.profileId &&
        <div>
          <h1>This is a list of all the Seeds.</h1>
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
        }
      </main>
    )
  } else{
    return (
      <main >
        <h1>Hello. This should be a garden bed.</h1>
      </main>
    )
  }
}

export default GardenBedDetails