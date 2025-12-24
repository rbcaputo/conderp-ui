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
import { CustomerGetDto } from "../../dtos/customerDtos.type";
import { CustomerService } from "../../services/customerService.service";

@Component({
  selector: "customer-notes-put-dialog",
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: "./customerNotesPutDialog.component.html",
  styleUrl: "../../../../../common/scss/notesPutDialog.style.scss"
})
export class CustomerNotesPutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public putForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _customerService: CustomerService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly customer: CustomerGetDto
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePutNotesForm();
    this.putForm.patchValue(this.customer);
  }

  // Methods.
  private initializePutNotesForm(): void {
    this.putForm = new FormGroup({
      name: new FormControl(null),
      cnpj: new FormControl(null),
      phone: new FormControl(null),
      whatsApp: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      street: new FormControl(null),
      number: new FormControl(null),
      complement: new FormControl(null),
      district: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      postalCode: new FormControl(null),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public updateCustomerNotesByPublicIdAsync(customerPublicId: string) {
    if (this.putForm.valid) {
      this._customerService.updateCustomerByPublicIdAsync(customerPublicId, this.putForm.value)
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
