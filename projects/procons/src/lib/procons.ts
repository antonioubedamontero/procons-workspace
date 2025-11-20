import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-procons',
  imports: [MatButtonModule],
  template: `
    <div class="example-button-row">
      <button matButton="filled">Basic</button>
      <button matButton="filled" disabled>Disabled</button>
      <a matButton="filled" href="https://www.google.com/" target="_blank">Link</a>
    </div>
  `,
  styles: ``,
})
export class Procons {}
