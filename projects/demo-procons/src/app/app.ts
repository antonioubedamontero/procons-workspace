import { Component, signal } from '@angular/core';

import { Procons } from 'procons';

@Component({
  selector: 'app-root',
  imports: [Procons],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo-procons');
}
