import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../../../common/services/httpService.service";
import { endpoints } from "../../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../../resources/data/entityRoute.type";
import { BuyGetDto, BuyPostDto, BuyPutDto } from "../dtos/buyDtos.type";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";

@Injectable({
  providedIn: "root"
})
export class BuyService {
  // Properties.
  private readonly _BUY_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT["buy"];

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public addBuyAsync(buyPostDto: BuyPostDto): Observable<ApiResponseDto<BuyGetDto>> {
    return this._httpService.requestAsync<ApiResponseDto<BuyGetDto>>(
      "POST",
      this._BUY_ENDPOINT.controller,
      this._BUY_ENDPOINT.domain,
      undefined,
      undefined,
      undefined,
      buyPostDto
    );
  }

  public updateBuyByPublicIdAsync(buyPublicId: string, buyPutDto: BuyPutDto): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "PUT",
      this._BUY_ENDPOINT.controller,
      this._BUY_ENDPOINT.domain,
      buyPublicId,
      undefined,
      undefined,
      buyPutDto
    );
  }

  public deleteBuyByPublicIdAsync(buyPublicId: string): Observable<ApiResponseDto<string>> {
    return this._httpService.requestAsync<ApiResponseDto<string>>(
      "DELETE",
      this._BUY_ENDPOINT.controller,
      this._BUY_ENDPOINT.domain,
      buyPublicId
    );
  }

  public getAllBuysAsync(): Observable<ApiResponseDto<BuyGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<BuyGetDto[]>>(
      "GET",
      this._BUY_ENDPOINT.controller,
      this._BUY_ENDPOINT.domain
    );
  }
}
