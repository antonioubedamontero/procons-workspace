import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ListItemType } from '../../interfaces';
import { ProconsListItem } from '../procons-list-item/procons-list-item';
import { duplicationDescriptionValidator } from '../../validators';

@Component({
  selector: 'lib-procons-list',
  imports: [MatButtonModule, MatIconModule, ProconsListItem],
  templateUrl: './procons-list.html',
  styleUrls: ['./procons-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProconsList {
  private fb = inject(FormBuilder);

  proconsListData = input<FormArray>(this.fb.array([], duplicationDescriptionValidator()));
  listItemType = input.required<ListItemType>();

  proconsFormGroups = computed(() => {
    return this.proconsListData().controls as FormGroup[];
  });

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
}
