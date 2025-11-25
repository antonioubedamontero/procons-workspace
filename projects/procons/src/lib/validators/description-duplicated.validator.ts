import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function duplicationDescriptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArrayControls = (control as FormArray).controls as FormGroup[];

    const formArrayValues: string[] = formArrayControls.map((group) => {
      return group.get('description')?.value ?? '';
    });

    const uniqueDescriptions = new Set(formArrayValues);

    return formArrayValues.length !== uniqueDescriptions.size
      ? { duplicateDescriptions: true }
      : null;
  };
}
