import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { SessionService } from "../../services/sessionService.service";
import { UserType } from "../../../resources/types/userTypes.enum";

@Component({
  selector: "side-bar",
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: "./sideBar.component.html",
  styleUrl: "./sideBar.component.scss",
})
export class SideBarComponent {
  // Properties.
  public readonly userType: typeof UserType = UserType;
  public sessionType?: UserType;

  // Constructor.
  public constructor(private readonly _sessionService: SessionService) { }

  // Getters.
  public get buyDomain() {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.BuyManager ||
      this._sessionService.sessionUser?.userType === UserType.BuyAgent;
  }

  public get productionDomain() {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.ProductionManager ||
      this._sessionService.sessionUser?.userType === UserType.ProductionAgent;
  }

  public get saleDomain() {
    return this._sessionService.sessionUser?.userType === UserType.Administrator ||
      this._sessionService.sessionUser?.userType === UserType.SaleManager ||
      this._sessionService.sessionUser?.userType === UserType.SaleAgent;
  }

  public get userDomain() {
    return this._sessionService.sessionUser?.userType === UserType.Administrator;
  }
}
