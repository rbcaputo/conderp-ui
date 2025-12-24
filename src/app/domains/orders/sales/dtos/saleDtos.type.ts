import { OrderStatus } from "../../../../resources/data/orderStatus.enum";
import { ProductGetDto } from "../../../stock/products/dtos/productDtos.type";
import { CustomerGetDto } from "../../../companies/customers/dtos/customerDtos.type";

export type SaleGetDto = {
  publicId: string,
  name: string,
  customer: CustomerGetDto,
  product: ProductGetDto,
  amount: number,
  price: number,
  openDate: Date,
  status: OrderStatus,
  closeDate: Date,
  notes?: string
};

export type SalePostDto = {
  amount: number,
  productPublicId: string,
  customerPublicId: string,
  price: number,
  notes?: string
};

export type SalePutDto = {
  amount: number,
  price: number,
  status: OrderStatus,
  notes?: string
};
