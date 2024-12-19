import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {FolderCardComponent} from "../../components/folder-card/folder-card.component";
import {AppRoutes} from "../../core/routes.config";
import {RouteService} from "../../services/route.service";
import {NgbAlert, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {DocumentService} from "../../services/document.service";
import {IAcronymGroup} from "../../interfaces/acronym-group.interface";
import {ActivatedRoute} from "@angular/router";
import {Strings} from "../../common/function.common";
import isObjectEmpty = Strings.isObjectEmpty;
import {AppLoadingComponent} from "../../shared/app-loading/app-loading.component";
import {AppPaginationComponent} from "../../shared/app-pagination/app-pagination.component";

@Component({
  selector: 'app-folders-list',
  standalone: true,
  imports: [
    FolderCardComponent,
    NgbAlert,
    AppLoadingComponent,
    AppPaginationComponent,
    NgbTooltip
  ],
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.scss'
})
export class FoldersListComponent implements OnInit {

  public folders: IAcronymGroup[] = [];
  public pagination = this._defaultPagination;
  public ngbPage: number = 1;
  public loading = true;

  constructor(
    private _documentService: DocumentService,
    private _alertService: AlertService,
    private _routeService: RouteService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._readQueryParams();
  }

  private _readQueryParams() {
    this._activatedRoute.queryParams.subscribe({
      next: (params: any) => {
        if (!isObjectEmpty(params)) {
          this.pagination = {...this.pagination, ...params};
          this.ngbPage = Number(params?.page) + 1;
        }
        this._findAllPaginated(this.pagination);
      }
    });
  }

  private _findAllPaginated(params: any): void {
    this._documentService.findAllGroupedByAcronym(params)
      .subscribe({
        next: (success: any) => {
          this.pagination = {
            ...this.pagination,
            page: success['data']['currentPage'],
            totalResults: success['data']['totalResults'],
            totalPages: success['data']['totalPages']
          };
          this.folders = success['data']['result'];
          this.loading = false;
        }, error: () => {
          this._alertService.errorToast('Não foi possível buscas as pastas!');
          this.loading = false;
        }
      });
  }

  public gotoNewDocument() {
    this._routeService.go([AppRoutes.Dashboard.Folders.NewDocument.path]);
  }

  public gotoDocumentsList(acronym: string) {
    this._routeService.go([AppRoutes.Dashboard.Folders.Documents.path], {acronym});
  }

  public changeItemsPerPage(itemsPerPage: any): void {
    this._routeService.updateQueryParams({...this.pagination, page: 0, itemsPerPage});
  }

  public paginate(page: any): void {
    this.pagination.page = page - 1;
    this._routeService.updateQueryParams(this.pagination);
  }

  private get _defaultPagination(): any {
    return {
      totalResults: 0,
      page: 0,
      itemsPerPage: 10
    };
  }

  public getMessage(quantity: number): string {
    return `${quantity} item${quantity > 1 ? "s" : ""}`;
  }
}
