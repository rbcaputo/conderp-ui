import { Injectable } from "@angular/core";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

@Injectable({
  providedIn: "root"
})
export class ExcelExportService {
  // Class methods.
  public exportToExcel(data: any[], fileName: string): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add header rows.
    worksheet.columns = Object.keys(data[0]).map(key => (
      { header: key, key }
    ));
    // Add data rows.
    data.forEach(item => worksheet.addRow(item));

    // Generate and save file.
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });

      saveAs(blob, `${fileName}.xlsx`);
    });
  }
}
