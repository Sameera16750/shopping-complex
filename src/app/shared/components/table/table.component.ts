//  angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  prime ng
import { TableModule } from 'primeng/table';
//  model
import { TableColumnModel } from '../../../core/models/tableData.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  // data list for table
  @Input() products:any[]=[];
  // schema for table
  @Input() cols!: TableColumnModel[];
  // for change visibility of action buttons
  @Input() isDeleteEnabled:boolean=true;
  @Input() isUpdateEnabled:boolean=true;
  @Input() isViewEnabled:boolean=true;

  // for emmit any action button trigger
  @Output() deleteElementId= new EventEmitter<boolean>()
  @Output() updateElementId= new EventEmitter<boolean>()
  @Output() viewElementId= new EventEmitter<boolean>()
}
