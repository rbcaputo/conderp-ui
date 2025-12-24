import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../../../common/services/httpService.service";
import { CustomerGetDto, CustomerPostPutDto } from "../dtos/customerDtos.type";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})

export class CustomerService {
  // Properties.
  private readonly _CUSTOMER_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["customer"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addCustomerAsync(customerPostDto: CustomerPostPutDto): Observable<ApiResponseDto<CustomerGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<CustomerGetDto>>(
      "POST",
      this._CUSTOMER_ENDPOINT.controller,
      this._CUSTOMER_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      customerPostDto
    );
  }

  public updateCustomerByPublicIdAsync(customerPublicId: string, customerPutDto: CustomerPostPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._CUSTOMER_ENDPOINT.controller,
      this._CUSTOMER_ENDPOINT.domain,
      customerPublicId,
      undefined,
      undefined,
      customerPutDto
    );
  }

  public deleteCustomerByPublicIdAsync(customerPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._CUSTOMER_ENDPOINT.controller,
      this._CUSTOMER_ENDPOINT.domain,
      customerPublicId
    );
  }

  public getAllCustomersAsync(): Observable<ApiResponseDto<CustomerGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<CustomerGetDto[]>>(
      "GET",
      this._CUSTOMER_ENDPOINT.controller,
      this._CUSTOMER_ENDPOINT.domain
    );
  }
}
