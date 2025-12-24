import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { SupplierGetDto } from "../../dtos/supplierDtos.type";
import { SessionService } from "../../../../../common/services/sessionService.service";
import { UserType } from "../../../../../resources/types/userTypes.enum";

@Component({
  selector: "supplier-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: "./supplierGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class SupplierGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly supplier: SupplierGetDto
  ) { }

  // Getters.
  public get allAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.BuyManager ||
      this._sessionService.sessionUser?.userType === UserType.BuyAgent;
  }

  public get someAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.BuyManager;
  }
}
