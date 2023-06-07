// services
import * as tokenService from './tokenService'

// types
import { Seed } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/seeds`

async function index(): Promise<Seed[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Seed[]
}

async function show(seedId: string): Promise<Seed> {
  const res = await fetch(`${BASE_URL}/${seedId}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Seed
}


export { index, show }