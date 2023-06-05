/* ---------===== custom props ====--------- */

export interface GardenBed {
  id: number;
  name: string;
  height: number;
  width: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
  seeds: Seed[];
}

export interface Seed {
  id: number;
  name: string;
  daysToGerm: number;
  daysToMaturity: number;
  plantingDepth: number;
  daysToHarvest: number;
  spacingHeight: number;
  spacingWidth: number;
  instructions: string;
  plantType: string;
  growsBestIn: string;
  growingHeight: number;
  frontOfPacketPhoto: string;
  backOfPacketPhoto: string;
  createdAt: string;
  updatedAt: string;
}


/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  gardenBeds: GardenBed[];
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
