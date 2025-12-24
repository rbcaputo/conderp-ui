import { invertRecord } from "../../utilities/functions.utils"

export enum OrderStatus {
  Open,
  Accepted,
  Delivered,
  Canceled
};

export const ORDER_STATUS_OPTS: Record<string, OrderStatus> = {
  "Aberto": OrderStatus.Open,
  "Aceito": OrderStatus.Accepted,
  "Entregue": OrderStatus.Delivered,
  "Cancelado": OrderStatus.Canceled
};

export const ORDER_STATUS_NAMES: Record<OrderStatus, string> = invertRecord(ORDER_STATUS_OPTS);
