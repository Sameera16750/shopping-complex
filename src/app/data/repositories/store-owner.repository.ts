// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {StoreOwnerRequest} from "../../core/models/store-owner.model";

@Injectable({
  providedIn: 'root'
})
export class StoreOwnerRepository {

  // for base url
  private readonly baseUrl = '/api/StoreOwner';

  constructor(private apiService: ApiService)  {}

  // for get all StoreOwner
  getAllStoreOwner():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  // for get all StoreOwner
  getStoreOwnersByStatus(status:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_status/${status}`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save StoreOwner
  saveStoreOwner(storeOwnerData:StoreOwnerRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,storeOwnerData)
  }

  // for get StoreOwner data by id
  getStoreOwnerByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update StoreOwner
  updateStoreOwner(id:number,storeOwnerData:StoreOwnerRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,storeOwnerData)
  }

  // delete StoreOwner
  deleteStoreOwner(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
