import { StateBr } from "../../../../resources/data/statesBr.enum"
import { SupplierGetDto } from "../../../companies/suppliers/dtos/supplierDtos.type"
import { OrganicType, OrganicSubtype } from "../../../../resources/types/organicTypes.enum"

export type OrganicGetDto = {
  publicId: string,
  storageCode?: string,
  organicType: OrganicType,
  organicSubtype: OrganicSubtype,
  amount: number,
  origin?: StateBr,
  receiptDate?: Date,
  supplier?: SupplierGetDto,
  processDate?: Date,
  organic?: OrganicGetDto,
  notes?: string
};

export type OrganicPostDto = {
  storageCode?: string,
  organicType: OrganicType,
  organicSubtype: OrganicSubtype,
  amount: number,
  origin?: StateBr,
  supplierPublicId?: string,
  organicPublicId?: string,
  notes?: string
};

export type OrganicPutDto = {
  storageCode?: string,
  amount: number,
  notes?: string
};
