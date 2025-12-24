import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { endpoints } from "../../resources/data/endpoints.type";
import { getJwtCookie } from "../../utilities/jwt.utils";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  // Variables.
  private readonly _SYS_API_ENDPOINT: string = endpoints.SYS_API_ENDPOINT;

  // Constructor.
  public constructor(private readonly _httpClient: HttpClient) { }

  // Handle Http Post, Put, Delete and Get methods.
  public requestAsync<T>(
    method: string,
    controller: string,
    domain?: string,
    key1?: string,
    subdomain?: string,
    key2?: string,
    data?: object,
    options?: {
      headers?: HttpHeaders,
      params?: HttpParams,
      responseType?: "json",
      observe?: "body",
      withAuthorization?: boolean
    }
  ): Observable<T> {
    return this._httpClient.request<T>(
      method,
      `${this._SYS_API_ENDPOINT}/${controller}${domain ? `/${domain}` : ""}${key1 ? `/${key1}` : ""}${subdomain ? `/${subdomain}` : ""}${key2 ? `/${key2}` : ""}`,
      {
        headers: options?.withAuthorization === false
          ? (options?.headers ?? new HttpHeaders())
          : (options?.headers ?? new HttpHeaders()).set("Authorization", `Bearer ${getJwtCookie() ?? ""}`),
        params: options?.params,
        responseType: options?.responseType ?? "json",
        observe: options?.observe ?? "body",
        body: data
      }
    );
  }
}
