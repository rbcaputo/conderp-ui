import { HttpErrorResponse } from "@angular/common/http";
import { Component, ChangeDetectionStrategy, OnInit, WritableSignal, signal } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { Subject, takeUntil, switchMap, EMPTY } from "rxjs";
import { SessionService } from "../../../common/services/sessionService.service";
import { SnackBarService } from "../../../common/services/snackBarService.service";
import { UserGetDto } from "../../../domains/personnel/users/dtos/userDtos.type";
import { UserService } from "../../../domains/personnel/users/services/userService.service";
import { ApiResponseDto } from "../../../resources/dtos/apiResponseDto.type";
import { getTokenPayload } from "../../../utilities/jwt.utils";
import { AuthenticationResultDto } from "../../dtos/authenticationDtos.type";
import { AuthenticationService } from "../../services/authenticationService.service";

@Component({
  selector: "user-login",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./userLogin.component.html",
  styleUrl: "./userLogin.component.scss"
})
export class UserLoginComponent implements OnInit {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public loginForm!: FormGroup;
  public isPasswordVisible: WritableSignal<boolean> = signal(true);

  // Constructor.
  public constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _sessionService: SessionService,
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _snackBarService: SnackBarService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  // Methods.
  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  public togglePasswordVisibility(event: MouseEvent): void {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    event.stopPropagation();
  }

  public userLoginAsync(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this._authenticationService.userLoginAsync(this.loginForm.value)
        .pipe(
          takeUntil(this._destroy$),
          switchMap((response: ApiResponseDto<AuthenticationResultDto>) => {
            const token: string | undefined = response.data?.token;

            if (!token) {
              this._snackBarService.displaySnackbar(response.message);

              return EMPTY;
            }

            // Store the JWT in cookie valid for 1 hour.
            document.cookie = `auth_token=${token}; Path=/; Secure; SameSite=None; Max-Age=3600`;

            return this._userService.getUserByPublicIdAsync(`${getTokenPayload(token)?.nameIdentifier}`);
          })
        ).subscribe({
          next: (response: ApiResponseDto<UserGetDto>) => {
            const sessionUser: UserGetDto | undefined = response.data;

            if (!sessionUser) {
              this._snackBarService.displaySnackbar(response.message);

              return;
            }

            // Store the current session user in SessionService memory.
            this._sessionService.sessionUser = sessionUser;

            this._snackBarService.displaySnackbar(`Bem-vindo(a), ${sessionUser?.name}!`);
            this._router.navigate(["/home"]);
          },
          error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
        });
    }
  }
}
