import { PackagingType } from "../../../../resources/types/packagingTypes.enum";
import { SupplierGetDto } from "../../../companies/suppliers/dtos/supplierDtos.type";

export type PackagingGetDto = {
  publicId: string,
  storageCode?: string,
  packagingType: PackagingType,
  amount: number,
  receiptDate: Date,
  supplier: SupplierGetDto,
  notes?: string
};

export type PackagingPostDto = {
  storageCode?: string,
  packagingType: PackagingType,
  amount: number,
  supplierPublicId: string,
  notes?: string
};

export type PackagingPutDto = {
  storageCode?: string,
  notes?: string
};
