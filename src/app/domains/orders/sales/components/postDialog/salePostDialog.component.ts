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
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { SaleGetDto } from "../../dtos/saleDtos.type";
import { SaleService } from "../../services/saleService.service";

@Component({
  selector: "sale-post-dialog",
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
  templateUrl: "./salePostDialog.component.html",
  styleUrl: "../../../../../common/scss/postDialog.style.scss"
})
export class SalePostDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public postForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _saleService: SaleService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService
  ) { }

  // On ininit behavior.
  public ngOnInit(): void {
    this.initializePostForm();
  }

  // Methods.
  private initializePostForm(): void {
    this.postForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      productPublicId: new FormControl(null, [Validators.required, Validators.pattern(patterns.publicId)]),
      customerPublicId: new FormControl(null, [Validators.required, Validators.pattern(patterns.publicId)]),
      price: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public addSaleAsync(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.valid) {
      this._saleService.addSaleAsync(this.postForm.value)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (response: ApiResponseDto<SaleGetDto>) => {
            this._dialogService.closeAllDialogs();
            this._snackBarService.displaySnackbar(response.message);
          },
          error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
        });
    }
  }
}
