import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListItemType, ProconsListItemDataControls } from '../../interfaces';

@Component({
  selector: 'lib-procons-list-item',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './procons-list-item.html',
  styleUrls: ['./procons-list-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProconsListItem {
  listItemType = input.required<ListItemType>();
  listItemFormGroup = input.required<FormGroup<ProconsListItemDataControls>>();

  deleteButtonPressed = output<boolean>();

  placeHolderMessage = computed(() => {
    if (this.listItemType() === 'pro') {
      return 'Escribe el pro';
    }

    return 'Escribe el contra';
  });

  getControlFromGroup(controlName: string): FormControl {
    return this.listItemFormGroup()?.get(controlName) as FormControl;
  }

  hasError(fieldName: string): boolean {
    const control = this.getControlFromGroup(fieldName);
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorsFromField(fieldName: string): string {
    const control = this.getControlFromGroup(fieldName);
    const controlErrors = control.errors;

    if (!controlErrors) {
      return '';
    }

    if (controlErrors['required']) {
      return 'Este campo es obligatorio';
    }

    if (controlErrors['minlength']) {
      const requiredLength = controlErrors['minlength'].requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres`;
    }

    return 'Error de validación desconocido.';
  }

  sendDeleteNotification(): void {
    this.deleteButtonPressed.emit(true);
  }
}
