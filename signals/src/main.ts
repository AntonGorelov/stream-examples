import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TestComponent } from './test.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TestComponent],
  template: `
    <h1>Hello from {{name}}!</h1>
    
    <app-test></app-test>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
