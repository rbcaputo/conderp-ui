import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { UserGetDto } from "../../dtos/userDtos.type";
import { UserService } from "../../services/userService.service";

@Component({
  selector: "user-delete-dialog",
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: "./userDeleteDialog.component.html",
  styleUrl: "../../../../../common/scss/deleteDialog.style.scss"
})
export class UserDeleteDialogComponent {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();

  // Constructor.
  public constructor(
    private readonly _userService: UserService,
    private readonly _dialogService: DialogService,
    private readonly _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public readonly user: UserGetDto
  ) { }

  // Methods.
  public deleteUserByPublicIdAsync(userPublicId: string): void {
    this._userService.deleteUserByPublicIdAsync(userPublicId)
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
