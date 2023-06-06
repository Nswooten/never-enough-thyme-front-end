// services
import * as tokenService from './tokenService'

// types
import { Profile, GardenBed, Seed } from '../types/models'
import { GardenBedFormData } from '../types/forms'

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

async function create(formData: GardenBedFormData): Promise<GardenBed> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as GardenBed
}

async function deleteGardenBed(gardenBedId:string): Promise<GardenBed> {
  const res = await fetch(`${BASE_URL}/${gardenBedId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json() as GardenBed
}

async function update(formData: GardenBedFormData): Promise<GardenBed> {
  const res = await fetch(`${BASE_URL}/${formData.id}`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as GardenBed
}


export { index, show, create, deleteGardenBed, update }