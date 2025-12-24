import { invertRecord } from "../../utilities/functions.utils"

export enum UserType {
  Administrator,
  BuyManager,
  ProductionManager,
  SaleManager,
  BuyAgent,
  ProductionAgent,
  SaleAgent
};

export const USER_TYPE_OPTS: Record<string, UserType> = {
  "Administrador": UserType.Administrator,
  "Gerente de Compras": UserType.BuyManager,
  "Gerente de Produção": UserType.ProductionManager,
  "Gerente de Vendas": UserType.SaleManager,
  "Agente de Compras": UserType.BuyAgent,
  "Agente de Produção": UserType.ProductionAgent,
  "Agente de Vendas": UserType.SaleAgent
};

export const USER_TYPE_NAMES: Record<UserType, string> = invertRecord(USER_TYPE_OPTS);
