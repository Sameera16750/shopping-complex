import { Injectable } from '@angular/core';
import {StoreOwnerRepository} from "../../data/repositories/store-owner.repository";
import {map, Observable} from "rxjs";
import {StoreOwnerRequest, StoreOwnerResponse} from "../models/store-owner.model";
import {HttpResponseModel} from "../models/http-response.model";

@Injectable({
  providedIn: 'root'
})
export class StoreOwnerService {

  constructor(private storeOwnerRepo:StoreOwnerRepository) { }

  // get all store categories
  getAllStoreOwners(): Observable<StoreOwnerResponse[]> {
    return this.storeOwnerRepo.getAllStoreOwner().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          address: item.address,
          contactNo: item.contactNo,
          email: item.email,
          nic: item.nic,
          status:item.status
        })) as StoreOwnerResponse[];
      })
    );
  }

  // for get store owners by status
  getStoreOwnersByStatus(status:number): Observable<StoreOwnerResponse[]> {
    return this.storeOwnerRepo.getStoreOwnersByStatus(status).pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          address: item.address,
          contactNo: item.contactNo,
          email: item.email,
          nic: item.nic,
          status:item.status
        })) as StoreOwnerResponse[];
      })
    );
  }

  //  for save store Owner
  saveStoreOwner(storeOwnerData: StoreOwnerRequest): Observable<{ msg: string; typ: number }> {
    return this.storeOwnerRepo.saveStoreOwner(storeOwnerData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get store Owner by id
  getStoreOwnerById(id: number): Observable<StoreOwnerResponse> {
    return this.storeOwnerRepo.getStoreOwnerByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id:responseData.id,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          address: responseData.address,
          contactNo: responseData.contactNo,
          email: responseData.email,
          nic:responseData.nic,
          status:responseData.status
        } as StoreOwnerResponse;
      })
    );
  }

  // for update  store Owner details
  updateStoreOwner(
    id: number,
    storeOwnerData: StoreOwnerRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.storeOwnerRepo.updateStoreOwner(id, storeOwnerData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete store Owner details
  deleteStoreOwner(id: number): Observable<{ msg: string; typ: number }> {
    return this.storeOwnerRepo.deleteStoreOwner(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
