import { ENTITY_TYPE_NAMES } from './../../../../resources/types/entityTypes.enum';
import { tooltipPosition } from './../../../../utilities/tooltips.utils';
import { Component, Inject } from "@angular/core";
import { DialogService } from "../../../../common/services/dialogService.service";
import { ClipboardService } from "../../../../common/services/clipboardService.service";
import { getDialogTooltips } from "../../../../utilities/tooltips.utils";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationGetDto } from '../../dtos/notificationDtos.type';
import { TypeNamePipe } from '../../../../resources/pipes/typeNamePipe.pipe';

@Component({
  selector: "notification-get-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    TypeNamePipe
  ],
  templateUrl: "./notificationGetDialog.component.html",
  styleUrl: "../../../../common/scss/getDialog.style.scss"
})
export class NotificationGetDialogComponent {
  // Properties.
  public readonly tooltips: typeof getDialogTooltips = getDialogTooltips;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ENTITY_TYPE_NAMES: typeof ENTITY_TYPE_NAMES = ENTITY_TYPE_NAMES;

  // Constructor.
  public constructor(
    public readonly dialogService: DialogService,
    public readonly clipboardService: ClipboardService,
    @Inject(MAT_DIALOG_DATA) public readonly notification: NotificationGetDto
  ) { }
}
