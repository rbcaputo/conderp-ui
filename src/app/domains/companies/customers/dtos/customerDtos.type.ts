export type CustomerGetDto = {
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
  state: string,
  postalCode: string,
  notes?: string
};

export type CustomerPostPutDto = {
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
  state: string,
  postalCode: string,
  notes?: string
};
