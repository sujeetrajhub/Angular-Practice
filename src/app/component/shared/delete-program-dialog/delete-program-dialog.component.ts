import { Component, Inject, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgramsTableService } from '../services/programs-table.service';
import { ProgramsTableComponent } from '../../admin/pages/Courses and programs/programs/programs-table/programs-table.component';

@Component({
  selector: 'app-delete-program-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-program-dialog.component.html',
  styleUrls: ['./delete-program-dialog.component.scss'],
})
export class DeleteProgramDialogComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteProgramDialogComponent>,
  ) {}

  // id: string = this.data.id;

}
