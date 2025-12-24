import { Injectable } from "@angular/core";
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { Observable } from "rxjs";
import { OrganicGetDto, OrganicPostDto, OrganicPutDto } from "../dtos/organicDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class OrganicService {
  // Properties.
  private readonly _ORGANIC_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["organic"];

  // Contructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addOrganicAsync(organicPostDto: OrganicPostDto): Observable<ApiResponseDto<OrganicGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<OrganicGetDto>>(
      "POST",
      this._ORGANIC_ENDPOINT.controller,
      this._ORGANIC_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      organicPostDto
    );
  }

  public updateOrganicByPublicIdAsync(organicPublicId: string, organicPutDto: OrganicPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._ORGANIC_ENDPOINT.controller,
      this._ORGANIC_ENDPOINT.domain,
      organicPublicId,
      undefined,
      undefined,
      organicPutDto
    );
  }

  public deleteOrganicByPublicIdAsync(organicPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._ORGANIC_ENDPOINT.controller,
      this._ORGANIC_ENDPOINT.domain,
      organicPublicId
    );
  }

  public getAllOrganicsAsync(): Observable<ApiResponseDto<OrganicGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<OrganicGetDto[]>>(
      "GET",
      this._ORGANIC_ENDPOINT.controller,
      this._ORGANIC_ENDPOINT.domain
    );
  }
}
