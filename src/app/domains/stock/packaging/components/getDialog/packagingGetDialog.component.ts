import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { PACKAGING_TYPE_NAMES } from "../../../../../resources/types/packagingTypes.enum";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { PackagingGetDto } from "../../dtos/packagingDtos.type";
import { SessionService } from "../../../../../common/services/sessionService.service";
import { UserType } from "../../../../../resources/types/userTypes.enum";

@Component({
  selector: "packaging-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    TypeNamePipe
  ],
  templateUrl: "./packagingGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})

export class PackagingGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly PACKAGING_TYPE_NAMES: typeof PACKAGING_TYPE_NAMES = PACKAGING_TYPE_NAMES;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly packaging: PackagingGetDto
  ) { }

  // Getters.
  public get allAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.ProductionManager ||
      this._sessionService.sessionUser?.userType === UserType.ProductionAgent;
  }

  public get someAllowed(): boolean {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.ProductionManager;
  }
}
