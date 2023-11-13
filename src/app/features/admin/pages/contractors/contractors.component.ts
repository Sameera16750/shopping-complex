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
import { tableColumn } from '../../../../core/models/tableData.model';
import {contractorTableData} from "../../../../core/models/contractor.model";

@Component({
  selector: 'app-contractors',
  standalone: true,
  imports: [CommonModule, AddAndUpdateContractorComponent, TableComponent],
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
})
export class ContractorsComponent {
  // for contractor details
  frmContractor!: FormGroup;
  // for contractor table schema
  contractorTableSchema: tableColumn[] = [
    { field: 'contractorName', header: 'Contractor Name' },
    { field: 'contactNo', header: 'Contact No' },
    { field: 'emailAddress', header: 'Email Address' },
    { field: 'address', header: 'Address' },
  ];
  // for contractor table data
  contractorTableData:contractorTableData[]=[
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
    {id:1,contractorName:'Sameera',address:'No 04,kandy',contactNo:'0785485682',emailAddress:'sameera@gmail.com'},
  ]

  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  // for initialize forms
  initializeForms(): void {
    this.frmContractor = this.frmBuilder.group({
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
      console.log(this.frmContractor.getRawValue());
    }
  }
}
