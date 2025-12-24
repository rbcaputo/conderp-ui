import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ORDER_STATUS_OPTS } from "../../../../../resources/data/orderStatus.enum";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { SaleGetDto } from "../../dtos/saleDtos.type";
import { SaleService } from "../../services/saleService.service";

@Component({
  selector: "sale-put-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: "./salePutDialog.component.html",
  styleUrl: "../../../../../common/scss/putDialog.style.scss"
})
export class SalePutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORDER_STATUS_OPTS: typeof ORDER_STATUS_OPTS = ORDER_STATUS_OPTS;
  public putForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _saleService: SaleService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly sale: SaleGetDto
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePutForm();
    this.putForm.patchValue(this.sale);
  }

  // Methods.
  private initializePutForm(): void {
    this.putForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      price: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public updateSaleByPublicIdAsync(salePublicId: string): void {
    this.putForm.markAllAsTouched();

    if (this.putForm.valid) {
      this._saleService.updateSaleByPublicIdAsync(salePublicId, this.putForm.value)
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
}
