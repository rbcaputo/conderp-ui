import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CustomerDeleteDialogComponent } from "../../domains/companies/customers/components/deleteDialog/customerDeleteDialog.component";
import { CustomerGetDialogComponent } from "../../domains/companies/customers/components/getDialog/customerGetDialog.component";
import { CustomerNotesPutDialogComponent } from "../../domains/companies/customers/components/notesPutDialog/customerNotesPutDialog.component";
import { CustomerPostDialogComponent } from "../../domains/companies/customers/components/postDialog/customerPostDialog.component";
import { CustomerPutDialogComponent } from "../../domains/companies/customers/components/putDialog/customerPutDialog.component";
import { SupplierDeleteDialogComponent } from "../../domains/companies/suppliers/components/deleteDialog/supplierDeleteDialog.component";
import { SupplierGetDialogComponent } from "../../domains/companies/suppliers/components/getDialog/supplierGetDialog.component";
import { SupplierNotesPutDialogComponent } from "../../domains/companies/suppliers/components/notesPutDialog/supplierNotesPutDialog.component";
import { SupplierPostDialogComponent } from "../../domains/companies/suppliers/components/postDialog/supplierPostDialog.component";
import { SupplierPutDialogComponent } from "../../domains/companies/suppliers/components/putDialog/supplierPutDialog.component";
import { BuyDeleteDialogComponent } from "../../domains/orders/buys/components/deleteDialog/buyDeleteDialog.component";
import { BuyGetDialogComponent } from "../../domains/orders/buys/components/getDialog/buyGetDialog.component";
import { BuyNotesPutDialogComponent } from "../../domains/orders/buys/components/notesPutDialog/buyNotesPutDialog.component";
import { BuyPostDialogComponent } from "../../domains/orders/buys/components/postDialog/buyPostDialog.component";
import { BuyPutDialogComponent } from "../../domains/orders/buys/components/putDialog/buyPutDialog.component";
import { ProductionDeleteDialogComponent } from "../../domains/orders/production/components/deleteDialog/productionDeleteDialog.component";
import { ProductionGetDialogComponent } from "../../domains/orders/production/components/getDialog/productionGetDialog.component";
import { ProductionNotesPutDialogComponent } from "../../domains/orders/production/components/notesPutDialog/productionNotesPutDialog.component";
import { ProductionPostDialogComponent } from "../../domains/orders/production/components/postDialog/productionPostDialog.component";
import { ProductionPutDialogComponent } from "../../domains/orders/production/components/putDialog/productionPutDialog.component";
import { SaleDeleteDialogComponent } from "../../domains/orders/sales/components/deleteDialog/saleDeleteDialog.component";
import { SaleGetDialogComponent } from "../../domains/orders/sales/components/getDialog/saleGetDialog.component";
import { SaleNotesPutDialogComponent } from "../../domains/orders/sales/components/notesPutDialog/saleNotesPutDialog.component";
import { SalePostDialogComponent } from "../../domains/orders/sales/components/postDialog/salePostDialog.component";
import { SalePutDialogComponent } from "../../domains/orders/sales/components/putDialog/salePutDialog.component";
import { UserDeleteDialogComponent } from "../../domains/personnel/users/components/deleteDialog/userDeleteDialog.component";
import { UserGetDialogComponent } from "../../domains/personnel/users/components/getDialog/userGetDialog.component";
import { UserPostDialogComponent } from "../../domains/personnel/users/components/postDialog/userPostDialog.component";
import { UserPutDialogComponent } from "../../domains/personnel/users/components/putDialog/userPutDialog.component";
import { OrganicDeleteDialogComponent } from "../../domains/stock/organics/components/deleteDialog/organicDeleteDialog.component";
import { OrganicGetDialogComponent } from "../../domains/stock/organics/components/getDialog/organicGetDialog.component";
import { OrganicNotesPutDialogComponent } from "../../domains/stock/organics/components/notesPutDialog/organicNotesPutDialog.component";
import { OrganicPostDialogComponent } from "../../domains/stock/organics/components/postDialog/organicPostDialog.component";
import { OrganicPutDialogComponent } from "../../domains/stock/organics/components/putDialog/organicPutDialog.component";
import { OrganicGetDto } from "../../domains/stock/organics/dtos/organicDtos.type";
import { PackagingDeleteDialogComponent } from "../../domains/stock/packaging/components/deleteDialog/packagingDeleteDialog.component";
import { PackagingGetDialogComponent } from "../../domains/stock/packaging/components/getDialog/packagingGetDialog.component";
import { PackagingNotesPutDialogComponent } from "../../domains/stock/packaging/components/notesPutDialog/packagingNotesPutDialog.component";
import { PackagingPostDialogComponent } from "../../domains/stock/packaging/components/postDialog/packagingPostDialog.component";
import { PackagingPutDialogComponent } from "../../domains/stock/packaging/components/putDialog/packagingPutDialog.component";
import { ProductDeleteDialogComponent } from "../../domains/stock/products/components/deleteDialog/productDeleteDialog.component";
import { ProductGetDialogComponent } from "../../domains/stock/products/components/getDialog/productGetDialog.component";
import { ProductNotesPutDialogComponent } from "../../domains/stock/products/components/notesPutDialog/productNotesPutDialog.component";
import { ProductPostDialogComponent } from "../../domains/stock/products/components/postDialog/productPostDialog.component";
import { ProductPutDialogComponent } from "../../domains/stock/products/components/putDialog/productPutDialog.component";
import { EntityGetDto } from "../../resources/dtos/entityGetDto.type";
import { EntityType } from "../../resources/types/entityTypes.enum";
import { NotificationGetDialogComponent } from "../../domains/notifications/components/getDialog/notificationGetDialog.component";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  // Properties.
  private readonly _postDialogComponentMap: Record<number, any> = {
    [EntityType.Buy]: BuyPostDialogComponent,
    [EntityType.Customer]: CustomerPostDialogComponent,
    [EntityType.Organic]: OrganicPostDialogComponent,
    [EntityType.Packaging]: PackagingPostDialogComponent,
    [EntityType.Product]: ProductPostDialogComponent,
    [EntityType.Production]: ProductionPostDialogComponent,
    [EntityType.Sale]: SalePostDialogComponent,
    [EntityType.Supplier]: SupplierPostDialogComponent,
    [EntityType.User]: UserPostDialogComponent
  };
  private readonly _getDialogComponentMap: Record<number, any> = {
    [EntityType.Buy]: BuyGetDialogComponent,
    [EntityType.Customer]: CustomerGetDialogComponent,
    [EntityType.Notification]: NotificationGetDialogComponent,
    [EntityType.Organic]: OrganicGetDialogComponent,
    [EntityType.Packaging]: PackagingGetDialogComponent,
    [EntityType.Product]: ProductGetDialogComponent,
    [EntityType.Production]: ProductionGetDialogComponent,
    [EntityType.Sale]: SaleGetDialogComponent,
    [EntityType.Supplier]: SupplierGetDialogComponent,
    [EntityType.User]: UserGetDialogComponent
  };
  private readonly _actionDialogComponentMap: Record<number, Record<string, any>> = {
    [EntityType.Buy]: {
      notes: BuyNotesPutDialogComponent,
      put: BuyPutDialogComponent,
      delete: BuyDeleteDialogComponent
    },
    [EntityType.Customer]: {
      notes: CustomerNotesPutDialogComponent,
      put: CustomerPutDialogComponent,
      delete: CustomerDeleteDialogComponent
    },
    [EntityType.Organic]: {
      notes: OrganicNotesPutDialogComponent,
      put: OrganicPutDialogComponent,
      delete: OrganicDeleteDialogComponent
    },
    [EntityType.Packaging]: {
      notes: PackagingNotesPutDialogComponent,
      put: PackagingPutDialogComponent,
      delete: PackagingDeleteDialogComponent
    },
    [EntityType.Product]: {
      notes: ProductNotesPutDialogComponent,
      put: ProductPutDialogComponent,
      delete: ProductDeleteDialogComponent
    },
    [EntityType.Production]: {
      notes: ProductionNotesPutDialogComponent,
      put: ProductionPutDialogComponent,
      delete: ProductionDeleteDialogComponent
    },
    [EntityType.Sale]: {
      notes: SaleNotesPutDialogComponent,
      put: SalePutDialogComponent,
      delete: SaleDeleteDialogComponent
    },
    [EntityType.Supplier]: {
      notes: SupplierNotesPutDialogComponent,
      put: SupplierPutDialogComponent,
      delete: SupplierDeleteDialogComponent
    },
    [EntityType.User]: {
      put: UserPutDialogComponent,
      delete: UserDeleteDialogComponent
    }
  };
  public entityType: typeof EntityType = EntityType;
  public currentEntityType!: EntityType;

  // Constructor.
  public constructor(private readonly _dialog: MatDialog) { }

  // Methods.
  public openPostDialog(entityType?: EntityType, organic?: OrganicGetDto): void {
    if (entityType)
      this._dialog.open(this._postDialogComponentMap[entityType], { data: organic });
    else
      this._dialog.open(this._postDialogComponentMap[this.currentEntityType]);
  }

  public openGetDialog(entityType: EntityType, entity: EntityGetDto): void {
    this._dialog.open(this._getDialogComponentMap[entityType], { data: entity });
  }

  public openActionDialog(entityType: EntityType, entity: EntityGetDto, action: string): void {
    this._dialog.open(this._actionDialogComponentMap[entityType]?.[action], { data: entity });
  }

  public closeAllDialogs(): void {
    this._dialog.closeAll();
  }
}
