// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {StoreCategoryRequest} from "../../core/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class StoreCategoryRepository {

  // for base url
  private readonly baseUrl = '/api/StoreCategory';
  constructor(private apiService: ApiService)  {
    //
  }

  // for get all StoreCategory
  getAllStoreCategory():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save StoreCategory
  saveStoreCategory(storeCategoryData:StoreCategoryRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,storeCategoryData)
  }

  // for get StoreCategory data by id
  getStoreCategoryByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update StoreCategory
  updateStoreCategory(id:number,storeCategoryData:StoreCategoryRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,storeCategoryData)
  }

  // delete StoreCategory
  deleteStoreCategory(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
