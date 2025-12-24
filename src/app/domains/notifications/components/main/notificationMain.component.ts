import { markAsSeenTooltip, tooltipPosition } from './../../../../utilities/tooltips.utils';
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../resources/dtos/apiResponseDto.type";
import { ToolbarComponent } from "../../../../common/components/toolbar/toolbar.component";
import { SessionService } from "../../../../common/services/sessionService.service";
import { SnackBarService } from "../../../../common/services/snackBarService.service";
import { NotificationGetDto } from "../../dtos/notificationDtos.type";
import { NotificationService } from "../../services/notificationService.service";
import { DomainEventService } from '../../../../events/services/domainEventService.service';
import { EntityType } from '../../../../resources/types/entityTypes.enum';
import { DialogService } from '../../../../common/services/dialogService.service';

@Component({
  selector: "notification-main",
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ToolbarComponent
  ],
  templateUrl: "./notificationMain.component.html",
  styleUrl: "../../../../common/scss/main.style.scss"
})
export class NotificationMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType: EntityType = EntityType.Notification;
  public readonly displayedColumns: string[] = [
    "date",
    "title",
    "name",
    "seen"
  ];
  public readonly markAsSeenTooltip: typeof markAsSeenTooltip = markAsSeenTooltip;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public dataSource: MatTableDataSource<NotificationGetDto> = new MatTableDataSource<NotificationGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _sessionService: SessionService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    private readonly _notificationService: NotificationService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllUserNotificationsByPublicIdAsync();
    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllUserNotificationsByPublicIdAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllUserNotificationsByPublicIdAsync(): void {
    this._notificationService.getAllUserNotificationsByPublicIdAsync(this._sessionService.sessionUser?.publicId!)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<NotificationGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<NotificationGetDto>(response.data);

          // Delay required for Angular Material to fully bind table helpers.
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 100);
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }

  public toggleUserNotificationSeenByPublicIdAsync(notificationPublicId: string, event: MouseEvent): void {
    event.stopPropagation();
    this._notificationService.toggleUserNotificationSeenByPublicIdAsync(this._sessionService.sessionUser?.publicId!, notificationPublicId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<boolean>) => {
          const notification: NotificationGetDto | undefined = this.dataSource.data.find(n => n.publicId === notificationPublicId);

          if (notification) {
            notification.seen = response.data;
            this.dataSource.data = [...this.dataSource.data];

            this._domainEventService.emit(EntityType.Notification);
          }
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }
}
