import { Injectable } from '@angular/core';
import { SpaceRepository } from '../../data/repositories/space.repository';
import { map, Observable } from 'rxjs';
import { SpaceRequest, SpaceResponse } from '../models/room.model';
import { HttpResponseModel } from '../models/http-response.model';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(private spaceRepo: SpaceRepository) {}

  getAllSpaces(): Observable<SpaceResponse[]> {
    return this.spaceRepo.getAllSpaces().pipe(
      map((res: HttpResponseModel) => {
        console.log(res);
        // Assuming res.Data contains the array of floor data
        return res.data.map((item: SpaceResponse) => ({
          id: item.id,
          floorNavigation: item.floorNavigation,
          spaceSize: item.spaceSize,
          spaceNumber: item.spaceNumber,
          status: item.status,
        })) as SpaceResponse[];
      })
    );
  }

  //  for save space
  saveFloor(spaceData: SpaceRequest): Observable<{ msg: string; typ: number }> {
    return this.spaceRepo.saveSpace(spaceData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // get space by id
  getSpaceById(id: number): Observable<SpaceResponse> {
    return this.spaceRepo.getSpaceById(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id: responseData.id,
          spaceNumber: responseData.spaceNumber,
          floorNavigation: responseData.floorNavigation,
          spaceSize: responseData.spaceSize,
          status: responseData.status,
        } as SpaceResponse;
      })
    );
  }

  // for update floor details
  updateSpace(
    id: number,
    spaceData: SpaceRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.spaceRepo.updateSpace(id, spaceData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
