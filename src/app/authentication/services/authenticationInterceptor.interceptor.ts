import { HttpInterceptorFn } from "@angular/common/http";
import { endpoints } from "../../resources/data/endpoints.type";

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const token = sessionStorage.getItem("auth_token");

  if (token && request.url.startsWith(endpoints.SYS_API_ENDPOINT)) {
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next(authRequest);
  }

  return next(request);
};
