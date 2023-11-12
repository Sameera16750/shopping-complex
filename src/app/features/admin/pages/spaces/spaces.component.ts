//  angular core
import { Component } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  prime ng
import { TagModule } from 'primeng/tag';
//  components
import { TableComponent } from '../../../../shared/components/table/table.component';
//  models
import { tableColumn } from '../../../../core/models/tableData.model';
import {floorTableData} from "../../../../core/models/floor.model";
import {roomTableData} from "../../../../core/models/room.model";

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [CommonModule, TagModule, TableComponent],
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css'],
})
export class SpacesComponent {

  floorSchema: tableColumn[] = [
    { field: 'floorNo', header: 'Floor' },
    { field: 'totalRoomCount', header: 'Spaces' },
    { field: 'availableRoomCount', header: 'Available Spaces' },
    { field: 'filledRoomCount', header: 'Rented Spaces' },
  ];
  floorData:floorTableData[]=[
    {
      id:1,
      floorNo:'Gound',
      availableRoomCount:10,
      filledRoomCount:5,
      totalRoomCount:15
    },
    {
      id:2,
      floorNo:'Gound',
      availableRoomCount:10,
      filledRoomCount:5,
      totalRoomCount:15
    },
    {
      id:3,
      floorNo:'Gound',
      availableRoomCount:10,
      filledRoomCount:5,
      totalRoomCount:15
    },
    {
      id:4,
      floorNo:'Gound',
      availableRoomCount:10,
      filledRoomCount:5,
      totalRoomCount:15
    },
    {
      id:5,
      floorNo:'Gound',
      availableRoomCount:10,
      filledRoomCount:5,
      totalRoomCount:15
    },

  ]
  roomSchema: tableColumn[] = [
    { field: 'roomNo', header: 'Space' },
    { field: 'floorNo', header: 'Floor' },
    { field: 'availability', header: 'Availability' },
  ];
  roomData:roomTableData[]=[
    {
      id:1,
      roomNo:'AB',
      availability:'available',
      floorNo:'Ground'
    },
    {
      id:2,
      roomNo:'AB',
      availability:'available',
      floorNo:'1'
    },
    {
      id:3,
      roomNo:'AB',
      availability:'available',
      floorNo:'1'
    },

  ]
}
