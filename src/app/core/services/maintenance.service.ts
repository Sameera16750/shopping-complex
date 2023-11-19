import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpResponseModel } from '../models/http-response.model';
import { MaintenanceRepository } from '../../data/repositories/maintenance.Repository';
import {MaintenanceRequest, MaintenanceResponse} from '../models/maintenance.model';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private maintenanceRepo: MaintenanceRepository) {}

  // get all Maintenance categories
  getAllMaintenances(): Observable<MaintenanceResponse[]> {
    return this.maintenanceRepo.getAllMaintenance().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          maintenanceType: item.maintenanceType,
          location: item.location,
          contractorNavigation: item.contractorNavigation,
          startDate: item.startDate,
          endDate: item.endDate,
          totalCharge: item.totalCharge,
          advancedValue: item.advancedValue,
          status: item.status,
        })) as MaintenanceResponse[];
      })
    );
  }

  //  for save Maintenance
  saveMaintenance(
    maintenanceData: MaintenanceRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.maintenanceRepo.saveMaintenance(maintenanceData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get Maintenance by id
  getMaintenanceById(id: number): Observable<MaintenanceResponse> {
    return this.maintenanceRepo.getMaintenanceByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id: responseData.id,
          maintenanceType:responseData.maintenanceType,
          location:responseData.location,
          contractorNavigation:responseData.contractorNavigation,
          startDate:responseData.startDate,
          endDate:responseData.endDate,
          totalCharge:responseData.totalCharge,
          advancedValue:responseData.advancedValue,
          status:responseData.status,
        } as MaintenanceResponse;
      })
    );
  }

  // for update  Maintenance details
  updateMaintenance(
    id: number,
    maintenanceData: MaintenanceRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.maintenanceRepo.updateMaintenance(id, maintenanceData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete Maintenance details
  deleteMaintenance(id: number): Observable<{ msg: string; typ: number }> {
    return this.maintenanceRepo.deleteMaintenance(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
