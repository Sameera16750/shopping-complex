// from angular core
import { Component } from '@angular/core';
// from angular common
import { CommonModule } from '@angular/common';
// components
import {HeaderComponent} from "../header/header.component";
import {ContentComponent} from "../content/content.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ContentComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

}
