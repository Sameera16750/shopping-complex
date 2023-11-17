//  angular core
import { Component, OnInit } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//  prime ng
import { TagModule } from 'primeng/tag';
//  components
import { TableComponent } from '../../../../shared/components/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { AddAndUpdateFloorComponent } from '../../components/add-and-update-floor/add-and-update-floor.component';
import { AddAndUpdateSpaceComponent } from '../../components/add-and-update-space/add-and-update-space.component';
import { dropDownValues } from '../../../../shared/forms/input-dropdown/input-dropdown.component';
//  models
import { TableColumnModel } from '../../../../core/models/tableData.model';
import {
  FloorRequest,
  FloorResponse,
  FloorTableDataModel,
} from '../../../../core/models/floor.model';
import { RoomTableDataModel } from '../../../../core/models/room.model';
import { FloorService } from '../../../../core/services/floor.service';
import { SpaceService } from '../../../../core/services/space.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css'],
})
export class SpacesComponent implements OnInit {
  // for change popup header
  isFloorPopup = false;
  floorDataSubmitType: string = 'save';
  spaceDataSubmitType: string = 'save';
  // for change visibility of popup
  visiblePopup: boolean = false;
  // for space component form
  frmAddUpdateSpaceDetails!: FormGroup;
  // for floor component form
  frmAddUpdateFloorDetails!: FormGroup;

  // schema for floor table
  floorSchema: TableColumnModel[] = [
    { field: 'floorNo', header: 'Floor' },
    { field: 'totalRoomCount', header: 'Spaces' },
    { field: 'availableRoomCount', header: 'Available Spaces' },
    { field: 'filledRoomCount', header: 'Rented Spaces' },
  ];
  // data for floor table
  floorData: FloorTableDataModel[] = [];
  // schema for spaces table
  roomSchema: TableColumnModel[] = [
    { field: 'roomNo', header: 'Space' },
    { field: 'floorNo', header: 'Floor' },
    { field: 'availability', header: 'Availability' },
  ];
  // data for spaces table
  roomData: RoomTableDataModel[] = [];
  // data for floors dropdown
  floorList: dropDownValues[] = [];

  constructor(
    private frmBuilder: FormBuilder,
    private messageService: MessageService,
    private floorService: FloorService,
    private spaceService: SpaceService
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.getAllFlorData();
    this.getAllSpaces();
  }

  // for initialize form group
  private initializeForms(): void {
    this.frmAddUpdateSpaceDetails = this.frmBuilder.group({
      id: [0, []],
      spaceNumber: ['', [Validators.required]],
      floorNumber: ['', [Validators.required]],
      spaceSize: ['', [Validators.required]],
    });

    this.frmAddUpdateFloorDetails = this.frmBuilder.group({
      id: [0, []],
      floorNumber: ['', [Validators.required]],
      spaceCount: ['', [Validators.required]],
    });
  }

  // for get all floor data and set to related lists
  private getAllFlorData() {
    this.floorService.getAllFloors().subscribe((res) => {
      this.floorData = res
        .filter((item) => item.status != 0)
        .map((item) => ({
          id: item.id,
          floorNo: item.floorNumber,
          totalRoomCount: item.totalSpaces,
          availableRoomCount: item.totalSpaces,
          filledRoomCount: 0,
        }));

      this.floorList = this.floorData.map((item) => ({
        id: item.id,
        name: item.floorNo,
      }));
    });
  }

  // for get all spaces and set to related lists
  private getAllSpaces() {
    this.spaceService.getAllSpaces().subscribe((res) => {
      console.log(res);
      this.roomData = res
        .filter((item) => item.status != 0)
        .map((item) => ({
          id: item.id,
          floorNo: item.floorNavigation.floorNumber,
          floorId: item.floorNavigation.id,
          roomNo: item.spaceNumber,
          availability:
            item.status === 1
              ? 'Available'
              : item.status === 2
              ? 'Filled'
              : 'Deleted',
        }));
    });
  }

  // for submit floor data
  submitFloorData(): void {
    this.frmAddUpdateFloorDetails.markAllAsTouched();
    if (this.frmAddUpdateFloorDetails.valid) {
      let floorData: FloorRequest = {
        floorNumber: this.frmAddUpdateFloorDetails.get('floorNumber')?.value,
        status: 1,
        totalSpaces: this.frmAddUpdateFloorDetails.get('spaceCount')?.value,
      };
      this.floorService.saveFloor(floorData).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmAddUpdateFloorDetails.reset();
        window.location.reload();
      });
    }
  }

  // for open update floor data popup
  openUpdateFloorPopup(id: number): void {
    // console.log(floorID);
    this.isFloorPopup = true;
    this.floorDataSubmitType = 'update';
    this.floorService.getFloorById(id).subscribe((res) => {
      this.frmAddUpdateFloorDetails.get('id')?.setValue(res.id);
      this.frmAddUpdateFloorDetails
        .get('floorNumber')
        ?.setValue(res.floorNumber);
      this.frmAddUpdateFloorDetails
        .get('spaceCount')
        ?.setValue(res.totalSpaces);
      this.visiblePopup = true;
    });
  }

  updateFloorData(): void {
    this.frmAddUpdateFloorDetails.markAllAsTouched();
    if (this.frmAddUpdateFloorDetails.valid) {
      let floorData: FloorRequest = {
        floorNumber: this.frmAddUpdateFloorDetails.get('floorNumber')?.value,
        status: 1,
        totalSpaces: this.frmAddUpdateFloorDetails.get('spaceCount')?.value,
      };
      this.floorService
        .updateFloor(this.frmAddUpdateFloorDetails.get('id')?.value, floorData)
        .subscribe((res) => {
          this.messageService.add({
            severity: res.typ === 1 ? 'success' : 'error',
            summary: res.typ === 1 ? 'Success' : 'Error',
            detail: res.msg,
          });
          if(res.typ===1){
            window.location.reload();
          }
        });
    }
  }

  // for delete floor data
  deleteFloorData(id:number):void{

    this.floorService.deleteFloor(id).subscribe(res=>{
      this.messageService.add({
        severity: res.typ === 1 ? 'success' : 'error',
        summary: res.typ === 1 ? 'Success' : 'Error',
        detail: res.msg,
      });
      if(res.typ===1){
        window.location.reload();
      }
    });
  }

  // for submit space data
  submitSpaceData(): void {
    this.frmAddUpdateSpaceDetails.markAllAsTouched();
    console.log(this.frmAddUpdateSpaceDetails.getRawValue());
  }
}
