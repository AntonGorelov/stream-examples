import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, map, startWith, tap, of, switchMap } from 'rxjs';

export function sleep(ms: number, data?: string) {
  const start = performance.now();

  while (performance.now() - start < ms) {
    console.log(data, Math.floor(performance.now() - start));
  }
}

@Component({
  selector: 'app-blocked',
  templateUrl: 'blocked.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockedComponent implements OnInit {

  public dataControl = new FormControl('');
  public dataOptions: string[] = ['One', 'Two', 'Three', 'cock', 'data100'];
  public dataOptions$!: Observable<string[]>;

  private _longRequest$ = of({}).pipe(
    tap(() => console.log('start')),
    map(() => sleep(1000)),
    map(() => []),
  );

  constructor() {}

  public ngOnInit(): void {
    this.dataOptions$ = this.dataControl.valueChanges
      .pipe(
        startWith(''),
        tap((value) => {
          console.log('control =>', value);
        }),
        map((value) => this._filter(value || '')),
        switchMap(() => this._longRequest$),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.dataOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

}
