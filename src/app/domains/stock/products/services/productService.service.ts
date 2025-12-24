import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductGetDto, ProductPutDto } from './../dtos/productDtos.type';
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { ProductPostDto } from "../dtos/productDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  // Properties.
  private readonly _PRODUCT_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["product"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addProductAsync(productPostDto: ProductPostDto): Observable<ApiResponseDto<ProductGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<ProductGetDto>>(
      "POST",
      this._PRODUCT_ENDPOINT.controller,
      this._PRODUCT_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      productPostDto
    );
  }

  public updateProductByPublicIdAsync(productPublicId: string, productPutDto: ProductPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._PRODUCT_ENDPOINT.controller,
      this._PRODUCT_ENDPOINT.domain,
      productPublicId,
      undefined,
      undefined,
      productPutDto
    );
  }

  public deleteProductByPublicIdAsync(productPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._PRODUCT_ENDPOINT.controller,
      this._PRODUCT_ENDPOINT.domain,
      productPublicId
    );
  }

  public getAllProductsAsync(): Observable<ApiResponseDto<ProductGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<ProductGetDto[]>>(
      "GET",
      this._PRODUCT_ENDPOINT.controller,
      this._PRODUCT_ENDPOINT.domain
    );
  }
}
