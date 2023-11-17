import {FloorResponse} from "./floor.model";

export type RoomTableDataModel ={
  id:number,
  roomNo:string,
  floorId:number,
  floorNo:string,
  availability:string,
}

export type SpaceRequest={
   floor:number
   spaceNumber:string;
   spaceSize:string
   status:number
}

export type SpaceResponse=Omit<SpaceRequest,"floor"> & {
  id:number;
  floorNavigation:FloorResponse;
}
