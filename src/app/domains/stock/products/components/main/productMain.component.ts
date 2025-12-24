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
import { ORGANIC_TYPE_NAMES, ORGANIC_SUBTYPE_NAMES } from "../../../../../resources/types/organicTypes.enum";
import { PRODUCT_TYPE_NAMES } from "../../../../../resources/types/productTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { ProductGetDto } from "../../dtos/productDtos.type";
import { ProductService } from "../../services/productService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "product-main",
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
  templateUrl: "./productMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class ProductMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType: EntityType = EntityType.Product;
  public readonly entityName: string = "Produto";
  public readonly displayedColumns: string[] = [
    "publicId",
    "storageCode",
    "productType",
    "productSubtype",
    "amount",
    "packagingDate"
  ];
  public readonly PRODUCT_TYPE_NAMES: typeof PRODUCT_TYPE_NAMES = PRODUCT_TYPE_NAMES;
  public readonly ORGANIC_TYPE_NAMES: typeof ORGANIC_TYPE_NAMES = ORGANIC_TYPE_NAMES;
  public readonly ORGANIC_SUBTYPE_NAMES: typeof ORGANIC_SUBTYPE_NAMES = ORGANIC_SUBTYPE_NAMES;
  public dataSource: MatTableDataSource<ProductGetDto> = new MatTableDataSource<ProductGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _productService: ProductService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllProductsAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllProductsAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllProductsAsync(): void {
    this._productService.getAllProductsAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<ProductGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<ProductGetDto>(response.data);

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
