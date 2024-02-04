import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormService } from 'src/app/common/data-access';

import {
  QUESTION_TYPE,
  QUESTION_TYPE_ENUM,
} from 'src/app/common/utils/form.enum';

@Component({
  selector: 'bf-add-question-dialog',
  templateUrl: 'add-question-dialog.component.html',
  styleUrls: ['add-question-dialog.component.scss'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class AddQuestionDialogComponent {
  #dialogRef = inject(MatDialogRef<AddQuestionDialogComponent>);
  dialogData: Location = inject(MAT_DIALOG_DATA);
  #formService = inject(FormService);
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  QUESTION_TYPE_ENUM = QUESTION_TYPE_ENUM;
  QUESTION_TYPE_SELECTION = [
    { value: QUESTION_TYPE_ENUM.Checkbox, viewValue: QUESTION_TYPE.checkBox },
    { value: QUESTION_TYPE_ENUM.Text, viewValue: QUESTION_TYPE.text },
  ];

  get form() {
    return this.formGroup.controls;
  }

  formGroup = new FormGroup({
    questionType: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    question: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    isOther: new FormControl<boolean>(false, { nonNullable: true }),
    isRequired: new FormControl<boolean>(false, { nonNullable: true }),
    optionList: new FormArray<any>([]),
  });

  addOption(): void {
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;
    const control = {
      id,
      controlInstance: `answerOption${id}`,
    };
    const index = this.listOfControl.push(control);
    (this.formGroup.controls['optionList'] as FormArray).push(
      new FormGroup({
        [this.listOfControl[index - 1].controlInstance]: new FormControl(
          '',
          Validators.required
        ),
      })
    );
  }

  typeChange(select: MatSelectChange): void {
    if (select.value === QUESTION_TYPE_ENUM.Checkbox) {
      this.addOption();
    } else {
      this.clearAnswerOptionControl();
    }
  }

  clearAnswerOptionControl() {
    this.formGroup.controls.optionList.clear();
    this.listOfControl = [];
  }

  close(value: any): void {
    this.#dialogRef.close(value);
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      return;
    }

    const { questionType, question, isOther, isRequired, optionList } =
      this.formGroup.getRawValue();

    this.#formService.questionForm.set([
      ...this.#formService.questionForm(),
      {
        type: questionType,
        question,
        isOther,
        isRequired,
        optionList,
      },
    ]);

    this.#dialogRef.close(true);
  }
}
