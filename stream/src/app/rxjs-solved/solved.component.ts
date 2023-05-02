import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, map, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

export function sleep(ms: number, data?: string) {
  const start = performance.now();

  while (performance.now() - start < ms) {
    // console.log(data, Math.floor(performance.now() - start));
  }
}

@Component({
  selector: 'app-solved',
  templateUrl: 'solved.component.html',
})
export class SolvedComponent {

  public control = new FormControl('');
  public todos$ = this.control.valueChanges
    .pipe(
      tap((value: string | null) => console.log(value)),
      // map(() => []),
      switchMap((value: string | null) => this._longRequest$(value))
    );

  constructor(
    private readonly _http: HttpClient,
  ) {}

  private _longRequest$(value: string | null): Observable<any> {
    return this._http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap((items: any) => sleep(1000)),
        map((todos: any[]) =>
          todos.map(() => Math.floor(Math.random() * 100).toString())
        )
      );
  }

}
