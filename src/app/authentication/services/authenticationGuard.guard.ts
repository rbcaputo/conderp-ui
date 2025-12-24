import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { getJwtCookie, getTokenPayload, JwtPayload } from "../../utilities/jwt.utils";
import { UserType } from "../../resources/types/userTypes.enum";

function authenticationGuard(roles: (keyof typeof UserType)[]): CanActivateFn {
  return (): boolean => {
    const router: Router = inject(Router);
    const token: string | null = getJwtCookie();
    const payload: JwtPayload | null = getTokenPayload(token);
    const userRole: keyof typeof UserType = payload?.role as keyof typeof UserType;

    if (!token || !payload?.role) {
      router.navigate(["/login"]);

      return false;
    }

    if (userRole === "Administrator")
      return true;

    if (roles.length === 0)
      return true;

    if (!roles.includes(userRole)) {
      router.navigate(["/login"]);

      return false;
    }

    return true;
  }
}

export const commonGuard: CanActivateFn = authenticationGuard([]);
export const buyDomainGuard: CanActivateFn = authenticationGuard(["Administrator", "BuyManager", "BuyAgent"]);
export const productDomainGuard: CanActivateFn = authenticationGuard(["Administrator", "ProductionManager", "SaleManager", "ProductionAgent", "SaleAgent"]);
export const productionDomainGuard: CanActivateFn = authenticationGuard(["Administrator", "ProductionManager", "ProductionAgent"]);
export const saleDomainGuard: CanActivateFn = authenticationGuard(["Administrator", "SaleManager", "SaleAgent"]);
export const userDomainGuard: CanActivateFn = authenticationGuard(["Administrator"]);
