import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { OrganicSubtype } from "../../../../../resources/types/organicTypes.enum";
import { PRODUCTION_TYPE_OPTS, ProductionType } from "../../../../../resources/types/productionTypes.enum";
import { PRODUCT_TYPE_OPTS } from "../../../../../resources/types/productTypes.enum";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { OrganicGetDto } from "../../../../stock/organics/dtos/organicDtos.type";
import { ProductionGetDto } from "../../dtos/productionDtos.type";
import { ProductionService } from "../../services/productionService.service";

@Component({
  selector: "production-post-dialog",
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
  templateUrl: "./productionPostDialog.component.html",
  styleUrl: "../../../../../common/scss/postDialog.style.scss"
})
export class ProductionPostDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly PRODUCTION_TYPE_OPTS: typeof PRODUCTION_TYPE_OPTS = PRODUCTION_TYPE_OPTS;
  public readonly PRODUCT_TYPE_OPTS: typeof PRODUCT_TYPE_OPTS = PRODUCT_TYPE_OPTS;
  public postForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _productionService: ProductionService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private readonly organic?: OrganicGetDto
  ) { }

  // On init behavior.
  ngOnInit(): void {
    this.initializePostForm();
    this.handleCurrentProductionSubtypeAndPackagingBehavior();

    if (this.organic) {
      this.postForm.patchValue({
        productionType: this.organic.organicSubtype === OrganicSubtype.PurePulp
          ? ProductionType.Product
          : null,
        organicPublicId: this.organic.publicId
      });

      if (this.postForm.get("productionType")?.value)
        this.postForm.get("productionType")?.disable({ emitEvent: false });

      this.postForm.get("organicPublicId")?.disable({ emitEvent: false });
    }
  }

  // Methods.
  private initializePostForm(): void {
    this.postForm = new FormGroup({
      storageCode: new FormControl(null, Validators.pattern(patterns.storageCode)),
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      productionType: new FormControl(null, Validators.required),
      organicPublicId: new FormControl(null, [Validators.required, Validators.pattern(patterns.publicId)]),
      productType: new FormControl(null),
      packagingPublicId: new FormControl(null, Validators.pattern(patterns.publicId)),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  private handleCurrentProductionSubtypeAndPackagingBehavior(): void {
    const controls: { name: string, control: AbstractControl | null }[] = [
      "productType",
      "packagingPublicId"
    ].map(controlName => ({
      name: controlName,
      control: this.postForm.get(controlName)
    }));

    this.postForm.get("productionType")?.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((productionType: ProductionType) => {
        controls.forEach(({ control }) => {
          if (!this.organic)
            control?.reset();

          control?.clearValidators();
          control?.updateValueAndValidity({ emitEvent: false });
        });

        switch (productionType) {
          case ProductionType.Product:
            controls.forEach(({ control }) => {
              control?.enable({ emitEvent: false });
              control?.addValidators(Validators.required);
              control?.updateValueAndValidity({ emitEvent: false });
            });
            break;
          case ProductionType.Organic:
            controls.forEach(({ control }) => {
              control?.reset();
              control?.disable({ emitEvent: false });
            });
        }
      });
  }

  public addProductionAsync(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.valid) {
      this._productionService.addProductionAsync(this.postForm.getRawValue())
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (response: ApiResponseDto<ProductionGetDto>) => {
            this._dialogService.closeAllDialogs();
            this._snackBarService.displaySnackbar(response.message);
          },
          error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
        });
    }
  }
}
