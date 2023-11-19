// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {ContractorRequest} from "../../core/models/contractor.model";

@Injectable({
  providedIn: 'root'
})
export class ContractorRepository {

  // for base url
  private readonly baseUrl:string = '/api/Contractor';
  constructor(private apiService: ApiService)  {}

  // for get all Contractors
  getAllContractor():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  // for get all Contractors
  getContractorsByStatus(status:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_status/${status}`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save Contractor
  saveContractor(contractorData:ContractorRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,contractorData)
  }

  // for get Contractor data by id
  getContractorByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update Contractor
  updateContractor(id:number,contractorData:ContractorRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,contractorData)
  }

  // delete Contractor
  deleteContractor(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
