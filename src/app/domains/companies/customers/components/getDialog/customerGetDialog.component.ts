import { SessionService } from './../../../../../common/services/sessionService.service';
import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { CustomerGetDto } from "../../dtos/customerDtos.type";
import { UserType } from '../../../../../resources/types/userTypes.enum';

@Component({
  selector: "customer-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: "./customerGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class CustomerGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly customer: CustomerGetDto
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
}
