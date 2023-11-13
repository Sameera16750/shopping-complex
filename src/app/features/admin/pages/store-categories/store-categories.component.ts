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
import { tableColumn } from '../../../../core/models/tableData.model';
import { categoryTable } from '../../../../core/models/category.model';

@Component({
  selector: 'app-store-categories',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    AddAndUpdateStoreCategoriesComponent,
    TableComponent,
  ],
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.css'],
})
export class StoreCategoriesComponent {
  // table schema
  categoryTableSchema: tableColumn[] = [
    { field: 'categoryName', header: 'Category Name' },
    { field: 'status', header: 'Status' },
    { field: 'totalSpaces', header: 'Total Spaces' },
  ];
  // table data
  categoryTableData: categoryTable[] = [
    { id: 1, categoryName: 'beauty', status: 'Active', totalSpaces: 10 },
    { id: 2, categoryName: 'beauty', status: 'Active', totalSpaces: 10 },
    { id: 3, categoryName: 'beauty', status: 'Active', totalSpaces: 10 },
    { id: 4, categoryName: 'beauty', status: 'Active', totalSpaces: 10 },
    { id: 4, categoryName: 'beauty', status: 'Active', totalSpaces: 10 },
  ];

  // form category
  frmStoreCategory!: FormGroup;

  constructor(private frmBuilder: FormBuilder) {
    this.initializeForms();
  }

  // initializing form
  private initializeForms(): void {
    this.frmStoreCategory = this.frmBuilder.group({
      categoryName: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });
  }

  //  submit frm data
  submitFrmData(): void {
    this.frmStoreCategory.markAllAsTouched();
    console.log(this.frmStoreCategory.getRawValue());
    if (this.frmStoreCategory.valid) {
      //
    }
  }
}
