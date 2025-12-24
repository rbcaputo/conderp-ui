import { CustomerGetDto } from "../../domains/companies/customers/dtos/customerDtos.type";
import { SaleGetDto } from "../../domains/orders/sales/dtos/saleDtos.type";
import { BuyGetDto } from "../../domains/orders/buys/dtos/buyDtos.type";
import { SupplierGetDto } from "../../domains/companies/suppliers/dtos/supplierDtos.type";
import { ProductionGetDto } from "../../domains/orders/production/dtos/productionDtos.type";
import { ProductGetDto } from "../../domains/stock/products/dtos/productDtos.type";
import { OrganicGetDto } from "../../domains/stock/organics/dtos/organicDtos.type";
import { UserGetDto } from "../../domains/personnel/users/dtos/userDtos.type";
import { PackagingGetDto } from "../../domains/stock/packaging/dtos/packagingDtos.type";

export type EntityGetDto = BuyGetDto | CustomerGetDto | OrganicGetDto | PackagingGetDto | ProductGetDto | ProductionGetDto | SaleGetDto | SupplierGetDto | UserGetDto;
