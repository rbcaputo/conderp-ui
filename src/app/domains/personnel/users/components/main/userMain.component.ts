import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { EntityType } from "../../../../../resources/types/entityTypes.enum";
import { USER_TYPE_NAMES } from "../../../../../resources/types/userTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { UserGetDto } from "../../dtos/userDtos.type";
import { UserService } from "../../services/userService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "user-main",
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ToolbarComponent,
    TypeNamePipe
  ],
  templateUrl: "./userMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class UserMainComponent {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType: EntityType = EntityType.User;
  public readonly entityName: string = "Usuário";
  public readonly displayedColumns: string[] = [
    "publicId",
    "userType",
    "name",
    "phone",
    "email",
    "city",
    "state"
  ];
  public readonly USER_TYPE_NAMES: typeof USER_TYPE_NAMES = USER_TYPE_NAMES;
  public dataSource: MatTableDataSource<UserGetDto> = new MatTableDataSource<UserGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _userService: UserService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllUsersAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllUsersAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllUsersAsync(): void {
    this._userService.getAllUsersAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<UserGetDto[]>) => {
          if (response.data) {
            this.dataSource = new MatTableDataSource<UserGetDto>(response.data);

            // Delay required for Angular Material to fully bind table helpers.
            setTimeout(() => {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }, 100);
          }
          else
            this.emptyResponseMessage = response.message;
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }
}
