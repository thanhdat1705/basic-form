import { Injectable, signal, effect } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PreviewForm, QuestionForm } from '../utils/form.interface';

@Injectable({ providedIn: 'root' })
export class FormService {
  questionForm = signal<QuestionForm[]>([]);
  previewForm = signal<PreviewForm[]>([]);
}
