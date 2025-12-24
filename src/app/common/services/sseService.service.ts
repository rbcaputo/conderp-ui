import { endpoints } from '../../resources/data/endpoints.type';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EntityRoute } from "../../resources/data/entityRoute.type";

@Injectable({
  providedIn: "root"
})
export class SseService {
  // Properties.
  private readonly _STREAM_ENDPOINT: EntityRoute = endpoints.SYS_API_SSE_ENDPOINT;

  // Methods.
  public getServerSentEvent(eventName: string): Observable<MessageEvent> {
    return new Observable(observer => {
      const eventSource: EventSource = new EventSource(`${endpoints.SYS_API_ENDPOINT}/${this._STREAM_ENDPOINT.controller}`, { withCredentials: true });
      const eventHandler = (event: MessageEvent) => observer.next(event);

      eventSource.addEventListener(eventName, eventHandler);

      eventSource.onerror = error => observer.error(error);

      return () => {
        eventSource.removeEventListener(eventName, eventHandler);
        eventSource.close();
      }
    });
  }
}
