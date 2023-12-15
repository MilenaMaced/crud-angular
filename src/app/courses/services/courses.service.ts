import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses'
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }
  save(record: Partial<Course>) {
    return record.id ? this.update(record) : this.create(record);
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
