// from angular core
import {Component} from '@angular/core';
// from angular common
import {CommonModule} from '@angular/common';
// components
import {HeaderComponent} from "../header/header.component";
import {ContentComponent} from "../content/content.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ContentComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  // for change menu view when toggle menu icon
  isMenuOpened: boolean = true;
  // for add page title in layout
  pageTitle:string='Dash board'
}
