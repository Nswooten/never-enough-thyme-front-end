// services
import * as tokenService from './tokenService'

// types
import { GardenBed } from '../types/models'
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

async function deleteGardenBed(gardenBedId: string): Promise<GardenBed> {
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

async function associateSeed(gardenBedId: string, seedId: string) {
  try {
    const res = await fetch(`${BASE_URL}/${gardenBedId}/seeds/${seedId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteSeedAssociation(gardenBedId: string, seedId: string) {
  try {
    const res = await fetch(`${BASE_URL}/${gardenBedId}/seeds/${seedId}`, {
      method: 'Delete',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export { index, show, create, deleteGardenBed, update, associateSeed, deleteSeedAssociation }