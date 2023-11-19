// angular core
import { Component } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// components
import { AddAndUpdateContractorComponent } from '../../components/add-and-update-contractor/add-and-update-contractor.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
// models
import { TableColumnModel } from '../../../../core/models/tableData.model';
import {
  ContractorRequest,
  ContractorResponse,
  ContractorTableDataModel,
} from '../../../../core/models/contractor.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContractorService } from '../../../../core/services/contractor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contractors',
  standalone: true,
  imports: [
    CommonModule,
    AddAndUpdateContractorComponent,
    TableComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
})
export class ContractorsComponent {
  // for contractor details
  frmContractor!: FormGroup;
  // for store all contractor details
  allContractors!: ContractorResponse[];
  // for change form state to save or update
  isFormSaveState: boolean = true;
  // for contractor table schema
  contractorTableSchema: TableColumnModel[] = [
    { field: 'contractorName', header: 'Contractor Name' },
    { field: 'contactNo', header: 'Contact No' },
    { field: 'emailAddress', header: 'Email Address' },
    { field: 'address', header: 'Address' },
  ];
  // for contractor table data
  contractorTableData: ContractorTableDataModel[] = [];

  constructor(
    private frmBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private contractorService: ContractorService
  ) {
    this.initializeForms();
    this.getAllContractors();
  }

  // for get all contractors
  getAllContractors(): void {
    this.contractorService.getAllContractors().subscribe((res) => {
      this.allContractors = res;
      this.contractorTableData = this.allContractors
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          address: item.address,
          contractorName: item.name,
          contactNo: item.contactNo,
          emailAddress: item.email,
        }));
    });
  }

  // for initialize forms
  initializeForms(): void {
    this.frmContractor = this.frmBuilder.group({
      id: ['', []],
      contractorName: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  // for save contractor
  saveContractor(): void {
    this.frmContractor.markAllAsTouched();
    if (this.frmContractor.valid) {
      let contractorData: ContractorRequest = {
        name: this.frmContractor.get('contractorName')?.value,
        contactNo: this.frmContractor.get('contactNo')?.value,
        address: this.frmContractor.get('address')?.value,
        email: this.frmContractor.get('emailAddress')?.value,
        status: 1,
      };
      this.contractorService.saveContractor(contractorData).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmContractor.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // for set selected element to update
  selectContractorToUpdate(id: number) {
    this.isFormSaveState = false;
    this.contractorService.getContractorById(id).subscribe((res) => {
      this.frmContractor.get('id')?.setValue(res.id);
      this.frmContractor.get('contractorName')?.setValue(res.name);
      this.frmContractor.get('contactNo')?.setValue(res.contactNo);
      this.frmContractor.get('address')?.setValue(res.address);
      this.frmContractor.get('emailAddress')?.setValue(res.email);
    });
  }

  //update contractor
  updateContractor() {
    this.confirmationService.confirm({
      message: 'Do you want to update this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        let contractorData: ContractorRequest = {
          name: this.frmContractor.get('contractorName')?.value,
          contactNo: this.frmContractor.get('contactNo')?.value,
          address: this.frmContractor.get('address')?.value,
          email: this.frmContractor.get('emailAddress')?.value,
          status: 1,
        };

        this.contractorService
          .updateContractor(this.frmContractor.get('id')?.value, contractorData)
          .subscribe((res) => {
            this.messageService.add({
              severity: res.typ === 1 ? 'success' : 'error',
              summary: res.typ === 1 ? 'Success' : 'Error',
              detail: res.msg,
            });
            this.frmContractor.reset();
            if (res.typ === 1) {
              window.location.reload();
            }
          });
      },
      reject: () => {},
    });
  }

  // for delete contractor details
  deleteContractor(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.contractorService
          .deleteContractor(id)
          .subscribe((res) => {
            this.messageService.add({
              severity: res.typ === 1 ? 'success' : 'error',
              summary: res.typ === 1 ? 'Success' : 'Error',
              detail: res.msg,
            });
            this.frmContractor.reset();
            if (res.typ === 1) {
              window.location.reload();
            }
          });
      },
      reject: () => {},
    });
  }

}
