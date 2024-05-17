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

@Component({
  selector: 'app-programs-table',
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
    DeleteProgramDialogComponent
    
  ],
  templateUrl: './programs-table.component.html',
  styleUrls: ['./programs-table.component.scss']
})
export class ProgramsTableComponent implements OnInit {
  dataSource = new MatTableDataSource([{}]);
  editProgramReactiveForm!: FormGroup;
  protected editRowId : number | null = null;

  displayedColumns: string[] = [
    'actions',
    'code',
    'programName',
    'theoryTime',
    'practiceTime',
    'description',
    'course',
  ];

  constructor(private _liveAnnouncer: LiveAnnouncer,private programsTableService:ProgramsTableService,private dialog: MatDialog) {}

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
    this.getProgramsList();
  }

  getProgramsList(){
    console.log(this.programsTableService.getPrograms());
    this.programsTableService.getPrograms().subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      },
      error: () => console.log('Error while Fetching program')

    })


    this.editProgramReactiveForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      programName: new FormControl(null, Validators.required),
      theoryTime: new FormControl(null, Validators.required),
      practiceTime: new FormControl(null, Validators.required),
      description: new FormControl(null,),
      courses: new FormControl(null,),
    });
  }

  onDeleteProgramClick(id: string, code: string, programName: string){
    const dialogRef = this.dialog.open(DeleteProgramDialogComponent, {
      data: { id: id, code: code, programName: programName }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      if(result === true){
        this.programsTableService.deleteProgram(id).subscribe({
          next: () =>{
            this.getProgramsList();
          },
          error: () => console.log('Error while deleting program')
        })
      }
      if(result === false){
        this.getProgramsList();
      }
    })

    
  }

  onEditProgramClick(id: number, row: ProgramsTable) {
    this.editRowId = id;
    this.editProgramReactiveForm.patchValue(row);
  }

  saveProgram(id: string){
    if(this.editProgramReactiveForm.valid){
      console.log(this.programsTableService.editProgram(id,this.editProgramReactiveForm.value));
      this.programsTableService.editProgram(id,this.editProgramReactiveForm.value).subscribe({
        next: () =>{
          this.cancelEditing();
          this.getProgramsList();
        },
        error: () => console.log('Error while saving editing program')
      });
    }

  }

  cancelEditing(){
    this.editRowId = null;
    this.getProgramsList();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
 
}
