// angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
// components
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";
import {InputSwitchModule} from "primeng/inputswitch";

@Component({
  selector: 'app-add-and-update-store-categories',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SubmitButtonComponent,
    InputSwitchModule,
  ],
  templateUrl: './add-and-update-store-categories.component.html',
  styleUrls: ['./add-and-update-store-categories.component.css'],
})
export class AddAndUpdateStoreCategoriesComponent {
  // form group for form data
  @Input() frmStoreCategory!: FormGroup;
  //  for form title
  @Input() frmTitle!: string;
  // for submit button inputs
  @Input() btnLabel!: string;
  @Input() isBtnLoading: boolean = false;
  // for return submit button clicked
  @Output() isSubmitted = new EventEmitter<boolean>();
  get formField() {
    return this.frmStoreCategory.controls;
  }
}
