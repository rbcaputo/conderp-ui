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
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { BuyGetDto } from "../../dtos/buyDtos.type";
import { BuyService } from "../../services/buyService.service";

@Component({
  selector: "buy-notes-put-dialog",
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: "./buyNotesPutDialog.component.html",
  styleUrl: "../../../../../common/scss/notesPutDialog.style.scss"
})
export class BuyNotesPutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
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
  }

  // Methods.
  public initializePutForm(): void {
    this.putForm = new FormGroup({
      status: new FormControl(null),
      supplierPublicId: new FormControl(null),
      price: new FormControl(null),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public submitFormAsync(buyPublicId: string): void {
    if (this.putForm.valid) {
      this._buyService.updateBuyByPublicIdAsync(buyPublicId, this.putForm.value)
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
