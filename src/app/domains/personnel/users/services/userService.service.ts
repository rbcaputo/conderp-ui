import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";
import { HttpService } from "../../../../common/services/httpService.service";
import { UserPostPutDto, UserGetDto } from "../dtos/userDtos.type";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // Properties.
  private readonly _USER_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["user"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addUserAsync(userPostDto: UserPostPutDto): Observable<ApiResponseDto<UserGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<UserGetDto>>(
      "POST",
      this._USER_ENDPOINT.controller,
      this._USER_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      userPostDto
    );
  }

  public updateUserByPublicIdAsync(userPublicId: string, userPostDto: UserPostPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._USER_ENDPOINT.controller,
      this._USER_ENDPOINT.domain,
      userPublicId,
      undefined,
      undefined,
      userPostDto
    );
  }

  public deleteUserByPublicIdAsync(userPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._USER_ENDPOINT.controller,
      this._USER_ENDPOINT.domain,
      userPublicId
    );
  }

  public getUserByPublicIdAsync(userPublicId: string): Observable<ApiResponseDto<UserGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<UserGetDto>>(
      "GET",
      this._USER_ENDPOINT.controller,
      this._USER_ENDPOINT.domain,
      userPublicId
    );
  }

  public getAllUsersAsync(): Observable<ApiResponseDto<UserGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<UserGetDto[]>>(
      "GET",
      this._USER_ENDPOINT.controller,
      this._USER_ENDPOINT.domain
    );
  }
}
