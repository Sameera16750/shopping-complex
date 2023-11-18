//  angular core
import { Component, OnInit } from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//  prime ng
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
  FloorTableDataModel,
} from '../../../../core/models/floor.model';
// services
import {
  RoomTableDataModel,
  SpaceRequest,
} from '../../../../core/models/room.model';
import { FloorService } from '../../../../core/services/floor.service';
import { SpaceService } from '../../../../core/services/space.service';

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
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
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
    private confirmationService: ConfirmationService,
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
      floorNumber: [{ id: 0, number: '' }, [Validators.required]],
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
        .map((item) => {
          let availability: string;
          switch (item.status) {
            case 1:
              availability = 'Available';
              break;
            case 2:
              availability = 'Filled';
              break;
            default:
              availability = 'Deleted';
              break;
          }
          return {
            id: item.id,
            floorNo: item.floorNavigation.floorNumber,
            floorId: item.floorNavigation.id,
            roomNo: item.spaceNumber,
            availability: availability,
          };
        });
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
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // for open update floor data popup
  openUpdateFloorPopup(id: number): void {
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
          if (res.typ === 1) {
            window.location.reload();
          }
        });
    }
  }

  // delete confirmation popup for floor details
  confirmFloorDataDeletion(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteFloorData(id);
      },
      reject: () => {},
    });
  }

  // for delete floor data
  deleteFloorData(id: number): void {
    this.floorService.deleteFloor(id).subscribe((res) => {
      this.messageService.add({
        severity: res.typ === 1 ? 'success' : 'error',
        summary: res.typ === 1 ? 'Success' : 'Error',
        detail: res.msg,
      });
      if (res.typ === 1) {
        window.location.reload();
      }
    });
  }

  // for submit space data
  submitSpaceData(): void {
    this.frmAddUpdateSpaceDetails.markAllAsTouched();
    if (this.frmAddUpdateSpaceDetails.valid) {
      let data: SpaceRequest = {
        spaceNumber: this.frmAddUpdateSpaceDetails.get('spaceNumber')?.value,
        floor: this.frmAddUpdateSpaceDetails.get('floorNumber')?.value.id,
        spaceSize: this.frmAddUpdateSpaceDetails.get('spaceSize')?.value,
        status: 1,
      };

      this.spaceService.saveFloor(data).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmAddUpdateFloorDetails.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // for open update floor data popup
  openUpdateSpacePopup(id: number): void {
    this.isFloorPopup = false;
    this.spaceDataSubmitType = 'update';
    this.spaceService.getSpaceById(id).subscribe((res) => {
      console.log(res)
      this.frmAddUpdateSpaceDetails.get('id')?.setValue(res.id);
      this.frmAddUpdateSpaceDetails
        .get('spaceNumber')
        ?.setValue(res.spaceNumber);
      this.frmAddUpdateSpaceDetails
        .get('spaceSize')
        ?.setValue(res.spaceSize);
      this.frmAddUpdateSpaceDetails
        .get('floorNumber')
        ?.setValue({id:res.floorNavigation.id,number:res.floorNavigation.floorNumber});
      this.visiblePopup = true;

      console.log(this.frmAddUpdateSpaceDetails.getRawValue());
    });
  }

  updateSpaceData(): void {
    this.frmAddUpdateSpaceDetails.markAllAsTouched();
    if (this.frmAddUpdateSpaceDetails.valid) {
      let data: SpaceRequest = {
        spaceNumber: this.frmAddUpdateSpaceDetails.get('spaceNumber')?.value,
        floor: this.frmAddUpdateSpaceDetails.get('floorNumber')?.value.id,
        spaceSize: this.frmAddUpdateSpaceDetails.get('spaceSize')?.value,
        status: 1,
      };
      this.spaceService
        .updateSpace(this.frmAddUpdateSpaceDetails.get('id')?.value, data)
        .subscribe((res) => {
          this.messageService.add({
            severity: res.typ === 1 ? 'success' : 'error',
            summary: res.typ === 1 ? 'Success' : 'Error',
            detail: res.msg,
          });
          if (res.typ === 1) {
            window.location.reload();
          }
        });
    }
  }
}
