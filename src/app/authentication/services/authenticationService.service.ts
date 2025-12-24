import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../../resources/data/endpoints.type";
import { ApiResponseDto } from "../../resources/dtos/apiResponseDto.type";
import { HttpService } from "../../common/services/httpService.service";
import { UserLoginDto, AuthenticationResultDto } from "../dtos/authenticationDtos.type";
import { EntityRoute } from "../../resources/data/entityRoute.type";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // Properties.
  private readonly _LOGIN_ENDPOINT: EntityRoute = endpoints.SYS_API_AUTHENTICATION_ENDPOINT;

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public userLoginAsync(userLoginDto: UserLoginDto): Observable<ApiResponseDto<AuthenticationResultDto>> {
    return this._httpService.requestAsync<ApiResponseDto<AuthenticationResultDto>>(
      "POST",
      this._LOGIN_ENDPOINT.controller,
      undefined,
      undefined,
      undefined,
      undefined,
      userLoginDto
    );
  }
}
