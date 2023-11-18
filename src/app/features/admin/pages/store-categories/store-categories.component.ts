// angular core
import { Component } from '@angular/core';
// angular common
import { CommonModule } from '@angular/common';
// prime ng
import { TagModule } from 'primeng/tag';
// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//  components
import { AddAndUpdateStoreCategoriesComponent } from '../../components/add-and-update-store-categories/add-and-update-store-categories.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumnModel } from '../../../../core/models/tableData.model';
import {
  CategoryTableModel,
  StoreCategoryRequest,
} from '../../../../core/models/category.model';
import { StoreCategoryService } from '../../../../core/services/store-category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-store-categories',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    AddAndUpdateStoreCategoriesComponent,
    TableComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.css'],
})
export class StoreCategoriesComponent {
  // table schema
  categoryTableSchema: TableColumnModel[] = [
    { field: 'categoryName', header: 'Category Name' },
    { field: 'status', header: 'Status' },
    { field: 'totalSpaces', header: 'Total Spaces' },
  ];
  // table data
  categoryTableData: CategoryTableModel[] = [];

  // form category
  frmStoreCategory!: FormGroup;

  // for change form state to save or update
  isFormOnSaveState: boolean = true;

  // for show totals
  totalCount: number = 0;
  totalActiveCount: number = 0;
  totalInactiveCount: number = 0;

  constructor(
    private frmBuilder: FormBuilder,
    private storeCategoryService: StoreCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.initializeForms();
    this.getAllStoreCategories();
  }

  // for get all store categories
  private getAllStoreCategories(): void {
    this.storeCategoryService.getAllStoreCategories().subscribe((res) => {
      this.categoryTableData = res
        .filter((item) => item.status > 0)
        .map((item) => ({
          id: item.id,
          categoryName: item.categoryName,
          status: item.status == 1 ? 'Active' : 'Inactive',
          totalSpaces: 0,
        }));

      this.totalCount = this.categoryTableData.length;
      this.totalActiveCount = this.categoryTableData.filter(
        (item) => item.status === 'Active'
      ).length;
      this.totalInactiveCount = this.categoryTableData.filter(
        (item) => item.status === 'Inactive'
      ).length;
    });
  }

  // initializing form
  private initializeForms(): void {
    this.frmStoreCategory = this.frmBuilder.group({
      id: [0, []],
      categoryName: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });
  }

  //  submit frm data
  submitFrmData(): void {
    this.frmStoreCategory.markAllAsTouched();
    if (this.frmStoreCategory.valid) {
      let categoryData: StoreCategoryRequest = {
        categoryName: this.frmStoreCategory.get('categoryName')?.value,
        status: this.frmStoreCategory.get('isActive')?.value == true ? 1 : 2,
      };
      this.storeCategoryService
        .saveStoreCategory(categoryData)
        .subscribe((res) => {
          this.messageService.add({
            severity: res.typ === 1 ? 'success' : 'error',
            summary: res.typ === 1 ? 'Success' : 'Error',
            detail: res.msg,
          });
          this.frmStoreCategory.reset();
          if (res.typ === 1) {
            window.location.reload();
          }
        });
    }
  }

  getDataById(id: number): void {
    this.isFormOnSaveState = false;
    this.storeCategoryService.getStoreCategoryById(id).subscribe((res) => {
      this.frmStoreCategory.get('id')?.setValue(res.id);
      this.frmStoreCategory.get('categoryName')?.setValue(res.categoryName);
      this.frmStoreCategory.get('isActive')?.setValue(res.status == 1);
    });
  }

  // for update data
  updateCategory() {
    this.frmStoreCategory.markAllAsTouched();
    if (this.frmStoreCategory.valid) {
      this.confirmationService.confirm({
        message: 'Do you want to Update this record?',
        header: 'Update Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          let categoryData: StoreCategoryRequest = {
            categoryName: this.frmStoreCategory.get('categoryName')?.value,
            status:
              this.frmStoreCategory.get('isActive')?.value == true ? 1 : 2,
          };
          this.storeCategoryService
            .updateStoreCategory(
              this.frmStoreCategory.get('id')?.value,
              categoryData
            )
            .subscribe((res) => {
              this.messageService.add({
                severity: res.typ === 1 ? 'success' : 'error',
                summary: res.typ === 1 ? 'Success' : 'Error',
                detail: res.msg,
              });
              this.frmStoreCategory.reset();
              if (res.typ === 1) {
                window.location.reload();
              }
            });
        },
        reject: () => {},
      });
    }
  }
}
