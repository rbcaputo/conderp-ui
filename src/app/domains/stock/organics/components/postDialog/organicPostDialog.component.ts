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
import { StateBr } from "../../../../../resources/data/statesBr.enum";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { ORGANIC_TYPE_OPTS, ORGANIC_SUBTYPE_OPTS } from "../../../../../resources/types/organicTypes.enum";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { patterns } from "../../../../../utilities/regExpPatterns.utils";
import { postPutNotesDialogTooltip, tooltipPosition } from "../../../../../utilities/tooltips.utils";
import { OrganicGetDto } from "../../dtos/organicDtos.type";
import { OrganicService } from "../../services/organicService.service";

@Component({
  selector: "organic-post-dialog",
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
  templateUrl: "./organicPostDialog.component.html",
  styleUrl: "../../../../../common/scss/postDialog.style.scss"
})
export class OrganicPostDialogComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<any> = new Subject<any>;
  public readonly tooltip: typeof postPutNotesDialogTooltip = postPutNotesDialogTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public readonly ORGANIC_TYPE_OPTS: typeof ORGANIC_TYPE_OPTS = ORGANIC_TYPE_OPTS;
  public readonly ORGANIC_SUBTYPE_OPTS: typeof ORGANIC_SUBTYPE_OPTS = ORGANIC_SUBTYPE_OPTS;
  public readonly states: typeof StateBr = StateBr;
  public postForm!: FormGroup;

  // Constructor.
  public constructor(
    private readonly _organicService: OrganicService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService
  ) { }

  // On init behavior.
  ngOnInit(): void {
    this.initializePostForm();
    this.togglePublicIdInput("supplierPublicId", "organicPublicId");
    this.togglePublicIdInput("organicPublicId", "supplierPublicId");
  }

  // Methods.
  private initializePostForm(): void {
    this.postForm = new FormGroup({
      storageCode: new FormControl(null, Validators.pattern(patterns.storageCode)),
      organicType: new FormControl(null, Validators.required),
      organicSubtype: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(patterns.amountMin), Validators.max(patterns.amountMax)]),
      origin: new FormControl(null),
      supplierPublicId: new FormControl(null, Validators.pattern(patterns.publicId)),
      organicPublicId: new FormControl(null, Validators.pattern(patterns.publicId)),
      notes: new FormControl(null, Validators.maxLength(patterns.notesMaxLength))
    });
  }

  private togglePublicIdInput(inputA: string, inputB: string): void {
    this.postForm.get(inputA)?.valueChanges.subscribe((value: string) => {
      if (value)
        this.postForm.get(inputB)?.disable({ emitEvent: false });
      else
        this.postForm.get(inputB)?.enable({ emitEvent: false });
    });
  }

  public addOrganicAsync(): void {
    if (this.postForm.valid) {
      this._organicService.addOrganicAsync(this.postForm.value)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (response: ApiResponseDto<OrganicGetDto>) => {
            this._dialogService.closeAllDialogs();
            this._snackBarService.displaySnackbar(response.message);
          },
          error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
        });
    }
  }
}
