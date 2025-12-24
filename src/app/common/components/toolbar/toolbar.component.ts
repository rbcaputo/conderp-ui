import { ENTITY_FIELD_MAP, EnumMap } from './maps/entityFieldMap.record';
import { CommonModule } from "@angular/common";
import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EntityType } from "../../../resources/types/entityTypes.enum";
import { DialogService } from "../../services/dialogService.service";
import { ExcelExportService } from "../../services/excelExportService.service";
import { tooltipPosition } from "../../../utilities/tooltips.utils";

@Component({
  selector: "toolbar",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss"
})
export class ToolbarComponent implements OnInit, OnChanges {
  // Data inputs.
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() entityType!: EntityType;
  @Input() entityName!: string;

  // Properties.
  public readonly entityTypes: typeof EntityType = EntityType;
  public readonly tooltipPosition: typeof tooltipPosition = tooltipPosition;
  public tooltips: string[] = [];
  public filterValue: string = "";

  // Constructor.
  public constructor(
    private readonly _exportService: ExcelExportService,
    public readonly dialogService: DialogService
  ) { }

  // On init behavior.
  public ngOnInit(): void {
    this.tooltips = [
      `Adicionar ${this.entityName}`,
      "Exportar para Excel"
    ];
  }

  // On changes behavior.
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['dataSource'] && this.dataSource) || (changes['entityName'] && this.dataSource))
      this.setFilterPredicate();
  }

  // Methods.
  private formatValue(
    entityType: EntityType,
    fieldName: string,
    value: any,
    data: any
  ): string {
    const mapEntry = ENTITY_FIELD_MAP[entityType]?.[fieldName];

    // Resolve enum map.
    let enumMap: EnumMap | undefined;

    if (typeof mapEntry === "function")
      enumMap = mapEntry(data);
    else if (mapEntry)
      enumMap = mapEntry;

    if (enumMap && typeof value === "number")
      return enumMap[value].toLowerCase();

    return (value != null
      ? String(value)
      : "").toLowerCase();
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const normalizedFilter = filter.trim().toLowerCase();

      return Object.keys(data).some(key => {
        const cellValue = this.formatValue(
          this.entityType,
          key,
          data[key],
          data);

        return cellValue.includes(normalizedFilter);
      });
    };
  }

  public applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  public resetFilter(): void {
    this.filterValue = "";
    this.dataSource.filter = "";
  }

  public exportEntityData(): void {
    let convertedTableData: object[];

    switch (this.entityType) {
      case EntityType.Customer:
        convertedTableData = this.dataSource.data.map(customer => ({
          "Cód. Identificador": customer.publicId,
          "Nome": customer.name,
          "Cnpj": customer.cnpj,
          "Telefone": customer.phone,
          "WhatsApp": customer.whatsApp,
          "Email": customer.email,
          "Website": customer.website,
          "Rua": customer.street,
          "Número": customer.number,
          "Complemento": customer.complement,
          "Bairro": customer.district,
          "Cidade": customer.city,
          "Estado": customer.state,
          "Cep": customer.postalCode
        }));

        this._exportService.exportToExcel(convertedTableData, "Clientes");
        break;

      case EntityType.Sale:
        convertedTableData = this.dataSource.data.map(saleOrder => ({
          "Cód. Identificador": saleOrder.publicId,
          "Solicitante": saleOrder.name,
          "Quantidade": saleOrder.amount,
          "Preço": saleOrder.price,
          "Data Abertura": saleOrder.openDate,
          "Status": saleOrder.status,
          "Data Fechamento": saleOrder.closeDate,
          "Cód. Produto": saleOrder.product.publicId,
          "Cód. Cliente": saleOrder.customer.publicId
        }));

        this._exportService.exportToExcel(convertedTableData, "PedidosVenda");

        break;

      case EntityType.Buy:
        convertedTableData = this.dataSource.data.map(buyOrder => ({
          "Cód. Identificador": buyOrder.publicId,
          "Solicitante": buyOrder.name,
          "Tipo": buyOrder.type,
          "Subtipo": buyOrder.subtype,
          "Quantidade": buyOrder.amount,
          "Data Abertura": buyOrder.openDate,
          "Status": buyOrder.status,
          "Data Fechamento": buyOrder.closeDate,
          "Cód. Fornecedor": buyOrder.supplier.publicId,
          "Preço": buyOrder.price
        }));

        this._exportService.exportToExcel(convertedTableData, "PedidosCompra");
        break;

      case EntityType.Supplier:
        convertedTableData = this.dataSource.data.map(supplier => ({
          "Cód. Identificador": supplier.publicId,
          "Nome": supplier.name,
          "Cnpj": supplier.cnpj,
          "Telefone": supplier.phone,
          "WhatsApp": supplier.whatsApp,
          "Email": supplier.email,
          "Website": supplier.website,
          "Rua": supplier.street,
          "Número": supplier.number,
          "Complemento": supplier.complement,
          "Bairro": supplier.district,
          "Cidade": supplier.city,
          "Estado": supplier.state,
          "Cep": supplier.postalCode
        }));

        this._exportService.exportToExcel(convertedTableData, "Fornecedores");
        break;

      case EntityType.Production:
        convertedTableData = this.dataSource.data.map(productionOrder => ({
          "Cód. Identificador": productionOrder.publicId,
          "Cód. Estoque": productionOrder.storageCode,
          "Solicitante": productionOrder.name,
          "Quantidade": productionOrder.amount,
          "Tipo": productionOrder.type,
          "Data Abertura": productionOrder.openDate,
          "Status": productionOrder.status,
          "Data Fechamento": productionOrder.closeDate,
          "Cód. Suprimento Fonte": productionOrder.sourceSupply.publicId,
          "Cód. Embalagem": productionOrder.package.publicId,
          "Cód. Suprimento Processado": productionOrder.processedSupply.publicId,
          "Cód. Produto Processado": productionOrder.processedProduct.publicId
        }));

        this._exportService.exportToExcel(convertedTableData, "OrdensProducao");
        break;

      case EntityType.Organic:
        convertedTableData = this.dataSource.data.map(supply => ({
          "Cód. Identificador": supply.publicId,
          "Cód. Estoque": supply.storageCode,
          "Tipo": supply.type,
          "Subtipo": supply.subtype,
          "Quantidade": supply.amount,
          "Origem": supply.origin,
          "Data Recebimento": supply.receiptDate,
          "Cód. Fornecedor": supply.supplier?.publicId,
          "Data Processamento": supply.processDate,
          "Cód. Suprimento Fonte": supply.sourceSupply?.publicId
        }));

        this._exportService.exportToExcel(convertedTableData, "Suprimentos");
        break;
    }
  }
}
