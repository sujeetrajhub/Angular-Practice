import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule,FormGroup,FormControl, Validators, NgModel, FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ProgramsTableService } from 'src/app/component/shared/services/programs-table.service';
import { ProgramsTableComponent } from './programs-table/programs-table.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ProgramsTableComponent,
    FormsModule
  ],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  selected = 'option2';
  addProgramReactiveForm!: FormGroup;
  addProgramButtonClicked: boolean = false;

  constructor(private programsTableService:ProgramsTableService) { }
  
  
  displayedColumns: string[] = [
    'actions',
    'code',
    'programName',
    'theoryTime',
    'practiceTime',
    'description',
    'course',
  ];

  searchValue:string=''
  onSearchEvent(event: any) {
    this.searchValue = event.target.value;
  }
 

  ngOnInit(): void {
    this.addProgramReactiveForm = new FormGroup({
      code: new FormControl(null,Validators.required),
      programName: new FormControl(null,Validators.required),
      theoryTime: new FormControl(null,Validators.required),
      practiceTime: new FormControl(null,Validators.required),
      description: new FormControl(null,),
      course: new FormControl(null,),
    });
      
  }
  onSubmit(){
    console.log(this.addProgramReactiveForm.value);
    if(this.addProgramReactiveForm.valid){
      this.programsTableService.addProgram(this.addProgramReactiveForm.value)
      .subscribe({
        next: () =>{
          this.addProgramButtonClicked = false;
          this.addProgramReactiveForm.reset();
        },
        error: () => alert('Something went wrong')
      })
   }

  }

  onCancelClick(){
    this.addProgramButtonClicked = !this.addProgramButtonClicked;
  }
}
