import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {InputDateComponent} from "../../../../shared/forms/input-date/input-date.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";
import {dropDownValues, InputDropdownComponent} from "../../../../shared/forms/input-dropdown/input-dropdown.component";

@Component({
  selector: 'app-add-and-update-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputDateComponent,
    SubmitButtonComponent,
    InputDropdownComponent,
  ],
  templateUrl: './add-and-update-maintenance.component.html',
  styleUrls: ['./add-and-update-maintenance.component.css'],
})
export class AddAndUpdateMaintenanceComponent {
  // form maintenance details
  @Input() frmMaintenance!: FormGroup;
  //  for form title
  @Input() frmTitle!: string;
  // for contractor drop down list
  @Input() contractorList!:dropDownValues[];
  // for submit button inputs
  @Input() btnLabel!: string;
  @Input() isBtnLoading: boolean = false;
  // for return submit button clicked
  @Output() isSubmitted = new EventEmitter<boolean>();

  get formFields() {
    return this.frmMaintenance.controls;
  }
}
