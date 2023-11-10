// from angular core
import { Component } from '@angular/core';
// from angular common
import { CommonModule } from '@angular/common';
// from angular router
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-complex';
}
