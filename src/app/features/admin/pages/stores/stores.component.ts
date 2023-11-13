// angular core
import { Component, OnInit } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// components
import { AddAndUpdateStoreComponent } from '../../components/add-and-update-store/add-and-update-store.component';
import {dropDownValues, InputDropdownComponent} from '../../../../shared/forms/input-dropdown/input-dropdown.component';
import { InputTextComponent } from '../../../../shared/forms/input-text/input-text.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { tableColumn } from '../../../../core/models/tableData.model';
import {
  pendingPaymentTableData,
  storeTableData,
} from '../../../../core/models/store.model';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    CommonModule,
    AddAndUpdateStoreComponent,
    InputTextComponent,
    ReactiveFormsModule,
    TableComponent,
    TagModule,
    InputDropdownComponent,
  ],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  // for visibility of pending payment tap
  isPendingPaymentShow: boolean = false;
  // for add and update store details
  frmStores!: FormGroup;
  // form for search
  frmSearchPendingPayments!: FormGroup;
  frmSearchStore!: FormGroup;

  // data for available spaces dropdown
  availableSpacesList: dropDownValues[] = [
    { name: 'F1R1', id: 1 },
    { name: 'F1R2', id: 2 },
    { name: 'F1R3', id: 3 },
    { name: 'F1R5', id: 4 },
  ];
  // data for owner dropdown
  ownerList: dropDownValues[] = [
    { name: 'Sameera', id: 1 },
    { name: 'Kasun', id: 2 },
    { name: 'Nimal', id: 3 },
    { name: 'Tilina', id: 4 },
  ];
  // table schema for pending payment
  pendingPaymentTableSchema: tableColumn[] = [
    { field: 'shopName', header: 'Shop Name' },
    { field: 'year', header: 'Year' },
    { field: 'month', header: 'Month' },
    { field: 'totalPayment', header: 'Total Payment' },
  ];
  // table data for pending payments
  pendingPaymentTableData: pendingPaymentTableData[] = [
    {
      id: 1,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 2,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 3,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 4,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 5,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
  ];
  // table schema for store
  storeTableSchema: tableColumn[] = [
    { field: 'spaceNumber', header: 'Space Number' },
    { field: 'shopName', header: 'Shop Name' },
    { field: 'shopCategory', header: 'Shop Category' },
    { field: 'ownerName', header: 'Owner Name' },
    { field: 'rentalTimeDuration', header: 'Rental Time Duration' },
  ];
  // table data for pending payments
  storeTableData: storeTableData[] = [
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
    {
      id: 1,
      ownerName: 'sameera',
      shopName: 'SM TextStyles',
      shopCategory: 'Text styles',
      rentalTimeDuration: '2023-2025',
      spaceNumber: 'F1R1',
    },
  ];

  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  ngOnInit() {
    this.searchPendingPayments();
    this.searchSearchStore()
  }

  // initialize forms
  private initializeForms(): void {
    this.frmStores = this.frmBuilder.group({
      storeName: ['', [Validators.required]],
      storeOwner: ['', [Validators.required]],
      storeCategory: ['', [Validators.required]],
      rentalTimeDuration: ['', [Validators.required]],
      monthlyPaymentValue: ['', [Validators.required]],
      spaceNumber: ['', [Validators.required]],
      keyMoney: ['', [Validators.required]],
    });

    this.frmSearchPendingPayments = this.frmBuilder.group({
      shopName: ['', []],
    });

    this.frmSearchStore = this.frmBuilder.group({
      shopName: ['', []],
      shopCategory: ['', []],
      shopOwnerName: ['', []],
    });
  }

  // for access search stores form controls
  get frmSearchStoreControls() {
    return this.frmSearchStore.controls;
  }

  // for access search payment form controls
  get frmSearchPaymentControls() {
    return this.frmSearchPendingPayments.controls;
  }

  //  for save store
  saveStore() {
    this.frmStores.markAllAsTouched();
    if (this.frmStores.valid) {
      console.log(this.frmStores.getRawValue());
    }
  }

  //for search shop
  searchSearchStore(): void {
    this.frmSearchStore.get('shopName')?.valueChanges.subscribe((newValue) => {
      console.log(newValue)
    });
  }

  //for search pending payments
  searchPendingPayments(): void {
    this.frmSearchPendingPayments
      .get('shopName')
      ?.valueChanges.subscribe((newValue) => {
        console.log(newValue)
      });
  }
}
