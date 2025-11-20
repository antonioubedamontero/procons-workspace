import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';

import { ProconsListItem, ProconsList } from 'procons';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, ProconsListItem, ProconsList],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private fb = inject(FormBuilder);

  protected readonly title = signal('Demo library Procons');

  proconsForm = this.fb.group({
    procons: this.fb.array([
      this.fb.group({
        description: ['Campo 1', [Validators.required, Validators.minLength(4)]],
        score: [4, [Validators.required]],
      }),
      this.fb.group({
        description: ['Campo 2', [Validators.required, Validators.minLength(4)]],
        score: [7, [Validators.required]],
      }),
      this.fb.group({
        description: ['Campo 3', [Validators.required, Validators.minLength(4)]],
        score: [9, [Validators.required]],
      }),
    ]),
  });

  get proconsFormArray(): FormArray {
    return this.proconsForm.get('procons') as FormArray;
  }

  get firstElement(): FormGroup {
    return this.proconsFormArray.controls[0] as FormGroup;
  }
}
