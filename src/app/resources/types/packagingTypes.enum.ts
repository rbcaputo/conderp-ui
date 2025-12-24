import { invertRecord } from "../../utilities/functions.utils"

export enum PackagingType {
  CardboardBox,
  PlasticReel
};

export const PACKAGING_TYPE_OPTS: Record<string, PackagingType> = {
  "Caixa de papelão": PackagingType.CardboardBox,
  "Bobina de plástico": PackagingType.PlasticReel
};

export const PACKAGING_TYPE_NAMES: Record<PackagingType, string> = invertRecord(PACKAGING_TYPE_OPTS);
