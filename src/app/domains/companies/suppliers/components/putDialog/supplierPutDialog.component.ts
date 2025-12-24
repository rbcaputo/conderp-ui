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
import { StateBr } from "../../../../../resources/data/statesBr.enum";
import { AddressGetDto } from "../../../../../resources/dtos/addressGetDto.type";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { PostalCodeService } from "../../../../../common/services/postalCodeService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { SupplierGetDto } from "../../dtos/supplierDtos.type";
import { SupplierService } from "../../services/supplierService.service";

@Component({
  selector: "supplier-put-dialog",
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
  templateUrl: "./supplierPutDialog.component.html",
  styleUrl: "../../../../../common/scss/putDialog.style.scss"
})
export class SupplierPutDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly states: typeof StateBr = StateBr;
  public putForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _supplierService: SupplierService,
    private readonly _postalCodeService: PostalCodeService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly supplier: SupplierGetDto
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializePutForm();
    this.putForm.patchValue(this.supplier);
  }

  // Methods.
  private initializePutForm(): void {
    this.putForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(patterns.companyName)]),
      cnpj: new FormControl(null, [Validators.required, Validators.pattern(patterns.cnpj)]),
      phone: new FormControl(null, Validators.pattern(patterns.phone)),
      whatsApp: new FormControl(null, Validators.pattern(patterns.whatsApp)),
      email: new FormControl(null, Validators.email),
      website: new FormControl(null),
      street: new FormControl(null, [Validators.required, Validators.pattern(patterns.street)]),
      number: new FormControl(null, [Validators.required, Validators.pattern(patterns.number)]),
      complement: new FormControl(null, Validators.pattern(patterns.complement)),
      district: new FormControl(null, [Validators.required, Validators.pattern(patterns.district)]),
      city: new FormControl(null, [Validators.required, Validators.pattern(patterns.city)]),
      state: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, [Validators.required, Validators.pattern(patterns.postalCode)], [this._postalCodeService.postalCodeValidator()]),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  public fillAddressByPostalCodeAsync(target: EventTarget): void {
    if ((target as HTMLInputElement).value !== "") {
      this._postalCodeService.getAddressByPostalCodeAsync((target as HTMLInputElement).value)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (response: AddressGetDto) => {
            this.putForm.patchValue({
              street: response.logradouro,
              district: response.bairro,
              city: response.localidade,
              state: response.uf
            });
          },
          error: (error: any) => console.error(error)
        });
    }
  }

  public updateSupplierByPublicIdAsync(supplierPublicId: string): void {
    this.putForm.markAllAsTouched();

    if (this.putForm.valid) {
      this._supplierService.updateSupplierByPublicIdAsync(supplierPublicId, this.putForm.value)
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
