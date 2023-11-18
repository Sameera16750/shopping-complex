// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {StoreRequest} from "../../core/models/store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreRepository {

  // for base url
  private readonly baseUrl = '/api/Store';
  constructor(private apiService: ApiService)  {}

  // for get all Store
  getAllStore():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save Store
  saveStore(storeData:StoreRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,storeData)
  }

  // for get Store data by id
  getStoreByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update Store
  updateStore(id:number,storeData:StoreRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,storeData)
  }

  // delete Store
  deleteStore(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
