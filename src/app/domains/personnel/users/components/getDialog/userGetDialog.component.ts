import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardService } from "../../../../../common/services/clipboardService.service";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { getDialogTooltips, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { UserGetDto } from "../../dtos/userDtos.type";

@Component({
  selector: "user-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: "./userGetDialog.component.html",
  styleUrl: "../../../../../common/scss/getDialog.style.scss"
})
export class UserGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;

  // Constructor.
  public constructor(
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly user: UserGetDto
  ) { }
}
