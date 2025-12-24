import { StateBr } from "../../../../resources/data/statesBr.enum"
import { UserType } from "../../../../resources/types/userTypes.enum"

export type UserGetDto = {
  publicId: string,
  name: string,
  cpf: string,
  phone?: string,
  whatsApp?: string,
  email: string,
  street: string,
  number: string,
  complement?: string,
  district: string,
  city: string,
  state: StateBr,
  postalCode: string,
  userType: UserType,
  notes?: string
};

export type UserPostPutDto = {
  name: string,
  cpf: string,
  phone?: string,
  whatsApp?: string,
  email: string,
  street: string,
  number: string,
  complement?: string,
  district: string,
  city: string,
  state: StateBr,
  postalCode: string,
  userType: UserType,
  password: string,
  passwordConfirmation: string,
  notes?: string
};
