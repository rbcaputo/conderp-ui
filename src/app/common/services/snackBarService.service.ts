import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  // Constructor.
  public constructor(private readonly _snackBar: MatSnackBar) { }

  // Methods.
  public displaySnackbar(message?: string, duration: number = 10000): void {
    if (message)
      this._snackBar.open(message, undefined, { duration });
  }
}
