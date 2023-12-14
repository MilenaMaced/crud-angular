import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
  ) {}

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      result => this.onSucess(),
      error => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Error ao cadastrar curso', '', { duration: 5000 });
  }
  private onSucess() {
    this._snackBar.open('Curso salvo com curso', '', { duration: 5000 });
    this.location.back();
  }
}
