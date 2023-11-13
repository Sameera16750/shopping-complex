//  angular core
import { Component } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//  components
import { AddAndUpdateStoreOwnerComponent } from '../../components/add-and-update-store-owner/add-and-update-store-owner.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumnModel } from '../../../../core/models/tableData.model';
import { StoreOwnerTableDataModel } from '../../../../core/models/store-owner.model';

@Component({
  selector: 'app-store-owners',
  standalone: true,
  imports: [CommonModule, AddAndUpdateStoreOwnerComponent, TableComponent],
  templateUrl: './store-owners.component.html',
  styleUrls: ['./store-owners.component.css'],
})
export class StoreOwnersComponent {
  // for store owner details
  frmStoreOwner!: FormGroup;
  // for store owner table schema
  frmOwnerTableSchema: TableColumnModel[] = [
    {field:'firstName',header:'First Name'},
    {field:'lastName',header:'Last Name'},
    {field:'contactNo',header:'Contact No'},
    {field:'email',header:'Email Address'},
    {field:'address',header:'Address'},
    {field:'nic',header:'NIC No'}
  ];
  // for store owner table data
  frmOwnerTableData: StoreOwnerTableDataModel[] = [
    {
      id: 1,
      firstName: 'Sameera',
      lastName: 'Madsushan',
      contactNo: '0755664179',
      address: 'no 04, kandy',
      email: 'sameera@gmail.com',
      nic: '2001345852',
    },
    {
      id: 2,
      firstName: 'Sameera',
      lastName: 'Madsushan',
      contactNo: '0755664179',
      address: 'no 04, kandy',
      email: 'sameera@gmail.com',
      nic: '2001345852',
    },
    {
      id: 3,
      firstName: 'Sameera',
      lastName: 'Madsushan',
      contactNo: '0755664179',
      address: 'no 04, kandy',
      email: 'sameera@gmail.com',
      nic: '2001345852',
    },
    {
      id: 4,
      firstName: 'Sameera',
      lastName: 'Madsushan',
      contactNo: '0755664179',
      address: 'no 04, kandy',
      email: 'sameera@gmail.com',
      nic: '2001345852',
    },
    {
      id: 5,
      firstName: 'Sameera',
      lastName: 'Madsushan',
      contactNo: '0755664179',
      address: 'no 04, kandy',
      email: 'sameera@gmail.com',
      nic: '2001345852',
    }
  ];

  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  // initialize form
  private initializeForms(): void {
    this.frmStoreOwner = this.frmBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
      nic: ['', [Validators.required]],
    });
  }

  //   for save store owner
  saveStoreOwner() {
    this.frmStoreOwner.markAllAsTouched();
    if (this.frmStoreOwner.valid) {
      console.log(this.frmStoreOwner.getRawValue());
    }
  }
}
