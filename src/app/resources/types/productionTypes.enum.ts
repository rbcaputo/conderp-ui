import { invertRecord } from "../../utilities/functions.utils"

export enum ProductionType {
  Organic,
  Product
};

export const PRODUCTION_TYPE_OPTS: Record<string, ProductionType> = {
  "Orgânico": ProductionType.Organic,
  "Produto": ProductionType.Product
};

export const PRODUCTION_TYPE_NAMES: Record<ProductionType, string> = invertRecord(PRODUCTION_TYPE_OPTS);
