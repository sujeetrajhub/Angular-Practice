import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeachersTable } from '../model/teachers-table.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersTableService {

  constructor(private http: HttpClient) { }
  dbURL: string = 'http://localhost:3000/teachers';

  addTeacher(data: TeachersTable) {
    return this.http.post(this.dbURL, data);
  }
  deleteTeacher(id: string) {
    return this.http.delete(this.dbURL + '/' + id);
  }
  getTeachers() {
    return this.http.get<TeachersTable[]>(this.dbURL);
  }
  editTeacher(id: string, data: TeachersTable) {
    return this.http.patch(this.dbURL + '/' + id, data);
  }
}
