import { ProductType } from "../../../../resources/types/productTypes.enum";
import { OrganicGetDto } from "../../organics/dtos/organicDtos.type";
import { PackagingGetDto } from "../../packaging/dtos/packagingDtos.type";

export type ProductGetDto = {
  publicId: string,
  storageCode?: string,
  productType: ProductType,
  amount: number,
  packagingDate: Date,
  expirationDate?: Date,
  barcode?: string,
  organic: OrganicGetDto,
  packaging: PackagingGetDto,
  notes?: string
};

export type ProductPostDto = {
  storageCode?: string,
  productType: ProductType,
  amount: number,
  barcode?: string,
  expirationDate?: Date,
  organicPublicId: string,
  packagingPublicId: string,
  notes?: string
};

export type ProductPutDto = {
  storageCode?: string,
  barcode?: string,
  expirationDate: Date,
  notes?: string
};
