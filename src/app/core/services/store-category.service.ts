// angular core
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpResponseModel} from "../models/http-response.model";
import {StoreCategoryRepository} from "../../data/repositories/store-category.repository";
import {StoreCategoryRequest, StoreCategoryResponse} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class StoreCategoryService {

  constructor(private storeCategoryRepo:StoreCategoryRepository) { }

  // get all store categories
  getAllStoreCategories(): Observable<StoreCategoryResponse[]> {
    return this.storeCategoryRepo.getAllStoreCategory().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          categoryName: item.categoryName,
          status:item.status
        })) as StoreCategoryResponse[];
      })
    );
  }

  //  for save store category
  saveStoreCategory(storeCategoryData: StoreCategoryRequest): Observable<{ msg: string; typ: number }> {
    return this.storeCategoryRepo.saveStoreCategory(storeCategoryData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get store category by id
  getStoreCategoryById(id: number): Observable<StoreCategoryResponse> {
    return this.storeCategoryRepo.getStoreCategoryByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id: responseData.id,
          status: responseData.status,
          categoryName: responseData.categoryName,
        } as StoreCategoryResponse;
      })
    );
  }

  // for update  store category details
  updateStoreCategory(
    id: number,
    storeCategoryData: StoreCategoryRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.storeCategoryRepo.updateStoreCategory(id, storeCategoryData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete store category details
  deleteStoreCategory(id: number): Observable<{ msg: string; typ: number }> {
    return this.storeCategoryRepo.deleteStoreCategory(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
