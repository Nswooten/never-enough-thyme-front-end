// services
import * as tokenService from './tokenService'

// types
import { Profile, GardenBed, Seed } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/gardenBeds`

async function index(): Promise<GardenBed[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as GardenBed[]
}

async function show(gardenBedId: string): Promise<GardenBed> {
  const res = await fetch(`${BASE_URL}/${gardenBedId}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as GardenBed
}




export { index, show }