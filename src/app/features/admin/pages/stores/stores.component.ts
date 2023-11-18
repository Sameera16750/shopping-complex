// angular core
import { Component, OnInit } from '@angular/core';
// angular common
import { CommonModule, DatePipe } from '@angular/common';
// angular forms
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// prime ng
import { TagModule } from 'primeng/tag';
// components
import { AddAndUpdateStoreComponent } from '../../components/add-and-update-store/add-and-update-store.component';
import {
  dropDownValues,
  InputDropdownComponent,
} from '../../../../shared/forms/input-dropdown/input-dropdown.component';
import { InputTextComponent } from '../../../../shared/forms/input-text/input-text.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
// models
import { TableColumnModel } from '../../../../core/models/tableData.model';
import {
  PendingPaymentTableDataModel,
  StoreRequest,
  StoreResponse,
  StoreTableDataModel,
} from '../../../../core/models/store.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StoreService } from '../../../../core/services/store.service';
import { StoreOwnerService } from '../../../../core/services/store-owner.service';
import {
  StoreOwnerResponse,
} from '../../../../core/models/store-owner.model';
import { StoreCategoryResponse } from '../../../../core/models/category.model';
import { SpaceService } from '../../../../core/services/space.service';
import { StoreCategoryService } from '../../../../core/services/store-category.service';
import { SpaceResponse } from '../../../../core/models/room.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    CommonModule,
    AddAndUpdateStoreComponent,
    InputTextComponent,
    ReactiveFormsModule,
    TableComponent,
    TagModule,
    InputDropdownComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService, DatePipe],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  // for visibility of pending payment tap
  isPendingPaymentShow: boolean = false;
  // for add and update store details
  frmStores!: FormGroup;
  // form for search
  frmSearchPendingPayments!: FormGroup;
  frmSearchStore!: FormGroup;

  storeList!: StoreResponse[];
  storeOwnerList!: StoreOwnerResponse[];
  storeCategoryList!: StoreCategoryResponse[];
  spaceList!: SpaceResponse[];

  // data for available spaces dropdown
  availableSpacesList!: dropDownValues[];

  // data for owner dropdown
  ownerList!: dropDownValues[];

  // data for owner dropdown
  category!: dropDownValues[];

  // for change form state to save or update
  isFormInSaveState: boolean = true;

  // table schema for pending payment
  pendingPaymentTableSchema: TableColumnModel[] = [
    { field: 'shopName', header: 'Shop Name' },
    { field: 'year', header: 'Year' },
    { field: 'month', header: 'Month' },
    { field: 'totalPayment', header: 'Total Payment' },
  ];
  // table data for pending payments
  pendingPaymentTableData: PendingPaymentTableDataModel[] = [
    {
      id: 1,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 2,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 3,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 4,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
    {
      id: 5,
      shopName: 'Thilakawardana',
      year: '2023',
      month: 'January',
      totalPayment: '20000',
    },
  ];
  // table schema for store
  storeTableSchema: TableColumnModel[] = [
    { field: 'spaceNumber', header: 'Space Number' },
    { field: 'shopName', header: 'Shop Name' },
    { field: 'shopCategory', header: 'Shop Category' },
    { field: 'ownerName', header: 'Owner Name' },
    { field: 'rentalTimeDuration', header: 'Rental Time Duration' },
  ];
  // table data for pending payments
  storeTableData: StoreTableDataModel[] = [];

  constructor(
    private frmBuilder: FormBuilder,
    private storeService: StoreService,
    private storeOwnerService: StoreOwnerService,
    private spaceService: SpaceService,
    private storeCategoryService: StoreCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) {
    this.initializeForms();
    this.getAllStores();
    this.getAllStoreOwners();
    this.getStoreCategoriesByStatus();
    this.getSpacesByStatus();
  }

  ngOnInit() {
    this.searchPendingPayments();
    this.searchSearchStore();
  }

  // for get all Store
  private getAllStores(): void {
    this.storeService.getAllStores().subscribe((res) => {
      this.storeList = res;
      this.storeTableData = this.storeList
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          ownerName: `${item.storeOwnerNavigation.firstName} ${item.storeOwnerNavigation.lastName}`,
          rentalTimeDuration: `${item.rentalDate} To ${item.rentalEndDate}`,
          shopCategory: item.storeCategoryNavigation.categoryName,
          shopName: item.storeName,
          spaceNumber: item.spaceNavigation.spaceNumber,
        }));
    });
  }

  // for get owners by status
  private getAllStoreOwners(): void {
    this.storeOwnerService.getStoreOwnersByStatus(1).subscribe((res) => {
      this.storeOwnerList = res;
      this.ownerList = this.storeOwnerList
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        }));
    });
  }

  // get active store categories
  private getStoreCategoriesByStatus(): void {
    this.storeCategoryService.getStoreCategoriesByStatus(1).subscribe((res) => {
      this.storeCategoryList = res;
      this.category = this.storeCategoryList.map((item) => ({
        id: item.id,
        name: item.categoryName,
      }));
    });
  }

  // for get all spaces by status
  private getSpacesByStatus() {
    this.spaceService.getSpacesByStatus(1).subscribe((res) => {
      this.spaceList = res;
      this.availableSpacesList = this.spaceList.map((item) => ({
        id: item.id,
        name: item.spaceNumber,
      }));
    });
  }

  // initialize forms
  private initializeForms(): void {
    this.frmStores = this.frmBuilder.group({
      id: [0, []],
      storeName: ['', [Validators.required]],
      storeOwner: [{ id: 0, name: '' }, [Validators.required]],
      storeCategory: [{ id: 0, name: '' }, [Validators.required]],
      rentalTimeDuration: [[], [Validators.required]],
      monthlyPaymentValue: ['', [Validators.required]],
      spaceNumber: [{ id: 0, name: '' }, [Validators.required]],
      keyMoney: ['', [Validators.required]],
    });

    this.frmSearchPendingPayments = this.frmBuilder.group({
      shopName: ['', []],
    });

    this.frmSearchStore = this.frmBuilder.group({
      shopName: ['', []],
      shopCategory: ['', []],
      shopOwnerName: ['', []],
    });
  }

  // for access search stores form controls
  get frmSearchStoreControls() {
    return this.frmSearchStore.controls;
  }

  // for access search payment form controls
  get frmSearchPaymentControls() {
    return this.frmSearchPendingPayments.controls;
  }

  //  for save store
  saveStore() {
    this.frmStores.markAllAsTouched();
    if (this.frmStores.valid) {
      let storeData: StoreRequest = {
        storeName: this.frmStores.get('storeName')?.value,
        storeCategory: this.frmStores.get('storeCategory')?.value.id,
        storeOwner: this.frmStores.get('storeOwner')?.value.id,
        space: this.frmStores.get('spaceNumber')?.value.id,
        keyMoney: this.frmStores.get('keyMoney')?.value,
        monthlyCharge: this.frmStores.get('monthlyPaymentValue')?.value,
        rentalDate: this.datePipe
          .transform(
            this.frmStores.get('rentalTimeDuration')?.value[0],
            'MM/dd/YYYY'
          )
          ?.toString(),
        rentalEndDate: this.datePipe
          .transform(
            this.frmStores.get('rentalTimeDuration')?.value[1],
            'MM/dd/YYYY'
          )
          ?.toString(),
        status: 1,
      };
      this.storeService.saveStore(storeData).subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmStores.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
    }
  }

  // for get data by store id
  getDataById(id: number) {
    this.isFormInSaveState = false;
    this.storeService.getStoreById(id).subscribe((res) => {
      this.frmStores.get('id')?.setValue(res.id);
      this.frmStores.get('storeName')?.setValue(res.storeName);
      this.frmStores.get('storeCategory')?.setValue({
        id: res.storeCategoryNavigation.id,
        name: res.storeCategoryNavigation.categoryName,
      });
      this.frmStores.get('storeOwner')?.setValue({
        id: res.storeOwnerNavigation.id,
        name: `${res.storeOwnerNavigation.firstName} ${res.storeOwnerNavigation.lastName}`,
      });
      this.frmStores.get('spaceNumber')?.setValue({
        id: res.spaceNavigation.id,
        name: res.spaceNavigation.spaceNumber,
      });
      this.frmStores.get('keyMoney')?.setValue(res.keyMoney);
      this.frmStores.get('monthlyPaymentValue')?.setValue(res.monthlyCharge);
      this.frmStores
        .get('rentalTimeDuration')
        ?.setValue([
          new Date(res.rentalDate ?? '2022/10/11'),
          new Date(res.rentalEndDate ?? '2022/10/11'),
        ]);
    });
  }

  // for confirm update
  confirmUpdate() {
    this.frmStores.markAllAsTouched();
    if (this.frmStores.valid) {
      this.confirmationService.confirm({
        message: 'Do you want to Update this record?',
        header: 'Update Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.updateStore();
        },
        reject: () => {},
      });
    }
  }

  // for update Store
  updateStore(): void {
    let storeData: StoreRequest = {
      storeName: this.frmStores.get('storeName')?.value,
      storeCategory: this.frmStores.get('storeCategory')?.value.id,
      storeOwner: this.frmStores.get('storeOwner')?.value.id,
      space: this.frmStores.get('spaceNumber')?.value.id,
      keyMoney: this.frmStores.get('keyMoney')?.value,
      monthlyCharge: this.frmStores.get('monthlyPaymentValue')?.value,
      rentalDate: this.datePipe
        .transform(
          this.frmStores.get('rentalTimeDuration')?.value[0],
          'MM/dd/YYYY'
        )
        ?.toString(),
      rentalEndDate: this.datePipe
        .transform(
          this.frmStores.get('rentalTimeDuration')?.value[1],
          'MM/dd/YYYY'
        )
        ?.toString(),
      status: 1,
    };

    this.storeService
      .updateStore(this.frmStores.get('id')?.value, storeData)
      .subscribe((res) => {
        this.messageService.add({
          severity: res.typ === 1 ? 'success' : 'error',
          summary: res.typ === 1 ? 'Success' : 'Error',
          detail: res.msg,
        });
        this.frmStores.reset();
        if (res.typ === 1) {
          window.location.reload();
        }
      });
  }

  // for delete
  deleteStore(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this record?',
      header: 'Update Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.storeService.deleteStore(id).subscribe((res) => {
          this.messageService.add({
            severity: res.typ === 1 ? 'success' : 'error',
            summary: res.typ === 1 ? 'Success' : 'Error',
            detail: res.msg,
          });
          this.frmStores.reset();
          if (res.typ === 1) {
            window.location.reload();
          }
        });
      },
      reject: () => {},
    });
  }

  //for search shop
  searchSearchStore(): void {
    this.frmSearchStore.get('shopName')?.valueChanges.subscribe((newValue) => {
      this.storeTableData = this.storeList
        .filter(
          (item) =>
            item.storeName.toLowerCase().includes(newValue.toLowerCase()) &&
            item.status === 1
        )
        .map((item) => ({
          id: item.id,
          ownerName: `${item.storeOwnerNavigation.firstName} ${item.storeOwnerNavigation.lastName}`,
          rentalTimeDuration: `${item.rentalDate} To ${item.rentalEndDate}`,
          shopName: item.storeName,
          spaceNumber: item.spaceNavigation.spaceNumber,
          shopCategory: item.storeCategoryNavigation.categoryName,
        }));
    });
  }

  //for search pending payments
  searchPendingPayments(): void {
    this.frmSearchPendingPayments
      .get('shopName')
      ?.valueChanges.subscribe((newValue) => {
        console.log(newValue);
      });
  }
}
