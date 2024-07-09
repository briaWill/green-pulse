import { Component, OnInit, WritableSignal } from '@angular/core';
import { Framework } from '../framework';
import { FrameworkService } from '../framework.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-framework-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Framework List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="frameworks$()"> 
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Framework Name</th>
            <td mat-cell *matCellDef="let element">{{ element.Framework_name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-desc">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let element">{{ element.Framework_description }}</td>
          </ng-container>
          <ng-container matColumnDef="col-Aemail">
            <th mat-header-cell *matHeaderCellDef>Assignee Email</th>
            <td mat-cell *matCellDef="let element">{{ element.Assignee_email }}</td>
          </ng-container>
          <ng-container matColumnDef="col-Cemail1">
          <th mat-header-cell *matHeaderCellDef>Contributor Email 1</th>
          <td mat-cell *matCellDef="let element">{{ element.Contributor_email1 }}</td>
        </ng-container>
        <ng-container matColumnDef="col-Cemail2">
        <th mat-header-cell *matHeaderCellDef>Contributor Email 2</th>
        <td mat-cell *matCellDef="let element">{{ element.Contributor_email2 }}</td>
      </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteFramework(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add New Framework
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class FrameworksListComponent implements OnInit {
  frameworks$ = {} as WritableSignal<Framework[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-desc',
    'col-Aemail',
    'col-Cemail1',
    'col-Cemail2',
    'col-action',
  ];

  constructor(private frameworksService: FrameworkService) {}

  ngOnInit() {
    this.fetchFramework();
  }

  deleteFramework(id: string): void {
    this.frameworksService.deleteFramework(id).subscribe({
      next: () => this.fetchFramework(),
    });
  }

  private fetchFramework(): void {
    this.frameworks$ = this.frameworksService.frameworks$;
    this.frameworksService.getFrameworks();
  }
}