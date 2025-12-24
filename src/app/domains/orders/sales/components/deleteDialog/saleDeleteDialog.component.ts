import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { SaleGetDto } from "../../dtos/saleDtos.type";
import { SaleService } from "../../services/saleService.service";

@Component({
  selector: "sale-delete-dialog",
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: "./saleDeleteDialog.component.html",
  styleUrl: "../../../../../common/scss/deleteDialog.style.scss"
})
export class SaleDeleteDialogComponent {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();

  // Constructor.
  public constructor(
    private readonly _saleService: SaleService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly sale: SaleGetDto
  ) { }

  // Methods.
  public deleteSaleByPublicIdAsync(salePublicId: string): void {
    this._saleService.deleteSaleByPublicIdAsync(salePublicId)
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
