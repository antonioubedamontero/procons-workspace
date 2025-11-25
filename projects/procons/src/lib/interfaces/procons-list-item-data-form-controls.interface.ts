import { FormControl } from '@angular/forms';

export interface ProconsListItemDataControls {
  description: FormControl<string>;
  score: FormControl<number>;
}
