//  angular core
import {Component, EventEmitter, Input, Output} from '@angular/core';
//  angular common
import { CommonModule } from '@angular/common';
//  prime ng
import { TableModule } from 'primeng/table';
//  model
import { tableColumn } from '../../../core/models/tableData.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() products:any[]=[];
  @Input() cols!: tableColumn[];
  @Input() isDeleteEnabled:boolean=true;
  @Input() isUpdateEnabled:boolean=true;
  @Input() isViewEnabled:boolean=true;

  @Output() deleteElementId= new EventEmitter<boolean>()
  @Output() updateElementId= new EventEmitter<boolean>()
  @Output() viewElementId= new EventEmitter<boolean>()
}
