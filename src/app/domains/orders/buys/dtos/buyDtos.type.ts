import { OrderStatus } from "../../../../resources/data/orderStatus.enum";
import { SupplierGetDto } from "../../../companies/suppliers/dtos/supplierDtos.type";
import { OrganicSubtype, OrganicType } from "../../../../resources/types/organicTypes.enum";
import { PackagingType } from "../../../../resources/types/packagingTypes.enum";
import { BuyType } from "../../../../resources/types/buyTypes.enum";

export type BuyGetDto = {
  publicId: string,
  name: string,
  buyType: BuyType,
  buySubtype: OrganicType | PackagingType,
  organicSubtype?: OrganicSubtype,
  amount: number,
  openDate: Date,
  status: OrderStatus,
  closeDate?: Date,
  supplier?: SupplierGetDto,
  price?: number,
  notes?: string
};

export type BuyPostDto = {
  buyType: BuyType,
  buySubtype: OrganicType | PackagingType,
  organicSubtype?: OrganicSubtype,
  amount: number,
  notes?: string
};

export type BuyPutDto = {
  status: OrderStatus,
  supplierPublicId?: string,
  price?: number,
  notes?: string
};
