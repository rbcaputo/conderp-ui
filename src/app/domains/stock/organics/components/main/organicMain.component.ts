import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, takeUntil } from "rxjs";
import { ApiResponseDto } from "../../../../../resources/dtos/apiResponseDto.type";
import { TypeNamePipe } from "../../../../../resources/pipes/typeNamePipe.pipe";
import { EntityType } from "../../../../../resources/types/entityTypes.enum";
import { ORGANIC_TYPE_NAMES, ORGANIC_SUBTYPE_NAMES } from "../../../../../resources/types/organicTypes.enum";
import { ToolbarComponent } from "../../../../../common/components/toolbar/toolbar.component";
import { DialogService } from "../../../../../common/services/dialogService.service";
import { SnackBarService } from "../../../../../common/services/snackBarService.service";
import { OrganicGetDto } from "../../dtos/organicDtos.type";
import { OrganicService } from "../../services/organicService.service";
import { DomainEventService } from "../../../../../events/services/domainEventService.service";

@Component({
  selector: "organic-main",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ToolbarComponent,
    TypeNamePipe
  ],
  templateUrl: "./organicMain.component.html",
  styleUrl: "../../../../../common/scss/main.style.scss"
})
export class OrganicMainComponent implements OnInit, OnDestroy {
  // Children view.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Properties.
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public readonly entityType = EntityType.Organic;
  public readonly entityName = "Orgânico";
  public readonly displayedColumns: string[] = [
    "publicId",
    "storageCode",
    "organicType",
    "organicSubtype",
    "amount"
  ];
  public readonly ORGANIC_TYPE_NAMES: typeof ORGANIC_TYPE_NAMES = ORGANIC_TYPE_NAMES;
  public readonly ORGANIC_SUBTYPE_NAMES: typeof ORGANIC_SUBTYPE_NAMES = ORGANIC_SUBTYPE_NAMES;
  public dataSource: MatTableDataSource<OrganicGetDto> = new MatTableDataSource<OrganicGetDto>();
  public emptyResponseMessage?: string;

  // Constructor.
  public constructor(
    private readonly _organicService: OrganicService,
    private readonly _domainEventService: DomainEventService,
    private readonly _snackBarService: SnackBarService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.dialogService.currentEntityType = this.entityType;

    this.getAllOrganicsAsync();

    this._domainEventService.on(this.entityType)
      ?.pipe(takeUntil(this._destroy$))
      .subscribe(() => this.getAllOrganicsAsync());
  }

  // On destroy behavior.
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // Methods.
  private getAllOrganicsAsync(): void {
    this._organicService.getAllOrganicsAsync()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: ApiResponseDto<OrganicGetDto[]>) => {
          if (!response.data)
            this.emptyResponseMessage = response.message;

          this.dataSource = new MatTableDataSource<OrganicGetDto>(response.data);

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
