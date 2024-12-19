import {Component, OnInit} from '@angular/core';
import {IDocument} from "../../interfaces/document.interface";
import {DocumentService} from "../../services/document.service";
import {FunctionCommon, Strings} from "../../common/function.common";
import isObjectEmpty = Strings.isObjectEmpty;
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {RouteService} from "../../services/route.service";
import {AppLoadingComponent} from "../../shared/app-loading/app-loading.component";
import {NgbAlert, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {AppPaginationComponent} from "../../shared/app-pagination/app-pagination.component";
import {DatePipe, NgClass} from "@angular/common";
import {PhaseEnum} from "../../enums/phase.enum";
import {AppRoutes} from "../../core/routes.config";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DebounceDirective} from "../../core/directives/debounce.directive";

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [
    AppLoadingComponent,
    NgbAlert,
    AppPaginationComponent,
    DatePipe,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgClass,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss'
})
export class DocumentsListComponent implements OnInit {

  public documents: IDocument[] = [];
  public pagination = this._defaultPagination;
  public ngbPage: number = 1;
  public loading = true;

  protected readonly Phase = PhaseEnum;

  constructor(
    private _documentService: DocumentService,
    private _activatedRoute: ActivatedRoute,
    private _alertService: AlertService,
    private _routeService: RouteService
  ) {
  }

  ngOnInit(): void {
    this._readParams();
    this._readQueryParams();
  }

  private _readParams() {
    this._activatedRoute.params
      .subscribe({
        next: ({acronym}: any) => this.pagination.acronym = acronym,
        error: (err) => this._alertService.errorToast(err.message)
      });
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
    this._documentService.findAllPaginated(params)
      .subscribe({
        next: (success: any) => {
          this.pagination = {
            ...this.pagination,
            page: success['data']['currentPage'],
            totalResults: success['data']['totalResults'],
            totalPages: success['data']['totalPages']
          };
          this.documents = success['data']['result'];
          this.loading = false;
        }, error: () => {
          this._alertService.errorToast('Não foi possível buscas as pastas!');
          this.loading = false;
        }
      });
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
      title: '',
      phase: '',
      acronym: '',
      totalResults: 0,
      page: 0,
      itemsPerPage: 10
    };
  }

  public translatePhaseEnum(phase: string) {
    return FunctionCommon.translatePhaseEnum(phase);
  }

  public gotoFoldersList() {
    this._routeService.go([AppRoutes.Dashboard.Folders.path]);
  }

  public gotoEditDocument(documentId: number) {
    this._routeService.go([AppRoutes.Dashboard.Folders.Documents.Edit.path], {
      documentId,
      acronym: this.pagination.acronym
    });
  }

  public viewDocument(documentId: number) {
    this._routeService.go([AppRoutes.Dashboard.Folders.Documents.View.path], {
      documentId,
      acronym: this.pagination.acronym
    });
  }

  public submit(id: number) {
    this._documentService.submit(id)
      .subscribe({
        next: () => {
          this._alertService.successToast('Documento submetido com sucesso!');
          this._readQueryParams();
        },
        error: ({error}: HttpErrorResponse) => this._alertService.errorToast(!!error ? error : 'Erro ao submeter documento')
      });
  }

  public generateVersion(id: number) {
    this._documentService.generateVersion(id)
      .subscribe({
        next: () => {
          this._alertService.successToast('Versão gerada com sucesso!');
          this._readQueryParams();
        },
        error: ({error}: HttpErrorResponse) => this._alertService.errorToast(!!error ? error : 'Erro ao gerar versão')
      });
  }

  public search(): void {
    this.pagination.page = 0;
    this._routeService.updateQueryParams(this.pagination);
  }

  public searchPhase(phase: string): void {
    this.pagination.page = 0;
    this.pagination.phase = phase;
    this._routeService.updateQueryParams(this.pagination);
  }
}
