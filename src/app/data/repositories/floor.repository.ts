// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
// rxjs
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {FloorRequest} from "../../core/models/floor.model";

@Injectable({
  providedIn: 'root'
})
export class FloorRepository {

  // for base url
  private readonly baseUrl = '/api/Floor';
  constructor(private apiService: ApiService)  {
    //
  }

  // for get all floors
  getAllFloors():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }

  //  for save floor
  saveFloor(floorData:FloorRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`
    return this.apiService.post(url,floorData)
  }

  // for get floor data by id
  getFloorByID(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update floor
  updateFloor(id:number,floorData:FloorRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,floorData)
  }

  // delete floor
  deleteFloor(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/delete/${id}`
    return  this.apiService.delete(url);
  }
}
