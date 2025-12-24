import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopBarComponent } from "../topBar/topBar.component";
import { SideBarComponent } from "../sideBar/sideBar.component";

@Component({
  selector: "layout-wrapper",
  imports: [
    RouterOutlet,
    TopBarComponent,
    SideBarComponent
  ],
  templateUrl: "./layoutWrapper.component.html",
  styleUrl: "./layoutWrapper.component.scss"
})
export class LayoutWrapperComponent { }
