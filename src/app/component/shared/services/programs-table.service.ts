import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramsTable } from '../model/programs-table.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramsTableService {

  constructor(private http: HttpClient) { }
  dbURL: string = 'http://localhost:3000/programs';

  addProgram(data: ProgramsTable) {
    return this.http.post(this.dbURL, data);
  }
  deleteProgram(id: string) {
    return this.http.delete(this.dbURL + '/' + id);
  }
  getPrograms() {
    return this.http.get<ProgramsTable[]>(this.dbURL);
  }
  editProgram(id: string, data: ProgramsTable) {
    return this.http.patch(this.dbURL + '/' + id, data);
  }
}
