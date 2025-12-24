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
import { ProductionType } from "../../../../../resources/types/productionTypes.enum";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { ProductionGetDto } from "../../dtos/productionDtos.type";
import { ProductionService } from "../../services/productionService.service";

@Component({
  selector: "production-put-dialog",
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
  templateUrl: "./productionPutDialog.component.html",
  styleUrl: "../../../../../common/scss/putDialog.style.scss"
})
export class ProductionPutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORDER_STATUS_OPTS: typeof ORDER_STATUS_OPTS = ORDER_STATUS_OPTS;
  public putForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _productionService: ProductionService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly production: ProductionGetDto
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePutForm();
    this.putForm.patchValue(this.production);

    if (this.production.productionType === ProductionType.Organic)
      this.putForm.get("packagingPublicId")?.disable();
  }

  // Class methods.
  private initializePutForm(): void {
    this.putForm = new FormGroup({
      storageCode: new FormControl(null, Validators.pattern(patterns.storageCode)),
      status: new FormControl(null, Validators.required),
      packagingPublicId: new FormControl(null, Validators.pattern(patterns.publicId)),
      notes: new FormControl(null)
    });
  }

  public updateProductionByPublicIdAsync(productionPublicId: string): void {
    this.putForm.markAllAsTouched();

    if (this.putForm.valid) {
      this._productionService.updateProductionByPublicIdAsync(productionPublicId, this.putForm.value)
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
