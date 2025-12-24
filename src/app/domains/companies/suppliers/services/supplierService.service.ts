import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { HttpService } from "../../../../common/services/httpService.service";
import { SupplierGetDto, SupplierPostPutDto } from "../dtos/supplierDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})

export class SupplierService {
  // Properties.
  private readonly _SUPPLIER_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["supplier"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addSupplierAsync(supplierPostDto: SupplierPostPutDto): Observable<ApiResponseDto<SupplierGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<SupplierGetDto>>(
      "POST",
      this._SUPPLIER_ENDPOINT.controller,
      this._SUPPLIER_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      supplierPostDto
    );
  }

  public updateSupplierByPublicIdAsync(supplierPublicId: string, supplierPutDto: SupplierPostPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._SUPPLIER_ENDPOINT.controller,
      this._SUPPLIER_ENDPOINT.domain,
      supplierPublicId,
      undefined,
      undefined,
      supplierPutDto
    );
  }

  public deleteSupplierByPublicIdAsync(supplierPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._SUPPLIER_ENDPOINT.controller,
      this._SUPPLIER_ENDPOINT.domain,
      supplierPublicId
    );
  }

  public getAllSuppliersAsync(): Observable<ApiResponseDto<SupplierGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<SupplierGetDto[]>>(
      "GET",
      this._SUPPLIER_ENDPOINT.controller,
      this._SUPPLIER_ENDPOINT.domain
    );
  }
}
