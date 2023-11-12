//  angular core
import { Component } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// angular forms
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//  prime ng
import { TagModule } from 'primeng/tag';
//  components
import { TableComponent } from '../../../../shared/components/table/table.component';
import {DialogModule} from "primeng/dialog";
import {AddAndUpdateFloorComponent} from "../../components/add-and-update-floor/add-and-update-floor.component";
import {AddAndUpdateSpaceComponent} from "../../components/add-and-update-space/add-and-update-space.component";
import {dropDownValues} from "../../../../shared/forms/input-dropdown/input-dropdown.component";
//  models
import { tableColumn } from '../../../../core/models/tableData.model';
import {floorTableData} from "../../../../core/models/floor.model";
import {roomTableData} from "../../../../core/models/room.model";


@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableComponent,
    DialogModule,
    AddAndUpdateFloorComponent,
    AddAndUpdateSpaceComponent,
  ],
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css'],
})
export class SpacesComponent {

  // for change popup header
  popupHeader = '';
  // for change visibility of popup
  visiblePopup: boolean = false;
  // for space component form
  frmAddUpdateSpaceDetails!: FormGroup;
  // for floor component form
  frmAddUpdateFloorDetails!: FormGroup;

  // schema for floor table
  floorSchema: tableColumn[] = [
    { field: 'floorNo', header: 'Floor' },
    { field: 'totalRoomCount', header: 'Spaces' },
    { field: 'availableRoomCount', header: 'Available Spaces' },
    { field: 'filledRoomCount', header: 'Rented Spaces' },
  ];
  // data for floor table
  floorData: floorTableData[] = [
    {
      id: 1,
      floorNo: 'Gound',
      availableRoomCount: 10,
      filledRoomCount: 5,
      totalRoomCount: 15,
    },
    {
      id: 2,
      floorNo: 'Gound',
      availableRoomCount: 10,
      filledRoomCount: 5,
      totalRoomCount: 15,
    },
    {
      id: 3,
      floorNo: 'Gound',
      availableRoomCount: 10,
      filledRoomCount: 5,
      totalRoomCount: 15,
    },
    {
      id: 4,
      floorNo: 'Gound',
      availableRoomCount: 10,
      filledRoomCount: 5,
      totalRoomCount: 15,
    },
    {
      id: 5,
      floorNo: 'Gound',
      availableRoomCount: 10,
      filledRoomCount: 5,
      totalRoomCount: 15,
    },
  ];
  // schema for spaces table
  roomSchema: tableColumn[] = [
    { field: 'roomNo', header: 'Space' },
    { field: 'floorNo', header: 'Floor' },
    { field: 'availability', header: 'Availability' },
  ];
  // data for spaces table
  roomData: roomTableData[] = [
    {
      id: 1,
      roomNo: 'AB',
      availability: 'available',
      floorNo: 'Ground',
    },
    {
      id: 2,
      roomNo: 'AB',
      availability: 'available',
      floorNo: '1',
    },
    {
      id: 3,
      roomNo: 'AB',
      availability: 'available',
      floorNo: '1',
    },
  ];
  // data for floors dropdown
  floorList:dropDownValues[]=[
      { name: 'ground', id:1 },
      { name: 'Floor 1', id:2 },
      { name: 'Floor 2', id:3 },
      { name: 'Floor 3', id:4 },
      { name: 'Floor 5', id:5 },
  ]

  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  // for initialize form group
  private initializeForms(): void {
    this.frmAddUpdateSpaceDetails = this.frmBuilder.group({
      spaceNumber: ['', [Validators.required]],
      floorNumber: ['', [Validators.required]],
      spaceSize: ['', [Validators.required]],
    });

    this.frmAddUpdateFloorDetails = this.frmBuilder.group({
      floorNumber: ['', [Validators.required]],
      spaceCount: ['', [Validators.required]],
    });
  }

  // for submit space data
  submitSpaceData():void{
    this.frmAddUpdateSpaceDetails.markAllAsTouched();
    console.log(this.frmAddUpdateSpaceDetails.getRawValue())
  }

  // for submit floor data
  submitFloorData():void{
    this.frmAddUpdateFloorDetails.markAllAsTouched();
    console.log(this.frmAddUpdateFloorDetails.getRawValue())
  }
}
