// from angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
// from angular common
import {CommonModule} from '@angular/common';
//  from prime ng
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //  for change page title dynamically
  @Input()pageTitle?:string;
  //  for change sidebar view
  @Output() isMenuOpened = new EventEmitter<boolean>();
  toggleMenu: boolean = true;

  // profile icon menu list
  items: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
    }
  ];

}
