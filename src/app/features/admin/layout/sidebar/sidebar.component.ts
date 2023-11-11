//  angular core
import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
//  angular common
import {CommonModule} from '@angular/common';
//  prime ng menu
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  // for change page title in admin panel
  @Output() pageTitle = new EventEmitter<string>()

  // for menu item list
  items?: MenuItem[] = [
    {
      label: 'Dash Board',
      icon: 'pi pi-th-large',
      routerLink: 'dashboard',
      command: () => {
        this.pageTitle.emit('dash board')
      }
    },
    {
      label: 'Spaces',
      icon: 'pi pi-map',
      items: [
        {
          label: 'Floors',
          icon: 'pi pi-building',
          routerLink: 'floors',
          command: () => {
            this.pageTitle.emit('Complex floors')
          }
        },
        {
          label: 'Rooms',
          icon: 'pi pi-tablet',
          routerLink: 'rooms',
          command: () => {
            this.pageTitle.emit('Floor rooms')
          }
        }
      ]
    },
    {
      label: 'Stores',
      icon: 'pi pi-tablet',
      items: [
        {
          label: 'Categories',
          icon: 'pi pi-tag',
          routerLink: 'store-categories',
          command: () => {
            this.pageTitle.emit('store categories')
          }
        },
        {
          label: 'Stores',
          icon: 'pi pi-mobile',
          routerLink: 'stores',
          command: () => {
            this.pageTitle.emit('complex stores')
          }
        },
        {
          label: 'Store Owners',
          icon: 'pi pi-fw pi-user',
          routerLink: 'store-owners',
          command: () => {
            this.pageTitle.emit('store owners')
          }
        }
      ]
    },
    {
      label: 'Maintenance',
      icon: 'pi pi-cog pi-spin',
      items: [
        {
          label: 'Contractors',
          icon: 'pi pi-building',
          routerLink: 'contractors',
          command: () => {
            this.pageTitle.emit('maintenance contractors')
          }
        },
        {
          label: 'Maintenance',
          icon: 'pi pi-cog pi-spin',
          routerLink: 'maintenance',
          command: () => {
            this.pageTitle.emit('complex maintenance')
          }
        }
      ]
    },
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Bookmark',
              icon: 'pi pi-fw pi-bookmark'
            },
            {
              label: 'Video',
              icon: 'pi pi-fw pi-video'
            }
          ]
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link'
        }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus'
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archieve',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        }
      ]
    }
  ];
}
