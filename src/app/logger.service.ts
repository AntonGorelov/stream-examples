import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class Logger {

  private readonly _messages$ = new BehaviorSubject<any>([]);

  constructor() {
    this._messages$.subscribe();
  }

  public messages$(): Observable<any> {
    return this._messages$.asObservable();
  }

  public log(message: string | null, type: 'default' | 'sleep' = 'default'): void {
    const queue = this._messages$.value;
    queue.push({ message, type });

    console.log(`%c${message}`, "color:red; font-size: x-medium");
    this._messages$.next(queue);
  }

}
