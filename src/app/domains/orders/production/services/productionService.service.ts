import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { ProductionGetDto, ProductionPostDto, ProductionPutDto } from "../dtos/productionDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class ProductionService {
  // Properties.
  private readonly _PRODUCTION_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["production"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Metthods.
  public addProductionAsync(productionPostDto: ProductionPostDto): Observable<ApiResponseDto<ProductionGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<ProductionGetDto>>(
      "POST",
      this._PRODUCTION_ENDPOINT.controller,
      this._PRODUCTION_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      productionPostDto
    );
  }

  public updateProductionByPublicIdAsync(productionPublicId: string, productionPutDto: ProductionPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._PRODUCTION_ENDPOINT.controller,
      this._PRODUCTION_ENDPOINT.domain,
      productionPublicId,
      undefined,
      undefined,
      productionPutDto
    );
  }

  public deleteProductionByPublicIdAsync(productionPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._PRODUCTION_ENDPOINT.controller,
      this._PRODUCTION_ENDPOINT.domain,
      productionPublicId
    );
  }

  public getAllProductionsAsync(): Observable<ApiResponseDto<ProductionGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<ProductionGetDto[]>>(
      "GET",
      this._PRODUCTION_ENDPOINT.controller,
      this._PRODUCTION_ENDPOINT.domain
    );
  }
}
