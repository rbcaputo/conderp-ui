import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { ORGANIC_TYPE_NAMES, ORGANIC_SUBTYPE_NAMES } from "../../../../../resources/types/organicTypes.enum";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { OrganicGetDto } from "../../dtos/organicDtos.type";
import { SessionService } from "../../../../../common/services/sessionService.service";
import { UserType } from "../../../../../resources/types/userTypes.enum";

@Component({
  selector: "organic-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    TypeNamePipe
  ],
  templateUrl: "./organicGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class OrganicGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORGANIC_TYPE_NAMES: typeof ORGANIC_TYPE_NAMES = ORGANIC_TYPE_NAMES;
  public readonly ORGANIC_SUBTYPE_NAMES: typeof ORGANIC_SUBTYPE_NAMES = ORGANIC_SUBTYPE_NAMES;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly organic: OrganicGetDto
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
