import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'option',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'option.component.html',
})
export class OptionComponent {

  @Input()
  public data: any[] | null;

  constructor() {}
}
