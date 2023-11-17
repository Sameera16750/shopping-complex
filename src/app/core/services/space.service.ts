import { Injectable } from '@angular/core';
import {SpaceRepository} from "../../data/repositories/space.repository";
import {map, Observable} from "rxjs";
import {FloorResponse} from "../models/floor.model";
import {SpaceResponse} from "../models/room.model";
import {HttpResponseModel} from "../models/http-response.model";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor(private spaceRepo:SpaceRepository) { }

  getAllSpaces():Observable<SpaceResponse[]> {
    return this.spaceRepo.getAllSpaces().pipe(
      map((res: HttpResponseModel) => {
        console.log(res)
        // Assuming res.Data contains the array of floor data
        return res.data.map((item:SpaceResponse) => ({
          id: item.id,
          floorNavigation: item.floorNavigation,
          spaceSize: item.spaceSize,
          spaceNumber:item.spaceNumber,
          status: item.status
        })) as SpaceResponse[];
      })
    );
  }
}
