import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { BuyType, BUY_TYPE_OPTS } from "../../../../../resources/types/buyTypes.enum";
import { ORGANIC_TYPE_OPTS, ORGANIC_SUBTYPE_OPTS, OrganicType } from "../../../../../resources/types/organicTypes.enum";
import { PackagingType, PACKAGING_TYPE_OPTS } from "../../../../../resources/types/packagingTypes.enum";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { BuyGetDto } from "../../dtos/buyDtos.type";
import { BuyService } from "../../services/buyService.service";

@Component({
  selector: "buy-post-dialog",
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
  templateUrl: "./buyPostDialog.component.html",
  styleUrl: "../../../../../common/scss/postDialog.style.scss"
})
export class BuyPostDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly buyTypes: typeof BuyType = BuyType;
  public readonly packagingTypes: typeof PackagingType = PackagingType;
  public readonly BUY_TYPE_OPTS: typeof BUY_TYPE_OPTS = BUY_TYPE_OPTS;
  public readonly ORGANIC_TYPE_OPTS: typeof ORGANIC_TYPE_OPTS = ORGANIC_TYPE_OPTS;
  public readonly ORGANIC_SUBTYPE_OPTS: typeof ORGANIC_SUBTYPE_OPTS = ORGANIC_SUBTYPE_OPTS;
  public readonly PACKAGING_TYPE_OPTS: typeof PACKAGING_TYPE_OPTS = PACKAGING_TYPE_OPTS;
  public postForm!: FormGroup;
  public currentBuySubtypes?: Record<string, OrganicType | PackagingType>;

  // Constructor.
  public constructor(
    private readonly _buyService: BuyService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePostForm();
    this.handleCurrentBuySubtypeControls();
  }

  // Methods.
  private initializePostForm(): void {
    this.postForm = new FormGroup({
      buyType: new FormControl(null, Validators.required),
      buySubtype: new FormControl(null, Validators.required),
      organicSubtype: new FormControl(null),
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  private handleCurrentBuySubtypeControls(): void {
    this.postForm.get("buyType")?.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((buyType: BuyType) => {
        const organicSubtypeControl: FormControl = this.postForm.get("organicSubtype") as FormControl;

        this.postForm.get("buySubtype")?.reset();

        switch (buyType) {
          case BuyType.Organic:
            this.currentBuySubtypes = this.ORGANIC_TYPE_OPTS;
            organicSubtypeControl.enable();
            organicSubtypeControl.addValidators(Validators.required);
            organicSubtypeControl.updateValueAndValidity({ emitEvent: false });
            break;

          case BuyType.Packaging:
            this.currentBuySubtypes = this.PACKAGING_TYPE_OPTS;
            organicSubtypeControl.reset();
            organicSubtypeControl.disable();
            organicSubtypeControl.removeValidators(Validators.required);
            organicSubtypeControl.updateValueAndValidity({ emitEvent: false });
            break;
        }
      });
  }

  public addBuyAsync(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.valid) {
      this._buyService.addBuyAsync(this.postForm.value)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (response: ApiResponseDto<BuyGetDto>) => {
            this._dialogService.closeAllDialogs();
            this._snackBarService.displaySnackbar(response.message);
          },
          error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
        });
    }
  }
}
