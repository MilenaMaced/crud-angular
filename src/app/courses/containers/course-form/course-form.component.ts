import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    id: [''],
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    category: ['', Validators.required]
  });;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // Para editar popular os campos
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({ id: course.id, name: course.name, category: course.category })
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSucess(),
      error: () => this.onError()
    });
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo Obrigatório!'
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
