import { OrderStatus } from "../../../../resources/data/orderStatus.enum";
import { ProductType } from "../../../../resources/types/productTypes.enum";
import { OrganicGetDto } from "../../../stock/organics/dtos/organicDtos.type";
import { ProductGetDto } from "../../../stock/products/dtos/productDtos.type";
import { ProductionType } from "../../../../resources/types/productionTypes.enum";

export type ProductionGetDto = {
  publicId: string,
  name: string,
  storageCode?: string,
  productionType: ProductionType,
  amount: number,
  openDate: Date,
  status: OrderStatus,
  closeDate?: Date,
  organic: OrganicGetDto,
  processedOrganic?: OrganicGetDto,
  processedProduct?: ProductGetDto,
  notes?: string
};

export type ProductionPostDto = {
  name: string,
  storageCode?: string,
  amount: number,
  productionType: ProductionType,
  organicPublicId: string,
  productType?: ProductType,
  packagingPublicId?: string,
  notes?: string
};

export type ProductionPutDto = {
  storageCode?: string,
  status: OrderStatus,
  packagingPublicId?: string,
  notes?: string
};
