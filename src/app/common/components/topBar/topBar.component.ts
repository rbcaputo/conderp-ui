import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { RouterModule, Router } from "@angular/router";
import { Subject, Observable, BehaviorSubject, filter, take, tap, switchMap, debounceTime, EMPTY, takeUntil } from "rxjs";
import { NotificationService } from "../../../domains/notifications/services/notificationService.service";
import { UserGetDto } from "../../../domains/personnel/users/dtos/userDtos.type";
import { DomainEventService } from "../../../events/services/domainEventService.service";
import { ApiResponseDto } from "../../../resources/dtos/apiResponseDto.type";
import { EntityType } from "../../../resources/types/entityTypes.enum";
import { DialogService } from "../../services/dialogService.service";
import { SessionService } from "../../services/sessionService.service";
import { EventListenerComponent } from "../eventListener/eventListener.component";

@Component({
  selector: "top-bar",
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    EventListenerComponent
],
  templateUrl: "./topBar.component.html",
  styleUrl: "./topBar.component.scss"
})
export class TopBarComponent implements OnInit, OnDestroy {
  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly sessionUser$: Observable<UserGetDto | null>;
  public unseenCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    private readonly _domainEventService: DomainEventService,
    private readonly _notificationService: NotificationService,
    private readonly _router: Router,
    public readonly dialogService: DialogService
  ) { this.sessionUser$ = this._sessionService.sessionUser$; }

  // On init behavior.
  public ngOnInit(): void {
    this.sessionUser$.pipe(
      filter((user): user is UserGetDto => !!user),
      take(1),
      tap(() => this.getUnseenNotificationsCountAsync()),
      switchMap(() => this._domainEventService.on(EntityType.Notification)?.pipe(debounceTime(300)) ?? EMPTY),
      takeUntil(this._destroy$)
    ).subscribe(() => this.getUnseenNotificationsCountAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getUnseenNotificationsCountAsync(): void {
    this._notificationService.getUnseenNotificationsCountByPublicIdAsync(this._sessionService.sessionUser?.publicId!)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<number>) => this.unseenCount$.next(response.data ?? 0),
        error: (error: HttpErrorResponse) => console.error(error)
      });
  }

  public userLogout(): void {
    this._sessionService.clearSession();
    this._router.navigate(["/login"]);
  }
}
