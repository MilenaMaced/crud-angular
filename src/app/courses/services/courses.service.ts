import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses'
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(), //fecha
      //take(1), quando retorna 1 fecha
      //delay(5000),
      tap(courses => console.log(courses))
    );
  }
  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
