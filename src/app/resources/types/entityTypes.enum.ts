export enum EntityType {
  Buy,
  Customer,
  Notification,
  Organic,
  Packaging,
  Product,
  Production,
  Sale,
  Supplier,
  User
};

export const ENTITY_TYPE_NAMES: Record<EntityType, string> = {
  [EntityType.Buy]: "Ordem de Compra",
  [EntityType.Customer]: "Cliente",
  [EntityType.Notification]: "Notificação",
  [EntityType.Organic]: "Orgânico",
  [EntityType.Packaging]: "Embalagem",
  [EntityType.Product]: "Produto",
  [EntityType.Production]: "Ordem de Produção",
  [EntityType.Sale]: "Ordem de Venda",
  [EntityType.Supplier]: "Fornecedor",
  [EntityType.User]: "Usuário"
};
