//  angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  angular forms
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
//  components
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";

@Component({
  selector: 'app-add-and-update-floor',
  standalone: true,
  imports: [
    CommonModule,
    InputTextComponent,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './add-and-update-floor.component.html',
  styleUrls: ['./add-and-update-floor.component.css'],
})
export class AddAndUpdateFloorComponent {

  // for submit button label
  @Input()submitButtonLabel!:string;
  // for submit button loading animation
  @Input()isSubmitButtonLoading!:boolean;
  // for declare form group
  @Input() frmAddUpdateFloorDetails!: FormGroup;
  // for return form data to parent
  @Output() buttonSubmitted=new EventEmitter<any>();

  //  for access form controllers
  get formField() {
    return this.frmAddUpdateFloorDetails.controls;
  }

}
