import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './ui';
import { FormService } from '../common/data-access';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'bf-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [MatButtonModule, MatDialogModule, RouterModule],
})
export class FormComponent {
  #dialog = inject(MatDialog);
  #router = inject(Router);
  formService = inject(FormService);

  addNewQuestion(): void {
    const dialogRef = this.#dialog.open(AddQuestionDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#router.navigate(['form/builder']);
      }
    });
  }
}
