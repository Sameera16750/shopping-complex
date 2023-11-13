// angular core
import {Component, Input} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// angular forms
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputTextComponent} from "../../../../shared/forms/input-text/input-text.component";
import {InputDropdownComponent} from "../../../../shared/forms/input-dropdown/input-dropdown.component";

@Component({
  selector: 'app-add-and-update-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputDropdownComponent,
  ],
  templateUrl: './add-and-update-store.component.html',
  styleUrls: ['./add-and-update-store.component.css'],
})
export class AddAndUpdateStoreComponent {
  // for get form group
  @Input() frmStore!: FormGroup;

  // for access form controllers
  get FormFields() {
    return this.frmStore.controls;
  }
}
