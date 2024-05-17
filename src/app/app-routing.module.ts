import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/shared/header/header.component';
import { ProgramsComponent } from './component/admin/pages/Courses and programs/programs/programs.component';
import { TeachersComponent } from './component/admin/pages/teachers/teachers.component';
import { StudentsComponent } from './component/admin/pages/students/students.component';
import { BatchComponent } from './component/admin/pages/batch/batch.component';

const routes: Routes = [
  {path : '', component: HeaderComponent},
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'programs', component: ProgramsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'batch', component: BatchComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
