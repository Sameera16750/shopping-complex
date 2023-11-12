// angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import { FormGroup, ReactiveFormsModule} from '@angular/forms';
// components
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";
import {dropDownValues, InputDropdownComponent} from "../../../../shared/forms/input-dropdown/input-dropdown.component";

@Component({
  selector: 'app-add-and-update-space',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SubmitButtonComponent,
    InputDropdownComponent,
  ],
  templateUrl: './add-and-update-space.component.html',
  styleUrls: ['./add-and-update-space.component.css'],
})
export class AddAndUpdateSpaceComponent {

  // for set floor list
  @Input()floorList!:dropDownValues[]
  // for set submit button label
  @Input()submitButtonLabel!:string;
  // for submit button loading animation
  @Input()isSubmitButtonLoading!:boolean;
  // for declare form group
  @Input() frmAddUpdateSpaceDetails!: FormGroup;
  // for return form data to parent
  @Output() buttonSubmitted=new EventEmitter<any>();

  //  for access form controllers
  get formField() {
    return this.frmAddUpdateSpaceDetails.controls;
  }
}
