export type FloorTableDataModel ={
  id:number,
  floorNo:string,
  totalRoomCount:number,
  filledRoomCount:number,
  availableRoomCount:number
}

export type FloorRequest={
  floorNumber: string,
  totalSpaces: number,
  status: number
}

export type FloorResponse={
  id:number,
  floorNumber: string,
  totalSpaces: number,
  status: number
}
