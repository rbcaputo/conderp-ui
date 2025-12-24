import { Injectable } from "@angular/core";
import { SnackBarService } from "./snackBarService.service";

@Injectable({
  providedIn: "root"
})
export class ClipboardService {
  // Constructor.
  public constructor(private readonly _snackBarService: SnackBarService) { }

  // Class methods.
  copyTextToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
    this._snackBarService.displaySnackbar(`${value} copiado para a Área de Transferência.`);
  }
}
