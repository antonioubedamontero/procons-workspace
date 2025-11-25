import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { duplicationDescriptionValidator } from './description-duplicated.validator';

describe('duplicationDescriptionValidator', () => {
  let fb: FormBuilder;
  let formArray: FormArray;
  const validator = duplicationDescriptionValidator();

  beforeEach(() => {
    fb = new FormBuilder();
  });

  const createFormGroup = (description: string, score: number): FormGroup => {
    return fb.group({
      description: [description, [Validators.required]],
      score: [score],
    });
  };

  it('should return null if no duplicated descriptions', () => {
    formArray = fb.array([
      createFormGroup('Item A', 9),
      createFormGroup('Item B', 5),
      createFormGroup('Item C', 4),
    ]);

    const result = validator(formArray);
    expect(result).toBeNull();
  });

  it('should return null if array is empty', () => {
    formArray = fb.array([]);

    const result = validator(formArray);
    expect(result).toBeNull();
  });

  it('should return "{ duplicateDescriptions: true }" if exisist duplication descriptions', () => {
    formArray = fb.array([
      createFormGroup('Item A', 3),
      createFormGroup('Item B', 8),
      createFormGroup('Item A', 9),
    ]);

    const result = validator(formArray);
    expect(result).toEqual({ duplicateDescriptions: true });
  });
});
