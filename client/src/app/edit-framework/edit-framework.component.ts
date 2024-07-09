import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FrameworkFormComponent } from '../framework-form/framework-form.component';
import { Framework } from '../framework';
import { FrameworkService } from '../framework.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-framework',
  standalone: true,
  imports: [FrameworkFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Framework</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-Framework-form
          [initialState]="framework()"
          (formSubmitted)="editFramework($event)"
        ></app-Framework-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditFrameworkComponent implements OnInit {
  framework = {} as WritableSignal<Framework>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private frameworkService: FrameworkService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.frameworkService.getFramework(id!);
    this.framework = this.frameworkService.framework$;
  }

  editFramework(framework: Framework) {
    this.frameworkService
      .updateFramework(this.framework()._id || '', framework)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update framework');
          console.error(error);
        },
      });
  }
}