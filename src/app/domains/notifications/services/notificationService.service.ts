import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../../../resources/data/endpoints.type";
import { EntityRoute } from "../../../resources/data/entityRoute.type";
import { ApiResponseDto } from "../../../resources/dtos/apiResponseDto.type";
import { HttpService } from "../../../common/services/httpService.service";
import { NotificationGetDto } from "../dtos/notificationDtos.type";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  // Properties.
  private readonly _NOTIFICATION_ENDPOINT: EntityRoute = endpoints.ENTITY_ENDPOINT.notification;

  // Constructor.
  public constructor(private readonly _httpService: HttpService) { }

  // Methods.
  public toggleUserNotificationSeenByPublicIdAsync(userPublicId: string, notificationPublicId: string): Observable<ApiResponseDto<boolean>> {
    return this._httpService.requestAsync<ApiResponseDto<boolean>>(
      "PUT",
      this._NOTIFICATION_ENDPOINT.controller,
      this._NOTIFICATION_ENDPOINT.domain,
      userPublicId,
      this._NOTIFICATION_ENDPOINT.subdomain,
      notificationPublicId
    );
  }

  public getAllUserNotificationsByPublicIdAsync(userPublicId: string): Observable<ApiResponseDto<NotificationGetDto[]>> {
    return this._httpService.requestAsync<ApiResponseDto<NotificationGetDto[]>>(
      "GET",
      this._NOTIFICATION_ENDPOINT.controller,
      this._NOTIFICATION_ENDPOINT.domain,
      userPublicId
    );
  }

  public getUnseenNotificationsCountByPublicIdAsync(userPublicId: string): Observable<ApiResponseDto<number>> {
    return this._httpService.requestAsync<ApiResponseDto<number>>(
      "GET",
      this._NOTIFICATION_ENDPOINT.controller,
      this._NOTIFICATION_ENDPOINT.domain,
      userPublicId,
      "unseen"
    );
  }
}
