import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { BuyGetDto } from "../../dtos/buyDtos.type";
import { BuyService } from "../../services/buyService.service";

@Component({
  selector: "buy-delete-dialog",
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: "./buyDeleteDialog.component.html",
  styleUrl: "../../../../../common/scss/deleteDialog.style.scss"
})
export class BuyDeleteDialogComponent {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();

  // Constructor.
  public constructor(
    private readonly _buyService: BuyService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly buy: BuyGetDto
  ) { }

  // Methods.
  public deleteBuyByPublicIdAsync(buyPublicId: string): void {
    this._buyService.deleteBuyByPublicIdAsync(buyPublicId)
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
