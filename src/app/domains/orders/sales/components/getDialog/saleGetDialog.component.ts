import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ORDER_STATUS_NAMES, OrderStatus } from "../../../../../resources/data/orderStatus.enum";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { SaleGetDto } from "../../dtos/saleDtos.type";
import { UserType } from "../../../../../resources/types/userTypes.enum";
import { SessionService } from "../../../../../common/services/sessionService.service";

@Component({
  selector: "sale-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    TypeNamePipe
  ],
  templateUrl: "./saleGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class SaleGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORDER_STATUS_NAMES: typeof ORDER_STATUS_NAMES = ORDER_STATUS_NAMES;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly sale: SaleGetDto
  ) { }

  // Getters.
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
    return this.sale.status === OrderStatus.Delivered ||
      this.sale.status === OrderStatus.Canceled;
  }
}
