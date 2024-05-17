import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import { TeachersTableService } from 'src/app/component/shared/services/teachers-table.service';
import { TeachersTableComponent } from "./teachers-table/teachers-table.component";

@Component({
    selector: 'app-teachers',
    standalone: true,
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    imports: [CommonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule, TeachersTableComponent]
})
export class TeachersComponent implements OnInit {
  constructor(private TeachersTableService:TeachersTableService){}
  ngOnInit(): void {
    this.addTeacherReactiveForm = new FormGroup({
      teacherName: new FormControl(null,Validators.required),
      courseAssigned: new FormControl(null,Validators.required),
      emailId: new FormControl(null,Validators.required),
    });
  }

  addTeacherButtonClicked:boolean = false;
  addTeacherReactiveForm!: FormGroup;
  displayedColumns: string[] = [
    'actions',
    'teacherName',
    'courseAssigned',
    'emailId',
  ];

  searchValue:string=''
  onSearchEvent(event: any) {
    this.searchValue = event.target.value;
  }


  onSubmit(){
    console.log(this.addTeacherReactiveForm.value);
    if(this.addTeacherReactiveForm.valid){
      this.TeachersTableService.addTeacher(this.addTeacherReactiveForm.value)
      .subscribe({
        next: () =>{
          this.addTeacherButtonClicked = false;
          this.addTeacherReactiveForm.reset();
        },
        error: () => alert('Something went wrong')
      })
   }

  }

  onCancelClick(){
    this.addTeacherButtonClicked = !this.addTeacherButtonClicked;
  }
}
