import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.loadingSubject.asObservable();

    show() {
        // Usamos Promise.resolve().then() para esperar al siguiente ciclo
        Promise.resolve().then(() => this.loadingSubject.next(true));
    }

    hide() {
        Promise.resolve().then(() => this.loadingSubject.next(false));
    }
}