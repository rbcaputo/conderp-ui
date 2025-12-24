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
import { ORDER_STATUS_OPTS, OrderStatus } from "../../../../../resources/data/orderStatus.enum";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { BuyGetDto } from "../../dtos/buyDtos.type";
import { BuyService } from "../../services/buyService.service";

@Component({
  selector: "buy-put-dialog",
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
  templateUrl: "./buyPutDialog.component.html",
  styleUrl: "../../../../../common/scss/putDialog.style.scss"
})
export class BuyPutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORDER_STATUS_OPTS: typeof ORDER_STATUS_OPTS = ORDER_STATUS_OPTS;
  public putForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _buyService: BuyService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly buy: BuyGetDto
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePutForm();
    this.putForm.patchValue({
      ...this.buy,
      supplierPublicId: this.buy.supplier?.publicId
    });
    this.handleBuyStatusBehavior();
  }

  // Methods.
  private initializePutForm(): void {
    this.putForm = new FormGroup({
      status: new FormControl(null, Validators.required),
      supplierPublicId: new FormControl(null),
      price: new FormControl(null),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  private handleBuyStatusBehavior() {
    const supplierPublicIdInput: FormControl = this.putForm.get("supplierPublicId") as FormControl;
    const supplierPublicIdValue: string = supplierPublicIdInput.value;
    const priceInput: FormControl = this.putForm.get("price") as FormControl;
    const priceValue: number = priceInput.value;

    this.putForm.get("status")?.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value: OrderStatus) => {
        switch (value) {
          case OrderStatus.Accepted:
            supplierPublicIdInput.enable();
            supplierPublicIdInput.addValidators(Validators.required);
            priceInput.enable();
            priceInput.addValidators(Validators.required);
            break;

          case OrderStatus.Delivered:
            supplierPublicIdInput.disable();
            supplierPublicIdInput.addValidators([Validators.required, Validators.pattern(patterns.publicId)]);
            supplierPublicIdInput.setValue(supplierPublicIdValue);
            priceInput.disable();
            priceInput.addValidators(Validators.required);
            priceInput.setValue(priceValue);
            break;

          case OrderStatus.Canceled:
            supplierPublicIdInput.disable();
            supplierPublicIdInput.removeValidators([Validators.required, Validators.pattern(patterns.publicId)]);
            supplierPublicIdInput.reset();
            priceInput.disable();
            priceInput.removeValidators(Validators.required);
            priceInput.reset();
            break;
        }

        supplierPublicIdInput.updateValueAndValidity({ emitEvent: false });
        priceInput.updateValueAndValidity({ emitEvent: false });
      });
  }

  public updateBuyByPublicIdAsync(buyPublicId: string): void {
    this.putForm.markAllAsTouched();

    if (this.putForm.valid) {
      this._buyService.updateBuyByPublicIdAsync(buyPublicId, this.putForm.getRawValue())
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
