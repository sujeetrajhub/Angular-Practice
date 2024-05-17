import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { BatchTableService } from 'src/app/component/shared/services/batch-table.service';
import { MatButtonModule } from '@angular/material/button';
import { BatchTableComponent } from './batch-table/batch-table.component';

@Component({
  selector: 'app-batch',
  standalone: true,
  imports: [CommonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        BatchTableComponent
        
      ],
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  constructor(private batchTableService:BatchTableService) {}

  addBatchButtonClicked: boolean = false;
  addBatchReactiveForm!: FormGroup;

  displayedColumns: string[] = [
    'actions',
    'batchCode',
    'batchName',
    'batchStartDate',
  ];


  ngOnInit(): void {
    this.addBatchReactiveForm = new FormGroup({
      batchCode: new FormControl(null,Validators.required),
      batchName: new FormControl(null,Validators.required),
      batchStartDate: new FormControl(null),
    });
  }

  onSubmit(){
    console.log(this.addBatchReactiveForm.value);
    if(this.addBatchReactiveForm.valid){
      this.batchTableService.addBatch(this.addBatchReactiveForm.value)
      .subscribe({
        next: () =>{
          this.addBatchButtonClicked = false;
          this.addBatchReactiveForm.reset();
        },
        error: () => alert('Something went wrong')
      })
   }
  }

  onCancelClick(){
    this.addBatchButtonClicked = !this.addBatchButtonClicked;
  }

}
