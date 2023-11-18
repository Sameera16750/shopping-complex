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
import {
  StoreOwnerRequest,
  StoreOwnerTableDataModel,
} from '../../../../core/models/store-owner.model';
import { StoreOwnerService } from '../../../../core/services/store-owner.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-store-owners',
  standalone: true,
  imports: [
    CommonModule,
    AddAndUpdateStoreOwnerComponent,
    TableComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './store-owners.component.html',
  styleUrls: ['./store-owners.component.css'],
})
export class StoreOwnersComponent {
  // for store owner details
  frmStoreOwner!: FormGroup;
  // for store owner table schema
  storeOwnerTableSchema: TableColumnModel[] = [
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'contactNo', header: 'Contact No' },
    { field: 'email', header: 'Email Address' },
    { field: 'address', header: 'Address' },
    { field: 'nic', header: 'NIC No' },
  ];
  // for store owner table data
  storeOwnerTableData: StoreOwnerTableDataModel[] = [];

  // for change form state to save or update
  isFormOnSaveState: boolean = true;

  constructor(
    private frmBuilder: FormBuilder,
    private storeOwnerService: StoreOwnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.initializeForms();
    this.getAllStoreOwners();
  }

  // for get all Store owners
  private getAllStoreOwners(): void {
    this.storeOwnerService.getAllStoreOwners().subscribe((res) => {
      this.storeOwnerTableData = res
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          address: item.address,
          contactNo: item.contactNo,
          email: item.email,
          nic: item.nic,
        }));
    });
  }

  // initialize form
  private initializeForms(): void {
    this.frmStoreOwner = this.frmBuilder.group({
      id:[0,[]],
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
      let ownerData: StoreOwnerRequest = {
        firstName: this.frmStoreOwner.get('firstName')?.value,
        lastName: this.frmStoreOwner.get('lastName')?.value,
        address: this.frmStoreOwner.get('address')?.value,
        contactNo: this.frmStoreOwner.get('contactNo')?.value,
        email: this.frmStoreOwner.get('email')?.value,
        nic: this.frmStoreOwner.get('nic')?.value,
        status: 1,
      };

      this.storeOwnerService.saveStoreOwner(ownerData).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmStoreOwner.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // get store owner data by id
  getDataById(id: number): void {
    this.isFormOnSaveState = false;
    this.storeOwnerService.getStoreOwnerById(id).subscribe((res) => {
         this.frmStoreOwner.get('id')?.setValue(res.id);
         this.frmStoreOwner.get('firstName')?.setValue(res.firstName);
         this.frmStoreOwner.get('lastName')?.setValue(res.lastName);
         this.frmStoreOwner.get('address')?.setValue(res.address);
         this.frmStoreOwner.get('contactNo')?.setValue(res.contactNo);
         this.frmStoreOwner.get('email')?.setValue(res.email);
         this.frmStoreOwner.get('nic')?.setValue(res.nic);
    });
  }

  // for update data
  updateCategory() {
    this.frmStoreOwner.markAllAsTouched();
    if (this.frmStoreOwner.valid) {
      this.confirmationService.confirm({
        message: 'Do you want to Update this record?',
        header: 'Update Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          let ownerData: StoreOwnerRequest = {
            firstName: this.frmStoreOwner.get('firstName')?.value,
            lastName: this.frmStoreOwner.get('lastName')?.value,
            address: this.frmStoreOwner.get('address')?.value,
            contactNo: this.frmStoreOwner.get('contactNo')?.value,
            email: this.frmStoreOwner.get('email')?.value,
            nic: this.frmStoreOwner.get('nic')?.value,
            status: 1,
          };
          this.storeOwnerService
            .updateStoreOwner(
              this.frmStoreOwner.get('id')?.value,
              ownerData
            )
            .subscribe((res) => {
              this.messageService.add({
                severity: res.typ === 1 ? 'success' : 'error',
                summary: res.typ === 1 ? 'Success' : 'Error',
                detail: res.msg,
              });
              this.frmStoreOwner.reset();
              if (res.typ === 1) {
                window.location.reload();
              }
            });
        },
        reject: () => {},
      });
    }
  }
}
