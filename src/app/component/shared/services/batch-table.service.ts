import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatchTable } from '../model/batch-table.model';

@Injectable({
  providedIn: 'root'
})
export class BatchTableService {
  constructor(private http: HttpClient) { }
  dbURL: string = 'http://localhost:3000/batches';

  addBatch(data: BatchTable) {
    return this.http.post(this.dbURL, data);
  }
  deleteBatch(id: string) {
    return this.http.delete(this.dbURL + '/' + id);
  }
  getBatches() {
    return this.http.get<BatchTable[]>(this.dbURL);
  }
  editBatch(id: string, data: BatchTable) {
    return this.http.patch(this.dbURL + '/' + id, data);
  }
}
