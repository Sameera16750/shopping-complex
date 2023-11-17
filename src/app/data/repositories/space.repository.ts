// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpResponseModel} from "../../core/models/http-response.model";

@Injectable({
  providedIn: 'root'
})
export class SpaceRepository {

  // for base url
  private readonly baseUrl:string = '/api/Space';
  constructor(private apiService: ApiService)  {
    //
  }

  getAllSpaces():Observable<HttpResponseModel>{
    const url=`${this.baseUrl}/get_all`
    return this.apiService.get<HttpResponseModel>(url);
  }
}
