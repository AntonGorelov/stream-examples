import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
})
export class OptionComponent {
  @Input()
  public data!: any[] | null;

  constructor() {}
}
