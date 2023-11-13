// angular core
import {Component, Input, Self, ViewEncapsulation} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// prime ng
import { CalendarModule } from 'primeng/calendar';
//  angular forms
import {ControlValueAccessor, NgControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [CommonModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputDateComponent implements ControlValueAccessor {
  // for label
  @Input() label!: string;

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
