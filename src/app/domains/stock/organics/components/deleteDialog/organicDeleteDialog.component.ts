import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { OrganicGetDto } from "../../dtos/organicDtos.type";
import { OrganicService } from "../../services/organicService.service";

@Component({
  selector: "organic-delete-dialog",
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: "./organicDeleteDialog.component.html",
  styleUrl: "../../../../../common/scss/deleteDialog.style.scss"
})
export class OrganicDeleteDialogComponent {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>;

  // Constructor.
  public constructor(
    private readonly _organicService: OrganicService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly organic: OrganicGetDto
  ) { }

  // Methods.
  public deleteOrganicByPublicIdAsync(organicPublicId: string): void {
    this._organicService.deleteOrganicByPublicIdAsync(organicPublicId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<string>) => {
          this._dialogService.closeAllDialogs();
          this._snackBarService.displaySnackbar(response.message);
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }
}
