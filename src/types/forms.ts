/* ---------==== custom forms ====--------- */

export interface GardenBed {
  name: string;
  height: number;
  width: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
}



/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
