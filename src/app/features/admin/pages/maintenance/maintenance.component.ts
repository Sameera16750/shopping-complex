// angular core
import { Component } from '@angular/core';
// angular common
import { CommonModule, DatePipe } from '@angular/common';
//  angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// prm ng
import { TagModule } from 'primeng/tag';
// components
import { AddAndUpdateMaintenanceComponent } from '../../components/add-and-update-maintenance/add-and-update-maintenance.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  MaintenanceRequest,
  MaintenanceResponse,
  MaintenanceTableDataModel,
} from '../../../../core/models/maintenance.model';
import { TableColumnModel } from '../../../../core/models/tableData.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MaintenanceService } from '../../../../core/services/maintenance.service';
import { dropDownValues } from '../../../../shared/forms/input-dropdown/input-dropdown.component';
import { ContractorService } from '../../../../core/services/contractor.service';
import { ContractorResponse } from '../../../../core/models/contractor.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    AddAndUpdateMaintenanceComponent,
    TableComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService, DatePipe],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
  // for maintenance details
  frmMaintenance!: FormGroup;

  // for chane form status to save or update
  isFormInSaveState: boolean = true;

  // for maintenance list
  maintenanceList!: MaintenanceResponse[];

  // for maintenance list
  contractorList!: ContractorResponse[];

  // contractor Dropdown list
  contractorDropDownList!: dropDownValues[];

  // Maintenance Table Schema
  maintenanceTableSchema: TableColumnModel[] = [
    { field: 'location', header: 'Location' },
    { field: 'contractor', header: 'Contractor' },
    { field: 'maintenanceType', header: 'Maintenance Type' },
    { field: 'duration', header: 'Expected Time/Duration' },
    { field: 'totalCharge', header: 'Total Charge (Rs.)' },
    { field: 'advanceFee', header: 'Advance Fee (Rs.)' },
    { field: 'pendingBalance', header: 'Pending Balance (Rs.)' },
  ];

  // maintenance table data
  maintenanceTableData: MaintenanceTableDataModel[] = [];

  constructor(
    private frmBuilder: FormBuilder,
    private maintenanceService: MaintenanceService,
    private contractorService: ContractorService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.initializeForms();
    this.getAllMaintenance();
    this.getContractorBysStatus();
  }

  // for initialize forms
  private initializeForms(): void {
    this.frmMaintenance = this.frmBuilder.group({
      id: [0, []],
      location: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
      maintenanceType: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      totalCharge: ['', [Validators.required]],
      advanceFee: ['', [Validators.required]],
    });
  }

  // for get all maintenance
  private getAllMaintenance(): void {
    this.maintenanceService.getAllMaintenances().subscribe((res) => {
      this.maintenanceList = res;
      this.maintenanceTableData = this.maintenanceList
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          advanceFee: item.advancedValue,
          maintenanceType: item.maintenanceType,
          contractor: item.contractorNavigation.name,
          duration: `${item.startDate} To ${item.endDate}`,
          location: item.location,
          totalCharge: item.totalCharge,
          pendingBalance: item.totalCharge - item.advancedValue,
        }));
    });
  }

  // for all
  private getContractorBysStatus(): void {
    this.contractorService.getContractorsByStatus(1).subscribe((res) => {
      this.contractorList = res;
      this.contractorDropDownList = this.contractorList.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    });
  }

  // for save maintenance
  saveMaintenance(): void {
    this.frmMaintenance.markAllAsTouched();
    if (this.frmMaintenance.valid) {
      let data: MaintenanceRequest = {
        location: this.frmMaintenance.get('location')?.value,
        contractor: this.frmMaintenance.get('contractor')?.value.id,
        maintenanceType: this.frmMaintenance.get('maintenanceType')?.value,
        startDate: this.datePipe
          .transform(
            this.frmMaintenance.get('Duration')?.value[0],
            'MM/dd/YYYY'
          )
          ?.toString(),
        endDate: this.datePipe
          .transform(
            this.frmMaintenance.get('Duration')?.value[1],
            'MM/dd/YYYY'
          )
          ?.toString(),
        totalCharge: this.frmMaintenance.get('totalCharge')?.value,
        advancedValue: this.frmMaintenance.get('advanceFee')?.value,
        status: 1,
      };

      this.maintenanceService.saveMaintenance(data).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmMaintenance.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // for selected get element data
  selectMaintenanceToUpdate(id: number) {
    this.isFormInSaveState = false;
    this.maintenanceService.getMaintenanceById(id).subscribe((res) => {
      this.frmMaintenance.get('id')?.setValue(res.id);
      this.frmMaintenance.get('location')?.setValue(res.location);
      this.frmMaintenance.get('contractor')?.setValue({
        id: res.contractorNavigation.id,
        name: res.contractorNavigation.name,
      });
      this.frmMaintenance.get('maintenanceType')?.setValue(res.maintenanceType);
      this.frmMaintenance
        .get('Duration')
        ?.setValue([
          new Date(res.startDate ?? '2022/11/10'),
          new Date(res.endDate ?? '2022/11/11'),
        ]);
      this.frmMaintenance.get('totalCharge')?.setValue(res.totalCharge);
      this.frmMaintenance.get('advanceFee')?.setValue(res.advancedValue);

      console.log(this.frmMaintenance.getRawValue());
    });
  }

  // for update maintenance details
  updateMaintenance(): void {
    this.frmMaintenance.markAllAsTouched();
    if (this.frmMaintenance.valid) {
      this.confirmationService.confirm({
        message: 'Do you want to Update this record?',
        header: 'Update Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          let data: MaintenanceRequest = {
            location: this.frmMaintenance.get('location')?.value,
            contractor: this.frmMaintenance.get('contractor')?.value.id,
            maintenanceType: this.frmMaintenance.get('maintenanceType')?.value,
            startDate: this.datePipe
              .transform(
                this.frmMaintenance.get('Duration')?.value[0],
                'MM/dd/YYYY'
              )
              ?.toString(),
            endDate: this.datePipe
              .transform(
                this.frmMaintenance.get('Duration')?.value[1],
                'MM/dd/YYYY'
              )
              ?.toString(),
            totalCharge: this.frmMaintenance.get('totalCharge')?.value,
            advancedValue: this.frmMaintenance.get('advanceFee')?.value,
            status: 1,
          };
          this.maintenanceService
            .updateMaintenance(this.frmMaintenance.get('id')?.value, data)
            .subscribe((res) => {
              this.messageService.add({
                severity: res.typ === 1 ? 'success' : 'error',
                summary: res.typ === 1 ? 'Success' : 'Error',
                detail: res.msg,
              });
              this.frmMaintenance.reset();
              if (res.typ === 1) {
                window.location.reload();
              }
            });
        },
        reject: () => {},
      });
    }
  }

  deleteMaintenance(id:number){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.maintenanceService.deleteMaintenance(id).subscribe(res=>{
          this.messageService.add({
            severity: res.typ === 1 ? 'success' : 'error',
            summary: res.typ === 1 ? 'Success' : 'Error',
            detail: res.msg,
          });
          if (res.typ === 1) {
            window.location.reload();
          }
        });
      },
      reject: () => {},
    });
  }

  protected readonly event = event;
}
