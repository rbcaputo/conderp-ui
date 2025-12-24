import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { endpoints } from "../../resources/data/endpoints.type";
import { AddressGetDto } from "../../resources/dtos/addressGetDto.type";

@Injectable({
  providedIn: "root"
})
export class PostalCodeService {
  // Class properties.
  private readonly _CEP_API_ENDPOINT: string = endpoints.CEP_API_ENDPOINT;

  // Constructor.
  constructor(private readonly _httpClient: HttpClient) { }

  // Class methods.
  public postalCodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value)
        return of(null);

      return this.getAddressByPostalCodeAsync(control.value)
        .pipe(map(response => {
          return response.error
            ? { invalidPostalCode: true }
            : null;
        }),
          catchError(() => of({ invalidPostalCode: true }))
        );
    };
  }

  public getAddressByPostalCodeAsync(postalCode: string): Observable<AddressGetDto> {
    return this._httpClient.get<AddressGetDto>(`${this._CEP_API_ENDPOINT}/${postalCode}`);
  }
}
