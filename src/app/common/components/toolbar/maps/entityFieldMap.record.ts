import { BuyGetDto } from "../../../../domains/orders/buys/dtos/buyDtos.type";
import { ORDER_STATUS_NAMES } from "../../../../resources/data/orderStatus.enum";
import { BUY_TYPE_NAMES, BuyType } from "../../../../resources/types/buyTypes.enum";
import { EntityType } from "../../../../resources/types/entityTypes.enum";
import { ORGANIC_TYPE_NAMES, ORGANIC_SUBTYPE_NAMES } from "../../../../resources/types/organicTypes.enum";
import { PACKAGING_TYPE_NAMES } from "../../../../resources/types/packagingTypes.enum";
import { PRODUCTION_TYPE_NAMES } from "../../../../resources/types/productionTypes.enum";
import { PRODUCT_TYPE_NAMES } from "../../../../resources/types/productTypes.enum";
import { USER_TYPE_NAMES } from "../../../../resources/types/userTypes.enum";

export type EnumMap = Record<number, string>;
export type EnumMapFn = (data: any) => EnumMap;

export const ENTITY_FIELD_MAP: Partial<Record<EntityType, Record<string, EnumMap | EnumMapFn>>> = {
  [EntityType.Buy]: {
    buyType: BUY_TYPE_NAMES,
    buySubtype: (buy: BuyGetDto) => {
      return buy.buyType === BuyType.Organic
        ? ORGANIC_TYPE_NAMES
        : PACKAGING_TYPE_NAMES
    },
    organicSubtype: ORGANIC_SUBTYPE_NAMES,
    status: ORDER_STATUS_NAMES
  },
  [EntityType.Organic]: {
    organicType: ORGANIC_TYPE_NAMES,
    organicSubtype: ORGANIC_SUBTYPE_NAMES,
  },
  [EntityType.Packaging]: {
    packagingType: PACKAGING_TYPE_NAMES
  },
  [EntityType.Product]: {
    productType: PRODUCT_TYPE_NAMES
  },
  [EntityType.Production]: {
    productionType: PRODUCTION_TYPE_NAMES,
    status: ORDER_STATUS_NAMES
  },
  [EntityType.User]: {
    userType: USER_TYPE_NAMES
  }
};
