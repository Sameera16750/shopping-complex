// angular core
import {
  Component,
  Input,
  Self,
  ViewEncapsulation,
} from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import {ControlValueAccessor, NgControl, ReactiveFormsModule} from '@angular/forms';
// prime ng
import { DropdownModule } from 'primeng/dropdown';

export type dropDownValues={
  id:number;
  name: string;
}
@Component({
  selector: 'app-input-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputDropdownComponent implements ControlValueAccessor{
  // for form label
  @Input() label!: string;
  // for dropdown lis
  @Input()options!: dropDownValues[];
  // for placeholder
  @Input()placeholder:string='';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange(fn: any): void {
    //
  }

  registerOnTouched(fn: any): void {
    //
  }

  setDisabledState(isDisabled: boolean): void {
    //
  }

  writeValue(obj: any): void {
    //
  }
}
