import { invertRecord } from "../../utilities/functions.utils"

export enum ProductType {
  Iqf,
  Yield300ml,
  Yield1000ml
};

export const PRODUCT_TYPE_OPTS: Record<string, ProductType> = {
  "IQF": ProductType.Iqf,
  "Faz 300ml": ProductType.Yield300ml,
  "Faz 1L": ProductType.Yield1000ml
};

export const PRODUCT_TYPE_NAMES: Record<ProductType, string> = invertRecord(PRODUCT_TYPE_OPTS);
