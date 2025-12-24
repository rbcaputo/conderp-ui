import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserGetDto } from "../../domains/personnel/users/dtos/userDtos.type";
import { UserService } from "../../domains/personnel/users/services/userService.service";
import { ApiResponseDto } from "../../resources/dtos/apiResponseDto.type";
import { getJwtCookie, getTokenPayload, JwtPayload } from "../../utilities/jwt.utils";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  // Properties.
  private readonly _sessionUserSubject: BehaviorSubject<UserGetDto | null> = new BehaviorSubject<UserGetDto | null>(null);
  public readonly sessionUser$: Observable<UserGetDto | null> = this._sessionUserSubject.asObservable();

  // Getters.
  public get sessionUser(): UserGetDto | null {
    return this._sessionUserSubject.value;
  }

  // Setters.
  public set sessionUser(user: UserGetDto | null) {
    this._sessionUserSubject.next(user);
  }

  // Constructor.
  constructor(private readonly _userService: UserService) {
    this.restoreSession();
  }

  // Methods.
  private restoreSession(): void {
    const token: string | null = getJwtCookie();
    const payload: JwtPayload | null = getTokenPayload(token);

    if (token && payload?.nameIdentifier) {
      this._userService.getUserByPublicIdAsync(payload.nameIdentifier)
        .subscribe({
          next: (response: ApiResponseDto<UserGetDto>) => {
            if (response.data)
              this.sessionUser = response.data;
          },
          error: () => this.clearSession()
        });
    }
  }

  public clearSession(): void {
    this._sessionUserSubject.next(null);

    document.cookie = `auth_token=; Path=/; Secure; SameSite=None; Max-Age=0`;
  }
}
