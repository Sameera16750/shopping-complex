// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {MaintenanceRequest} from "../../core/models/maintenance.model";

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRepository {

  // for base url
  private readonly baseUrl:string = '/api/Maintenance';
  constructor(private apiService: ApiService)  {
    //
  }

  // for get all Maintenances
  getAllMaintenance():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save Maintenance
  saveMaintenance(maintenanceData:MaintenanceRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,maintenanceData)
  }

  // for get Maintenance data by id
  getMaintenanceByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update Maintenance
  updateMaintenance(id:number,maintenanceData:MaintenanceRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,maintenanceData)
  }

  // delete Maintenance
  deleteMaintenance(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
