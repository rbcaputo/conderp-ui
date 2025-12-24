import { StateBr } from "../../../../resources/data/statesBr.enum"

export type SupplierGetDto = {
  publicId: string,
  name: string,
  cnpj: string,
  phone?: string,
  whatsApp?: string,
  email?: string,
  website?: string,
  street: string,
  number: string,
  complement?: string,
  district: string,
  city: string,
  state: StateBr,
  postalCode: string,
  notes?: string
};

export type SupplierPostPutDto = {
  name: string,
  cnpj: string,
  phone?: string,
  whatsApp?: string,
  email?: string,
  website?: string,
  street: string,
  number: string,
  complement?: string,
  district: string,
  city: string,
  state: StateBr,
  postalCode: string,
  notes?: string
};
