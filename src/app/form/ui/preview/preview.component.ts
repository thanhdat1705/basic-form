import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormService } from 'src/app/common/data-access';

@Component({
  standalone: true,
  selector: 'bf-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  imports: [MatButtonModule, MatDialogModule, RouterModule],
})
export class PreviewComponent {
  formService = inject(FormService);
}
