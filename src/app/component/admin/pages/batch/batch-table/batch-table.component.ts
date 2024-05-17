import { CommonModule } from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BatchTableService } from 'src/app/component/shared/services/batch-table.service';
import { BatchTable } from 'src/app/component/shared/model/batch-table.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProgramDialogComponent } from 'src/app/component/shared/delete-program-dialog/delete-program-dialog.component';
import { MatIconButton } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-batch-table',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule
    
  ],
  templateUrl: './batch-table.component.html',
  styleUrls: ['./batch-table.component.scss']
})
export class BatchTableComponent {
  dataSource = new MatTableDataSource([{}]);
  editBatchReactiveForm!: FormGroup;
  addProgramReactiveForm!: FormGroup;
  protected editRowId : number | null = null;
  addProgramButtonClicked: boolean = false;

  displayedColumns: string[] = [
    'actions',
    'batchCode',
    'batchName',
    'batchStartDate',
  ];

  constructor(private batchTableService:BatchTableService,private dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;
  @Input() filterValue:any;

  ngOnChanges(change: SimpleChanges): void {
    if(change['filterValue'])
      {
        this.applyFilter(this.filterValue)
      }
}
  
  applyFilter(filterValue:string){
    this.dataSource.filter=this.filterValue.trim().toLowerCase()    
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getBatchesList();
  }

  getBatchesList(){
    console.log(this.batchTableService.getBatches());
    this.batchTableService.getBatches().subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      },
      error: () => console.log('Error while Fetching program')

    })


    this.editBatchReactiveForm = new FormGroup({
      batchCode: new FormControl(null, Validators.required),
      batchName: new FormControl(null, Validators.required),
      batchStartDate: new FormControl(null, Validators.required),
    });
  }

  onDeleteBatchClick(id: string, batchCode: string, batchName: string){
    const dialogRef = this.dialog.open(DeleteProgramDialogComponent, {
      data: { id: id, batchCode: batchCode, batchName: batchName }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      if(result === true){
        this.batchTableService.deleteBatch(id).subscribe({
          next: () =>{
            this.getBatchesList();
          },
          error: () => console.log('Error while deleting program')
        })
      }
      if(result === false){
        this.getBatchesList();
      }
    })

    
  }

  onEditBatchClick(id: number, row: BatchTable) {
    this.editRowId = id;
    this.editBatchReactiveForm.patchValue(row);
  }

  saveBatch(id: string){
    if(this.editBatchReactiveForm.valid){
      console.log(this.batchTableService.editBatch(id,this.editBatchReactiveForm.value));
      this.batchTableService.editBatch(id,this.editBatchReactiveForm.value).subscribe({
        next: () =>{
          this.cancelEditing();
          this.getBatchesList();
        },
        error: () => console.log('Error while saving editing program')
      });
    }

  }

  cancelEditing(){
    this.editRowId = null;
    this.getBatchesList();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onCancelClick(){
    
  }

  onSubmit(){
    
  }
 
}
