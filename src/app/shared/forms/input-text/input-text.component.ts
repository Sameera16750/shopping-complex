// angular core
import {Component, Input, Self} from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import {ControlValueAccessor, NgControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent implements ControlValueAccessor {

  // for form label
  @Input()label!:string;
  // for placeholder
  @Input()placeholder:string=''

  // for input type
  @Input()type:string='text';

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
