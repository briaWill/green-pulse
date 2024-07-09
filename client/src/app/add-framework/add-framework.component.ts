import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FrameworkFormComponent } from '../framework-form/framework-form.component';
import { Framework } from '../framework';
import { FrameworkService } from '../framework.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-Framework',
  standalone: true,
  imports: [FrameworkFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Framework</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-Framework-form
          (formSubmitted)="addFramework($event)"
        ></app-Framework-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddFrameworkComponent {
  constructor(
    private router: Router,
    private frameworkService: FrameworkService
  ) {}

  addFramework(framework: Framework) {
    this.frameworkService.createFramework(framework).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create framework');
        console.error(error);
      },
    });
    this.frameworkService.getFrameworks();
  }
}