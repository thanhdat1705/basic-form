import { Component, OnInit, effect, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatListModule,
  MatListOption,
  MatSelectionListChange,
} from '@angular/material/list';

import { FormService } from 'src/app/common/data-access';
import { AddQuestionDialogComponent } from '../add-question-dialog';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { PreviewForm } from 'src/app/common/utils/form.interface';

@Component({
  standalone: true,
  selector: 'bf-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    NgTemplateOutlet
  ],
})
export class FormBuilderComponent {
  #dialog = inject(MatDialog);
  #router = inject(Router);
  formService = inject(FormService);

  // addNewQuestion(): void {
  //   const dialogRef = this.#dialog.open(AddQuestionDialogComponent, {
  //     width: '400px',
  //   });
  // }

  formGroup = new FormGroup({
    items: new FormArray<FormGroup<any>>([]),
  });

  get form() {
    return this.formGroup.controls;
  }

  private questionFormEffect = effect(() => {
    const formArray = new FormArray<FormGroup<any>>([]);
    this.formService.questionForm().forEach((item) => {
      formArray.push(
        new FormGroup({
          type: new FormControl(item.type),
          isRequired: new FormControl(item.isRequired),
          question: new FormControl(item.question),
          answer: new FormControl<string[]>(
            [],
            item.isRequired ? Validators.required : null
          ),
        })
      );
    });

    this.formGroup.controls.items.clear();

    if (formArray.controls.length > 0) {
      formArray.controls.forEach((control) => {
        this.formGroup.controls.items.push(control);
      });
    }
  });

  addNewQuestion(): void {
    this.#dialog.open(AddQuestionDialogComponent, {
      width: '400px',
    });
  }

  optionChange(selection: MatListOption[], control: FormGroup<any>) {
    const answer: string[] = selection.map((item) => item.value);
    control.controls['answer'].setValue(answer);
  }

  reviewAnswer(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      return;
    }

    this.formService.previewForm.set(this.formGroup.getRawValue().items as PreviewForm[]);
    this.#router.navigate(['/form/answers'])
  }
}
