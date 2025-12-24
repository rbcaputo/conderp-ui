import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, filter, take } from "rxjs";
import { UserGetDto } from "../../../domains/personnel/users/dtos/userDtos.type";
import { DomainEventDto } from "../../../events/dtos/domainEventDto.type";
import { DomainEventService } from "../../../events/services/domainEventService.service";
import { EntityType } from "../../../resources/types/entityTypes.enum";
import { SessionService } from "../../services/sessionService.service";
import { SseService } from "../../services/sseService.service";

@Component({
  selector: "event-listener",
  templateUrl: "./eventListenerComponent.html"
})
export class EventListenerComponent implements OnInit, OnDestroy {
  // Properties.
  private _sseSubs: Subscription = new Subscription();

  // Constructor.
  constructor(
    private readonly _sseService: SseService,
    private readonly _sessionService: SessionService,
    private readonly _domainEventService: DomainEventService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this._sessionService.sessionUser$
      .pipe(filter(user => !!user), take(1))
      .subscribe((user: UserGetDto) => {
        this._sseSubs.add(this._sseService.getServerSentEvent("Notification")
          .subscribe({
            next: (event: MessageEvent) => {
              const data: DomainEventDto = JSON.parse(event.data) as DomainEventDto;

              this._domainEventService.emit(data.entityType);

              if (data.receiverTypes.includes(user.userType))
                this._domainEventService.emit(EntityType.Notification);
            },
            error: (error: HttpErrorResponse) => console.error(error)
          }));

        this._sseSubs.add(this._sseService.getServerSentEvent("DomainEvent")
          .subscribe({
            next: (event: MessageEvent) => {
              const data = JSON.parse(event.data);

              this._domainEventService.emit(data.entityType as EntityType);
            },
            error: (error: HttpErrorResponse) => console.error(error)
          }));
      });
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._sseSubs.unsubscribe();
  }
}
