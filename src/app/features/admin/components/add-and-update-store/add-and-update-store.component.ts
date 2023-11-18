// angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// angular forms
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
// components
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {dropDownValues, InputDropdownComponent} from "../../../../shared/forms/input-dropdown/input-dropdown.component";
import {InputDateComponent} from "../../../../shared/forms/input-date/input-date.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";

@Component({
  selector: 'app-add-and-update-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputDropdownComponent,
    InputDateComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './add-and-update-store.component.html',
  styleUrls: ['./add-and-update-store.component.css'],
})
export class AddAndUpdateStoreComponent {
  // for get form group
  @Input() frmStore!: FormGroup;
  // for set Room list
  @Input()availableRoomList!:dropDownValues[]
  // for set Owner list
  @Input()ownerList!:dropDownValues[]
  // for set Owner list
  @Input()categoryList!:dropDownValues[]
  //  for form title
  @Input() frmTitle!: string;
  // for submit button inputs
  @Input() btnLabel!: string;
  @Input() isBtnLoading: boolean = false;
  // for return submit button clicked
  @Output() isSubmitted = new EventEmitter<boolean>();

  // for access form controllers
  get FormFields() {
    return this.frmStore.controls;
  }
}
