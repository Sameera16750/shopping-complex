import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpResponseModel} from "../models/http-response.model";
import {StoreRepository} from "../../data/repositories/store.repository";
import {StoreRequest, StoreResponse} from "../models/store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private storeRepo:StoreRepository) { }

  // get all store categories
  getAllStores(): Observable<StoreResponse[]> {
    return this.storeRepo.getAllStore().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          storeName: item.storeName,
          storeOwnerNavigation: item.storeOwnerNavigation,
          storeCategoryNavigation: item.storeCategoryNavigation,
          spaceNavigation: item.spaceNavigation,
          monthlyCharge: item.monthlyCharge,
          keyMoney: item.keyMoney,
          rentalDate: item.rentalDate,
          rentalEndDate: item.rentalEndDate,
          status:item.status
        })) as StoreResponse[];
      })
    );
  }

  //  for save store
  saveStore(storeData: StoreRequest): Observable<{ msg: string; typ: number }> {
    return this.storeRepo.saveStore(storeData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get store by id
  getStoreById(id: number): Observable<StoreResponse> {
    return this.storeRepo.getStoreByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id:responseData.id,
          storeName:responseData.storeName,
          storeOwnerNavigation:responseData.storeOwnerNavigation,
          storeCategoryNavigation:responseData.storeCategoryNavigation,
          spaceNavigation:responseData.spaceNavigation,
          monthlyCharge:responseData.monthlyCharge,
          keyMoney:responseData.keyMoney,
          rentalDate:responseData.rentalDate,
          rentalEndDate:responseData.rentalEndDate,
          status:responseData.status
        } as StoreResponse;
      })
    );
  }

  // for update  store details
  updateStore(
    id: number,
    storeData: StoreRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.storeRepo.updateStore(id, storeData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete store details
  deleteStore(id: number): Observable<{ msg: string; typ: number }> {
    return this.storeRepo.deleteStore(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
