import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';

import { Observable, map, tap, switchMap } from 'rxjs';

import { OptionComponent } from './options/option.component';

export function sleep(ms: number, data?: string) {
  const start = performance.now();

  while (performance.now() - start < ms) {
    // console.log(data, Math.floor(performance.now() - start));
  }
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, OptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'test.component.html',
})
export class TestComponent {
  public readonly name = signal('');
  // `computed`: create a signal of computed value (readonly)
  public message = computed(() => `Hello ${this.name()}!`);
  public todos$ = toObservable(this.name).pipe(
    tap((value: string) => console.log(value)),
    // map(() => []),
    switchMap((value: string) => this._longRequest$(value))
  );

  constructor(private readonly _http: HttpClient) {
    // effect(() => {
    //   console.log(this.message());
    // });
  }

  public changeName(event: any): void {
    this.name.set(event.target.value);
  }

  private _longRequest$(value: string): Observable<string[]> {
    return this._http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      tap(() => sleep(1000)),
      tap(() => console.log(value)),
      map((todos: any[]) =>
        todos.map(() => Math.floor(Math.random() * 100).toString())
      )
    );
  }
}
