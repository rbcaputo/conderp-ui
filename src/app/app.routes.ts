import { Routes } from "@angular/router";
import { UserLoginComponent } from "./authentication/components/userLogin/userLogin.component";
import { CustomerMainComponent } from "./domains/companies/customers/components/main/customerMain.component";
import { SupplierMainComponent } from "./domains/companies/suppliers/components/main/supplierMain.component";
import { BuyMainComponent } from "./domains/orders/buys/components/main/buyMain.component";
import { ProductionMainComponent } from "./domains/orders/production/components/main/productionMain.component";
import { SaleMainComponent } from "./domains/orders/sales/components/main/saleMain.component";
import { UserMainComponent } from "./domains/personnel/users/components/main/userMain.component";
import { OrganicMainComponent } from "./domains/stock/organics/components/main/organicMain.component";
import { PackagingMainComponent } from "./domains/stock/packaging/components/main/packagingMain.component";
import { ProductMainComponent } from "./domains/stock/products/components/main/productMain.component";
import { LayoutWrapperComponent } from "./common/components/layoutWrapper/layoutWrapper.component";
import { buyDomainGuard, commonGuard, productDomainGuard, productionDomainGuard, saleDomainGuard, userDomainGuard } from "./authentication/services/authenticationGuard.guard";
import { NotificationMainComponent } from "./domains/notifications/components/main/notificationMain.component";
import { HomeComponent } from "./common/components/home/home.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: UserLoginComponent
  },
  {
    path: "",
    component: LayoutWrapperComponent,
    canActivate: [commonGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [commonGuard]
      },
      {
        path: "companies",
        children: [
          {
            path: "customers",
            component: CustomerMainComponent,
            canActivate: [saleDomainGuard]
          },
          {
            path: "suppliers",
            component: SupplierMainComponent,
            canActivate: [buyDomainGuard]
          }
        ]
      },
      {
        path: "orders",
        children: [
          {
            path: "buys",
            component: BuyMainComponent,
            canActivate: [buyDomainGuard]
          },
          {
            path: "production",
            component: ProductionMainComponent,
            canActivate: [productionDomainGuard]
          },
          {
            path: "sales",
            component: SaleMainComponent,
            canActivate: [saleDomainGuard]
          }
        ]
      },
      {
        path: "personnel",
        children: [
          {
            path: "users",
            component: UserMainComponent,
            canActivate: [userDomainGuard]
          }
        ]
      },
      {
        path: "stock",
        children: [
          {
            path: "organics",
            component: OrganicMainComponent,
            canActivate: [productionDomainGuard]
          },
          {
            path: "packaging",
            component: PackagingMainComponent,
            canActivate: [productionDomainGuard]
          },
          {
            path: "products",
            component: ProductMainComponent,
            canActivate: [productDomainGuard]
          }
        ]
      },
      {
        path: "notifications",
        component: NotificationMainComponent
      }
    ]
  }
];
