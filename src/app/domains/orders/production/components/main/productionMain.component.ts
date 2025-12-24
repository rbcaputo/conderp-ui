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
import { ORDER_STATUS_NAMES, OrderStatus } from "../../../../../resources/data/orderStatus.enum";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { EntityType } from "../../../../../resources/types/entityTypes.enum";
import { PRODUCTION_TYPE_NAMES } from "../../../../../resources/types/productionTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { ProductionGetDto } from "../../dtos/productionDtos.type";
import { ProductionService } from "../../services/productionService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "production-main",
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
  templateUrl: "./productionMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class ProductionMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType = EntityType.Production;
  public readonly entityName = "Ordem de Produção";
  public readonly displayedColumns: string[] = [
    "publicId",
    "name",
    "type",
    "amount",
    "openDate",
    "status",
    "closeDate"
  ];
  public readonly orderStatus: typeof OrderStatus = OrderStatus;
  public readonly PRODUCTION_TYPE_NAMES: typeof PRODUCTION_TYPE_NAMES = PRODUCTION_TYPE_NAMES;
  public readonly ORDER_STATUS_NAMES: typeof ORDER_STATUS_NAMES = ORDER_STATUS_NAMES;
  public dataSource: MatTableDataSource<ProductionGetDto> = new MatTableDataSource<ProductionGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _productionService: ProductionService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllProductionsAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllProductionsAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Class methods.
  private getAllProductionsAsync(): void {
    this._productionService.getAllProductionsAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<ProductionGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<ProductionGetDto>(response.data);

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
