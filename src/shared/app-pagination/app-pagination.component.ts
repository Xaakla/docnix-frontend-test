import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {FunctionCommon} from "../../common/function.common";

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  standalone: true,
  imports: [
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext,
    FormsModule
  ],
  styleUrls: ['./app-pagination.component.scss']
})
export class AppPaginationComponent {

    @Input()
    show: boolean = false;

    @Input()
    totalResults: number = 0;

    @Input({transform: numberAttribute})
    currentPage: number = 0;

    @Input()
    itemsPerPage: number = 10;

    @Input()
    itemsPerPageList: number[] = [10, 15, 20, 25, 50];

    @Output()
    paginateEvent = new EventEmitter();

    @Output()
    itemsPerPageChangeEvent = new EventEmitter();

    handleAmountPaginationItems() {
        return FunctionCommon.handleAmountPaginationItems(screen.width);
    }

    paginate(ev: any) {
        this.paginateEvent.emit(ev);
    }

    changeItemsPerPage(ev: any) {
        this.itemsPerPageChangeEvent.emit(ev);
    }
}
