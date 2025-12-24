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
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { SaleGetDto } from "../../dtos/saleDtos.type";
import { SaleService } from "../../services/saleService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "sale-main",
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
  templateUrl: "./saleMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class SaleMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType = EntityType.Sale;
  public readonly entityName = "Ordem de Venda";
  public readonly displayedColumns: string[] = [
    "publicId",
    "name",
    "amount",
    "price",
    "openDate",
    "status",
    "closeDate"
  ];
  public readonly orderStatus: typeof OrderStatus = OrderStatus;
  public readonly ORDER_STATUS_NAMES: typeof ORDER_STATUS_NAMES = ORDER_STATUS_NAMES;
  public dataSource: MatTableDataSource<SaleGetDto> = new MatTableDataSource<SaleGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _saleService: SaleService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllSalesAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllSalesAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllSalesAsync(): void {
    this._saleService.getAllSalesAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<SaleGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<SaleGetDto>(response.data);

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
