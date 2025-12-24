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
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { EntityType } from "../../../../../resources/types/entityTypes.enum";
import { PACKAGING_TYPE_NAMES } from "../../../../../resources/types/packagingTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { PackagingGetDto } from "../../dtos/packagingDtos.type";
import { PackagingService } from "../../services/packagingService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "packaging-main",
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
  templateUrl: "./packagingMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class PackagingMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType: EntityType = EntityType.Packaging;
  public readonly entityName: string = "Embalagem";
  public readonly displayedColumns: string[] = [
    "publicId",
    "storageCode",
    "packagingType",
    "amount",
    "receiptDate"
  ];
  public readonly PACKAGING_TYPE_NAMES: typeof PACKAGING_TYPE_NAMES = PACKAGING_TYPE_NAMES;
  public dataSource: MatTableDataSource<PackagingGetDto> = new MatTableDataSource<PackagingGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _packagingService: PackagingService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllPackagingsAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllPackagingsAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllPackagingsAsync(): void {
    this._packagingService.getAllPackagingsAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<PackagingGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<PackagingGetDto>(response.data);

          // Delay required for Angular Material to fully bind table helpers.
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 100);
        },
        error: (error: HttpErrorResponse) => this._snackBarService.displaySnackbar((error.error as ApiResponseDto<string>).message)
      });
  }
}
