import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { SaleGetDto, SalePostDto, SalePutDto } from "../dtos/saleDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class SaleService {
  // Properties.
  private readonly _SALE_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["sale"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addSaleAsync(salePostDto: SalePostDto): Observable<ApiResponseDto<SaleGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<SaleGetDto>>(
      "POST",
      this._SALE_ENDPOINT.controller,
      this._SALE_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      salePostDto
    );
  }

  public updateSaleByPublicIdAsync(salePublicId: string, salePutDto: SalePutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._SALE_ENDPOINT.controller,
      this._SALE_ENDPOINT.domain,
      salePublicId,
      undefined,
      undefined,
      salePutDto
    );
  }

  public deleteSaleByPublicIdAsync(salePublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._SALE_ENDPOINT.controller,
      this._SALE_ENDPOINT.domain,
      salePublicId
    );
  }

  public getAllSalesAsync(): Observable<ApiResponseDto<SaleGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<SaleGetDto[]>>(
      "GET",
      this._SALE_ENDPOINT.controller,
      this._SALE_ENDPOINT.domain
    );
  }
}
