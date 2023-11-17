import { Injectable } from '@angular/core';
import { FloorRepository } from '../../data/repositories/floor.repository';
import { map, Observable } from 'rxjs';
import { HttpResponseModel } from '../models/http-response.model';
import { FloorRequest, FloorResponse } from '../models/floor.model';
import { data } from 'autoprefixer';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private floorRepo: FloorRepository) {}

  // get all Floors
  getAllFloors(): Observable<FloorResponse[]> {
    return this.floorRepo.getAllFloors().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          floorNumber: item.floorNumber,
          id: item.id,
          status: item.status,
          totalSpaces: item.totalSpaces,
        })) as FloorResponse[];
      })
    );
  }

  //  for save floor
  saveFloor(floorData: FloorRequest): Observable<{ msg: string; typ: number }> {
    return this.floorRepo.saveFloor(floorData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get floor by id
  getFloorById(id: number): Observable<FloorResponse> {
    return this.floorRepo.getFloorByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          floorNumber: responseData.floorNumber,
          id: responseData.id,
          status: responseData.status,
          totalSpaces: responseData.totalSpaces,
        } as FloorResponse;
      })
    );
  }

  // for update floor details
  updateFloor(
    id: number,
    floorData: FloorRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.floorRepo.updateFloor(id, floorData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete floor details
  deleteFloor(id: number): Observable<{ msg: string; typ: number }> {
    return this.floorRepo.deleteFloor(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
