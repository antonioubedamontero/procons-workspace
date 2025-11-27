# 📚 Procons Library

**Procons** is a private Angular UI library created exclusively for the **procons-app** project.

It provides reusable components for managing **pros and cons** items, including validated text inputs, scoring sliders, and delete actions.

This library is not intended for public use or distribution outside the procons-app ecosystem.

## 🔒 Project Status: Private

This package is designed only for internal use within **procons-app**.  
External usage, redistribution, or publication as a public npm package is not supported.

## ✨ Features

- 🚀 Standalone Angular components (Angular 20)
- 📋 Reactive Forms support
- ⚠️ Built-in validation and error messages
- 🎚️ Angular Material slider integration
- 🗑️ Delete event output
- 🧹 OnPush change detection for optimized UI performance
- 🔗 Easy integration into procons-app modules and components

## 📦 Installation (Internal Only)

Inside **procons-app**, install the library as a dependency:

```bash
npm install procons
```

_(Only works within the private workspace or internal registry.)_

## 🔧 Usage Example (Standalone Component – Angular 20)

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProconsListItem } from 'procons';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ProconsListItem],
  template: `
    <h2>Pros</h2>

    <lib-procons-list-item
      [listItemType]="'pro'"
      [listItemFormGroup]="proForm"
      (deleteButtonPressed)="handleDelete()"
    ></lib-procons-list-item>

    <h2>Cons</h2>

    <lib-procons-list-item
      [listItemType]="'con'"
      [listItemFormGroup]="conForm"
      (deleteButtonPressed)="handleDelete()"
    ></lib-procons-list-item>
  `,
})
export class DemoComponent {
  proForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    score: new FormControl(5),
  });

  conForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    score: new FormControl(5),
  });

  handleDelete() {
    console.log('Item deleted!');
  }
}
```

## 🧩 Component API

### `<lib-procons-list-item>`

| Input               | Type                                     | Description                      |
| ------------------- | ---------------------------------------- | -------------------------------- |
| `listItemType`      | `'pro' \| 'con'`                         | Controls placeholder text        |
| `listItemFormGroup` | `FormGroup<ProconsListItemDataControls>` | Reactive form group for the item |

| Output                | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `deleteButtonPressed` | `boolean` | Fired when the delete button is clicked |

## 📁 Required Form Structure

```ts
interface ProconsListItemDataControls {
  description: FormControl<string>;
  score: FormControl<number>;
}
```

## 🛠 Development

```bash
npm install
ng build procons
```

The built library will be generated in:

```
/dist/procons
```

## 📄 Changelog

See the `CHANGELOG.md` file for version history.

## 📜 License

This library is part of the private **procons-app** project.  
All rights reserved. Not for external distribution.
