// from angular core
import { Injectable } from '@angular/core';
// common api service
import {ApiService} from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class StoreCategoryRepository {

  // for base url
  private readonly baseUrl = '/api/';
  constructor(private apiService: ApiService)  {
    //
  }
}
