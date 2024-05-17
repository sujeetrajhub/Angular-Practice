import { CommonModule } from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { ProgramsTableService } from 'src/app/component/shared/services/programs-table.service';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProgramsTable } from 'src/app/component/shared/model/programs-table.model';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteProgramDialogComponent } from 'src/app/component/shared/delete-program-dialog/delete-program-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TeachersTableService } from 'src/app/component/shared/services/teachers-table.service';

@Component({
  selector: 'app-teachers-table',
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
  ],
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss']
})
export class TeachersTableComponent {
  dataSource = new MatTableDataSource([{}]);
  editTeacherReactiveForm!: FormGroup;
  protected editRowId : number | null = null;

  displayedColumns: string[] = [
    'actions',
    'teacherName',
    'courseAssigned',
    'emailId',
  ];

  constructor(private _liveAnnouncer: LiveAnnouncer,private teachersTableService:TeachersTableService,private dialog: MatDialog) {}

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
    this.getTeachersList();
  }

  getTeachersList(){
    console.log(this.teachersTableService.getTeachers());
    this.teachersTableService.getTeachers().subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      },
      error: () => console.log('Error while Fetching program')

    })


    this.editTeacherReactiveForm = new FormGroup({
      teacherName: new FormControl(null, Validators.required),
      courseAssigned: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
    });
  }

  onDeleteTeacherClick(id: string, code: string, programName: string){
    const dialogRef = this.dialog.open(DeleteProgramDialogComponent, {
      data: { id: id, code: code, programName: programName }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      if(result === true){
        this.teachersTableService.deleteTeacher(id).subscribe({
          next: () =>{
            this.getTeachersList();
          },
          error: () => console.log('Error while deleting program')
        })
      }
      if(result === false){
        this.getTeachersList();
      }
    })

    
  }

  onEditTeacherClick(id: number, row: ProgramsTable) {
    this.editRowId = id;
    this.editTeacherReactiveForm.patchValue(row);
  }

  saveTeacher(id: string){
    if(this.editTeacherReactiveForm.valid){
      console.log(this.teachersTableService.editTeacher(id,this.editTeacherReactiveForm.value));
      this.teachersTableService.editTeacher(id,this.editTeacherReactiveForm.value).subscribe({
        next: () =>{
          this.cancelEditing();
          this.getTeachersList();
        },
        error: () => console.log('Error while saving editing program')
      });
    }

  }

  cancelEditing(){
    this.editRowId = null;
    this.getTeachersList();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
