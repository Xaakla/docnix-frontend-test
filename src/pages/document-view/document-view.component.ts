import {Component, OnInit} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {IDocument} from "../../interfaces/document.interface";
import {DatePipe, NgClass} from "@angular/common";
import {AppRoutes} from "../../core/routes.config";
import {RouteService} from "../../services/route.service";
import {FunctionCommon} from "../../common/function.common";
import {PhaseEnum} from "../../enums/phase.enum";

@Component({
  selector: 'app-document-view',
  standalone: true,
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './document-view.component.html',
  styleUrl: './document-view.component.scss'
})
export class DocumentViewComponent implements OnInit {

  public documentId!: number;
  public document!: IDocument;

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
    this._findById();
  }

  private _readParams() {
    this._activatedRoute.params
      .subscribe({
        next: ({documentId}: any) => {
          this.documentId = Number(documentId);
        }, error: (err) => this._alertService.errorToast(err.message)
      });
  }

  private _findById() {
    this._documentService.findById(this.documentId)
      .subscribe({
        next: ({data}: any) => this.document = data,
        error: () => this._alertService.errorToast(`Erro ao buscar documento com id ${this.documentId}`)
      });
  }

  public gotoVersionsList() {
    this._routeService.go([AppRoutes.Dashboard.Folders.Documents.path], {acronym: this.document.acronym});
  }

  public translatePhaseEnum(phase: string = 'DRAFT') {
    return FunctionCommon.translatePhaseEnum(phase);
  }
}
