import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ORDER_STATUS_NAMES, OrderStatus } from "../../../../../resources/data/orderStatus.enum";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { BuyType, BUY_TYPE_NAMES } from "../../../../../resources/types/buyTypes.enum";
import { ORGANIC_TYPE_NAMES, ORGANIC_SUBTYPE_NAMES, OrganicType } from "../../../../../resources/types/organicTypes.enum";
import { PACKAGING_TYPE_NAMES, PackagingType } from "../../../../../resources/types/packagingTypes.enum";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { BuyGetDto } from "../../dtos/buyDtos.type";
import { SessionService } from "../../../../../common/services/sessionService.service";
import { UserType } from "../../../../../resources/types/userTypes.enum";

@Component({
  selector: "buy-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    TypeNamePipe
  ],
  templateUrl: "./buyGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class BuyGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly buyTypes: typeof BuyType = BuyType;
  public readonly BUY_TYPE_NAMES: typeof BUY_TYPE_NAMES = BUY_TYPE_NAMES;
  public readonly ORGANIC_TYPE_NAMES: typeof ORGANIC_TYPE_NAMES = ORGANIC_TYPE_NAMES;
  public readonly ORGANIC_SUBTYPE_NAMES: typeof ORGANIC_SUBTYPE_NAMES = ORGANIC_SUBTYPE_NAMES;
  public readonly PACKAGING_TYPE_NAMES: typeof PACKAGING_TYPE_NAMES = PACKAGING_TYPE_NAMES;
  public readonly ORDER_STATUS_NAMES: typeof ORDER_STATUS_NAMES = ORDER_STATUS_NAMES;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly buy: BuyGetDto
  ) { }

  // Getters.
  public get organicBuySubtype(): OrganicType {
    return this.buy.buySubtype as OrganicType;
  }

  public get packagingBuySubtype(): PackagingType {
    return this.buy.buySubtype as PackagingType;
  }

  public get allAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.SaleManager ||
      this._sessionService.sessionUser?.userType === UserType.SaleAgent;
  }

  public get someAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.SaleManager;
  }

  public get isDisabled(): boolean {
    return this.buy.status === OrderStatus.Delivered || this.buy.status === OrderStatus.Canceled;
  }
}
