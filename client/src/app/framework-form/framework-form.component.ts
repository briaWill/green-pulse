import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Framework } from '../framework';

@Component({
  selector: 'app-Framework-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .framework-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="framework-form"
      autocomplete="off"
      [formGroup]="frameworkForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Framework Name</mat-label>
        <input matInput placeholder="Name" formControlName="Framework_name" required />

      </mat-form-field>

      <mat-form-field>
        <mat-label>Framework Description</mat-label>
        <input
          matInput
          placeholder="framework description..."
          formControlName="Framework_description"
          required
        />

      </mat-form-field>

      <mat-form-field>
        <mat-label>Assignee Email</mat-label>
        <input
          matInput
          placeholder="Assignee Email..."
          formControlName="Assignee_email"
          required
        />

      </mat-form-field>
      <mat-form-field>
        <mat-label>Contributor Email 1</mat-label>
        <input
          matInput
          placeholder="Contributor Email..."
          formControlName="Contributor_email1"
          
        />

      </mat-form-field>

      <mat-form-field>
        <mat-label>Contributor Email 2</mat-label>
        <input
          matInput
          placeholder="Contributor Email 2..."
          formControlName="Contributor_email2"
          
        />

      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="frameworkForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class FrameworkFormComponent {
  initialState = input<Framework>();

  @Output()
  formValuesChanged = new EventEmitter<Framework>();

  @Output()
  formSubmitted = new EventEmitter<Framework>();

  frameworkForm = this.formBuilder.group({
    Framework_name: ['', [Validators.required, Validators.minLength(3)]],
    Framework_description: ['', [Validators.required, Validators.minLength(5)]],
    Assignee_email: ['', [Validators.required]],
    Contributor_email1: [''],
    Contributor_email2: [''],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.frameworkForm.setValue({
        Framework_name: this.initialState()?.Framework_name || '',
        Framework_description: this.initialState()?.Framework_description || '',
        Assignee_email: this.initialState()?.Assignee_email || '',
        Contributor_email1: this.initialState()?.Contributor_email1 || '',
        Contributor_email2: this.initialState()?.Contributor_email2 || '',
      });
    });
  }

  get Framework_name() {
    return this.frameworkForm.get('name')!;
  }
  get Framework_description() {
    return this.frameworkForm.get('Framework_description')!;
  }
  get Assignee_email() {
    return this.frameworkForm.get('Assignee_email')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.frameworkForm.value as Framework);
  }
}