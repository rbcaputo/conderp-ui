import { invertRecord } from "../../utilities/functions.utils"

export enum BuyType {
  Organic,
  Packaging
};

export const BUY_TYPE_OPTS: Record<string, BuyType> = {
  "Orgânico": BuyType.Organic,
  "Embalagem": BuyType.Packaging
};

export const BUY_TYPE_NAMES: Record<BuyType, string> = invertRecord(BUY_TYPE_OPTS);
