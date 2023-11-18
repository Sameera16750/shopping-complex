// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";
import {SpaceRequest} from "../../core/models/room.model";

@Injectable({
  providedIn: 'root'
})
export class SpaceRepository {

  // for base url
  private readonly baseUrl:string = '/api/Space';
  constructor(private apiService: ApiService)  {
    //
  }

  // for get all spaces
  getAllSpaces():Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_all`;
    return this.apiService.get<HttpResponseModel>(url);
  }

  // for save space
  saveSpace(space:SpaceRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/add`;
    return this.apiService.post(url,space);
  }

  // for get space data by id
  getSpaceById(id:number):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/get_by_id/${id}`
    return this.apiService.get(url)
  }

  // for Update space
  updateSpace(id:number,spaceData:SpaceRequest):Observable<HttpResponseModel>{
    const url:string=`${this.baseUrl}/update/${id}`
    return this.apiService.put(url,spaceData)
  }
}
