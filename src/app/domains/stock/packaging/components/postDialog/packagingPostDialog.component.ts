import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { PackagingType, PACKAGING_TYPE_OPTS } from "../../../../../resources/types/packagingTypes.enum";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { PackagingGetDto } from "../../dtos/packagingDtos.type";
import { PackagingService } from "../../services/packagingService.service";

@Component({
  selector: "packaging-post-dialog",
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
  templateUrl: "./packagingPostDialog.component.html",
  styleUrl: "../../../../../common/scss/postDialog.style.scss"
})
export class PackagingPostDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly packagingTypes: typeof PackagingType = PackagingType;
  public readonly PACKAGING_TYPE_OPTS: typeof PACKAGING_TYPE_OPTS = PACKAGING_TYPE_OPTS;
  public postForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _packagingService: PackagingService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePostForm();
  }

  // Class methods.
  private initializePostForm(): void {
    this.postForm = new FormGroup({
      storageCode: new FormControl(null, Validators.pattern(patterns.storageCode)),
      packagingType: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      supplierPublicId: new FormControl(null, [Validators.required, Validators.pattern(patterns.publicId)]),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public addPackagingAsync(): void {
    this._packagingService.addPackagingAsync(this.postForm.value)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<PackagingGetDto>) => {
          this._dialogService.closeAllDialogs();
          this._snackBarService.displaySnackbar(response.message);
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }
}
