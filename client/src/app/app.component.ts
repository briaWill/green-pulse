import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FrameworksListComponent,MatToolbarModule],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>GreenPulse System</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}
