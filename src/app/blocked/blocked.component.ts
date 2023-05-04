import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, map, startWith, tap, of, switchMap } from 'rxjs';

import { Logger } from '../logger.service';
import { sleep } from '../utils/sleep';

@Component({
  selector: 'app-blocked',
  templateUrl: 'blocked.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockedComponent implements OnInit {

  public logs$ = this._logger.messages$();

  public dataControl = new FormControl('');
  public dataOptions = ['One', 'Two', 'Three', 'data100'];
  public dataOptions$!: Observable<string[]>;

  constructor(
    private readonly _logger: Logger,
  ) {}

  public ngOnInit(): void {
    this.dataOptions$ = this.dataControl.valueChanges
      .pipe(
        startWith(''),
        tap((value) => this._logger.log(`[ENTER] ${value}`)),
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

  private _longRequest$ = of({})
    .pipe(
      map(() => sleep(1000, this._logger)),
      map(() => []),
    );

}
