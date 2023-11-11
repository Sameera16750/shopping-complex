// from angular core
import { Component } from '@angular/core';
// from angular common
import { CommonModule } from '@angular/common';
// from angular router
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

}
