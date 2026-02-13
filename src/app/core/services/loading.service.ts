import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.loadingSubject.asObservable();
    private pendingRequests = 0;

    show() {
        this.pendingRequests += 1;
        this.emit();
    }

    hide() {
        this.pendingRequests = Math.max(0, this.pendingRequests - 1);
        this.emit();
    }

    private emit() {
        // Usamos Promise.resolve().then() para esperar al siguiente ciclo
        const isLoading = this.pendingRequests > 0;
        Promise.resolve().then(() => this.loadingSubject.next(isLoading));
    }
}
