import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ListItemType } from '../../interfaces';
import { duplicationDescriptionValidator } from '../../validators';
import { ProconsListItem } from '../procons-list-item/procons-list-item';

@Component({
  selector: 'lib-procons-list',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, ProconsListItem],
  templateUrl: './procons-list.html',
  styleUrls: ['./procons-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProconsList implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  proconsListData = input<FormArray>(this.fb.array([], duplicationDescriptionValidator()));
  listItemType = input.required<ListItemType>();

  proconsFormGroups = computed(() => {
    return this.proconsListData().controls as FormGroup[];
  });

  cd = inject(ChangeDetectorRef);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const subscription = this.proconsListData().statusChanges.subscribe(() => {
      // Because ChangeDetectionStrategy.OnPush doesn't know inner state has changed
      this.cd.markForCheck();
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getDescriptionFromGroup(group: FormGroup): string {
    return group.get('description')?.value;
  }

  deleteButtonPressed(position: number): void {
    if (this.proconsListData().length > 1) {
      this.proconsListData().removeAt(position);
    }
  }

  addNewElement(): void {
    const newGroup = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(4)]],
      score: [0, [Validators.required]],
    });

    this.proconsListData().push(newGroup);
  }

  hasDuplicationMessageError(): boolean {
    const proconsListFormArray = this.proconsListData();
    return (
      proconsListFormArray.invalid && (proconsListFormArray.touched || proconsListFormArray.dirty)
    );
  }
}
