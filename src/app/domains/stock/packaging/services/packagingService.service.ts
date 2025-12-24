import { Injectable } from "@angular/core";
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { Observable } from "rxjs";
import { PackagingGetDto, PackagingPostDto, PackagingPutDto } from "../dtos/packagingDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class PackagingService {
  // Properties.
  public readonly _PACKAGING_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["packaging"];


  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addPackagingAsync(packagingPostDto: PackagingPostDto): Observable<ApiResponseDto<PackagingGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<PackagingGetDto>>(
      "POST",
      this._PACKAGING_ENDPOINT.controller,
      this._PACKAGING_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      packagingPostDto
    );
  }

  public updatePackagingByPublicIdAsync(packagingPublicId: string, packagingPutDto: PackagingPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._PACKAGING_ENDPOINT.controller,
      this._PACKAGING_ENDPOINT.domain,
      packagingPublicId,
      undefined,
      undefined,
      packagingPutDto
    );
  }

  public deletePackagingByPublicIdAsync(packagingPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._PACKAGING_ENDPOINT.controller,
      this._PACKAGING_ENDPOINT.domain,
      packagingPublicId
    );
  }

  public getAllPackagingsAsync(): Observable<ApiResponseDto<PackagingGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<PackagingGetDto[]>>(
      "GET",
      this._PACKAGING_ENDPOINT.controller,
      this._PACKAGING_ENDPOINT.domain
    );
  }
}
