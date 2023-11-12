// angular core
import { Component, EventEmitter, Input, Output } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css'],
})
export class SubmitButtonComponent {
  @Input() label!:string
  @Input() isLoading: boolean = false;
  @Output() isButtonClicked = new EventEmitter<boolean>();
}
