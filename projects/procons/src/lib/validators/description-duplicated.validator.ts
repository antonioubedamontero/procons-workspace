import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function duplicationDescriptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) return null;

    const formArrayControls = (control as FormArray).controls as FormGroup[];

    const formArrayValues: string[] = formArrayControls
      .filter((group) => {
        return group.get('description')?.value.length > 0;
      })
      .map((group) => {
        return group.get('description')?.value;
      });

    const uniqueDescriptions = new Set(formArrayValues);

    return formArrayValues.length !== uniqueDescriptions.size
      ? { duplicateDescriptions: true }
      : null;
  };
}
