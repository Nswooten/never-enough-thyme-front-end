// npm modules
import { useState, useEffect, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// services
import * as gardenBedService from '../../services/gardenBedService'

// css
// import styles from './GardenBeds.module.css'

// components
// import GardenBedCard from '../../components/GardenBedCard/GardenBedCard'

// types
import { GardenBed, Seed } from '../../types/models'
import SeedCard from '../../components/SeedCard/SeedCard'

const GardenBedDetails = (): JSX.Element => {
  const [gardenBedDetails, setGardenBedDetails] = useState<GardenBed>()
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
  
  if(gardenBedDetails){
  return ( 
    <main >
      <h1>{gardenBedDetails.name}</h1>
      <h4>{gardenBedDetails.height}ft X {gardenBedDetails.width}ft</h4>
      {gardenBedDetails.seeds.length > 0 && 
        gardenBedDetails.seeds.map((seed: Seed) =>(
          <Link to={`/seeds/${seed.id}`} key={seed.id}>
            <div>
              <SeedCard seed={seed}/>
            </div>
          </Link>
        ))
      }
    </main>
  )
  }else{
    return (
      <main >
      <h1>Hello. This should be a garden bed.</h1>
      </main>
    )
  }
}
 
export default GardenBedDetails