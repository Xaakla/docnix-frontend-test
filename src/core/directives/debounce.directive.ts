import {Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
    selector: '[debounce]',
  standalone: true
})
export class DebounceDirective implements OnInit, OnDestroy {
    @Input() debounceTime = 1000;
    @Output() debounceOnChange = new EventEmitter();
    @Output() debounceOnEnter = new EventEmitter();
    private clicks = new Subject();
    private subscription!: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.subscription = this.clicks.pipe(
            debounceTime(this.debounceTime)
        ).subscribe((e: any) => {
                if (e.key === 'Enter') {
                    this.debounceOnEnter.emit(e);
                } else {
                    this.debounceOnChange.emit(e);
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('keyup', ['$event'])
    clickEvent(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }

    @HostListener('search', ['$event'])
    searchEvent(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
