import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable, tap, map, switchMap } from 'rxjs';

import { Logger } from '../logger.service';
import { sleep } from '../utils/sleep';

@Component({
  selector: 'app-solved',
  templateUrl: 'solved.component.html',
})
export class SolvedComponent {

  public logs$ = this._logger.messages$();

  public control = new FormControl('');
  public todos$ = this.control.valueChanges
    .pipe(
      tap((value: string | null) => this._logger.log(value)),
      // map(() => []),
      switchMap((value: string | null) => this._longRequest$())
    );

  constructor(
    private readonly _http: HttpClient,
    private readonly _logger: Logger,
  ) {}

  private _longRequest$(): Observable<any> {
    return this._http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap((items: any) => sleep(1000, this._logger)),
        map((todos: any[]) =>
          todos.map(() => Math.floor(Math.random() * 100).toString()).slice(0, 15)
        ),
        tap((items: any) => this._logger.log('END long request')),
      );
  }

}