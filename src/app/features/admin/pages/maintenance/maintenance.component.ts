// angular core
import { Component } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
//  angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// prm ng
import { TagModule } from 'primeng/tag';
// components
import { AddAndUpdateMaintenanceComponent } from '../../components/add-and-update-maintenance/add-and-update-maintenance.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MaintenanceTableDataModel } from '../../../../core/models/maintenance.model';
import {TableColumnModel} from "../../../../core/models/tableData.model";

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    AddAndUpdateMaintenanceComponent,
    TableComponent,
  ],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
  // for maintenance details
  frmMaintenance!: FormGroup;
  // Maintenance Table Schema
  maintenanceTableSchema: TableColumnModel[]=[
    {field:'location',header:'Location'},
    {field:'contractor',header:'Contractor'},
    {field:'maintenanceType',header:'Maintenance Type'},
    {field:'duration',header:'Duration'},
    {field:'totalCharge',header:'Total Charge (Rs.)'},
    {field:'advanceFee',header:'Advance Fee (Rs.)'},
    {field:'pendingBalance',header:'Pending Balance (Rs.)'},
  ];

  maintenanceTableData:MaintenanceTableDataModel[]=[
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
    {id:1,contractor:'sameera',advanceFee:1000,location:'Floor 1',pendingBalance:20000,maintenanceType:'Replacement',duration:'2023/10/1 - 2023/10/2',totalCharge:30000},
  ]



  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  // for initialize forms
  private initializeForms(): void {
    this.frmMaintenance = this.frmBuilder.group({
      location: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
      maintenanceType: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      totalCharge: ['', [Validators.required]],
      advanceFee: ['', [Validators.required]],
    });
  }

  // for save maintenance
  saveMaintenance(): void {
    this.frmMaintenance.markAllAsTouched();
    if (this.frmMaintenance.valid) {
      console.log(this.frmMaintenance.getRawValue());
    }
  }
}
