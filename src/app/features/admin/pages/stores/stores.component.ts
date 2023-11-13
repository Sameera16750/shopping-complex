// angular core
import { Component } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// components
import {AddAndUpdateStoreComponent} from "../../components/add-and-update-store/add-and-update-store.component";

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, AddAndUpdateStoreComponent],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent {
  // for add and update store details
  frmStores!:FormGroup

  constructor(private frmBuilder:FormBuilder) {
    this.InitializeForms()
  }

  // initialize forms
  private InitializeForms():void{
    this.frmStores=this.frmBuilder.group({
      storeName:['',[Validators.required]],
      storeOwner:['',[Validators.required]],
      rentalStartTime:['',[Validators.required]],
      rentalEndTime:['',[Validators.required]],
      monthlyPaymentValue:['',[Validators.required]],
      spaceNumber:['',[Validators.required]],
      agreement:['',[Validators.required]]
    })
  }

}
