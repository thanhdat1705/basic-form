import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'basic-form';
}
