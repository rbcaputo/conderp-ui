import { invertRecord } from "../../utilities/functions.utils"

export enum OrganicType {
  PassionFruit,
  Pineapple,
  Strawberry,
  SugarCane,
};

export enum OrganicSubtype {
  Whole,
  RawPulp,
  PurePulp
};

export const ORGANIC_TYPE_OPTS: Record<string, OrganicType> = {
  "Maracujá": OrganicType.PassionFruit,
  "Abacaxi": OrganicType.Pineapple,
  "Morango": OrganicType.Strawberry,
  "Cana de Açúcar": OrganicType.SugarCane
};

export const ORGANIC_SUBTYPE_OPTS: Record<string, OrganicSubtype> = {
  "Inteiro": OrganicSubtype.Whole,
  "Polpa integral": OrganicSubtype.RawPulp,
  "Polpa pura": OrganicSubtype.PurePulp
};

export const ORGANIC_TYPE_NAMES: Record<OrganicType, string> = invertRecord(ORGANIC_TYPE_OPTS);
export const ORGANIC_SUBTYPE_NAMES: Record<OrganicSubtype, string> = invertRecord(ORGANIC_SUBTYPE_OPTS);
