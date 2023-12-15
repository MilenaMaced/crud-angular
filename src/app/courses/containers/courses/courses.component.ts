import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route })
  }

  onRemove(course: Course) {
    this.courseService.remove(course.id).subscribe({
      next: () => {
        this.refresh();
        this._snackBar.open('Curso removido com sucesso!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: () => this.onError('Erro ao tentar remover curso!'),
    });
  }

  refresh() {
    this.courses$ = this.courseService.list().pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos')
        return of([])
      })
    );
  }
}
