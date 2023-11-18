// angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
//  angular forms
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";

@Component({
  selector: 'app-add-and-update-store-owner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './add-and-update-store-owner.component.html',
  styleUrls: ['./add-and-update-store-owner.component.css'],
})
export class AddAndUpdateStoreOwnerComponent {
  // for owner form
  @Input() frmOwner!: FormGroup;
  //  for form title
  @Input() frmTitle!: string;
  // for submit button inputs
  @Input() submitBtnLabel!: string;
  @Input() submitButtonLoading:boolean=false;

  // for identify form submitted
  @Output() formSubmitting=new EventEmitter<boolean>();

  get frmFields() {
    return this.frmOwner.controls;
  }

  protected readonly window = window;
}
