import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private counter = new BehaviorSubject<number>(0);

    readonly isLoading$: Observable<boolean> = this.counter.asObservable().pipe(
        map(v => v > 0),
        distinctUntilChanged()
    );

    show() {
        this.counter.next(this.counter.value + 1);
    }

    hide() {
        this.counter.next(Math.max(0, this.counter.value - 1));
    }

    reset() {
        this.counter.next(0);
    }
}
