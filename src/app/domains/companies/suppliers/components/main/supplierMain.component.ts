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
import { EntityType } from "../../../../../resources/types/entityTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { SupplierGetDto } from "../../dtos/supplierDtos.type";
import { SupplierService } from "../../services/supplierService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "supplier-main",
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
  templateUrl: "./supplierMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class SupplierMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType: EntityType = EntityType.Supplier;
  public readonly entityName: string = "Fornecedor";
  public readonly displayedColumns: string[] = [
    "publicId",
    "name",
    "cnpj",
    "phone",
    "email",
    "city",
    "state"
  ];
  public dataSource: MatTableDataSource<SupplierGetDto> = new MatTableDataSource<SupplierGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _supplierService: SupplierService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllSuppliersAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllSuppliersAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllSuppliersAsync(): void {
    this._supplierService.getAllSuppliersAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<SupplierGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<SupplierGetDto>(response.data);

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
