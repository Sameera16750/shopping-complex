// angular core
import { Component } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  angular router
import {Router} from "@angular/router";
// angular forms
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// components
import { InputTextComponent } from '../../../../shared/forms/input-text/input-text.component';
import {SubmitButtonComponent} from "../../../../shared/buttons/submit-button/submit-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // for login details
  frmLogin!: FormGroup;

  constructor(private frmBuilder: FormBuilder,private router:Router) {
    this.initializeForm();
  }

  // initializing form
  private initializeForm() {
    this.frmLogin = this.frmBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // access from controllers
  get formField() {
    return this.frmLogin.controls;
  }

  submitLogin() {
    this.frmLogin.markAllAsTouched();
    if (this.frmLogin.valid){
      this.router.navigate(['/admin'])
    }
  }
}
