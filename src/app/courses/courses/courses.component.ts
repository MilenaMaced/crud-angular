import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,

  ) {
    this.courses$ = courseService.list().pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos')
        return of([])
      })
    );
  }
  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg
    });
  }


}
