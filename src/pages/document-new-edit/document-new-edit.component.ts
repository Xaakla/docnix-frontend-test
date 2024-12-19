import {Component, OnInit} from '@angular/core';
import {FormReactiveBase} from "../../shared/base-form/form-reactive-base";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {FieldErrorMessageComponent} from "../../shared/field-error-message/field-error-message.component";
import {AppButtonComponent} from "../../shared/app-button/app-button.component";
import {RouteService} from "../../services/route.service";
import {AppRoutes} from "../../core/routes.config";
import {FormDebugComponent} from "../../shared/form-debug/form-debug.component";
import {AlertService} from "../../services/alert.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {OnlyLettersDirective} from "../../core/directives/only-letters.directive";
import {NgxMaskDirective} from "ngx-mask";
import {ActivatedRoute} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {DocumentService} from "../../services/document.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-document-new-edit',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    FieldErrorMessageComponent,
    AppButtonComponent,
    FormDebugComponent,
    OnlyLettersDirective,
    NgxMaskDirective,
    NgbTooltip
  ],
  templateUrl: './document-new-edit.component.html',
  styleUrl: './document-new-edit.component.scss'
})
export class DocumentNewEditComponent extends FormReactiveBase implements OnInit {

  public submittingFormLoading = false;
  public documentId!: number;
  public acronym!: string;

  constructor(
    private _fb: FormBuilder,
    private _routeService: RouteService,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _documentService: DocumentService
  ) {
    super();
  }

  ngOnInit() {
    this._readParams();
    this._createForm();

    if (this.isEdit()) {
      this._documentService.findById(this.documentId)
        .subscribe({
          next: ({data}: any) => this.form.patchValue(data),
          error: () => this._alertService.errorToast(`Erro ao buscar documento com id ${this.documentId}`)
        });
    }
  }

  private _createForm(): void {
    this.form = this._fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      acronym: [{value: this.acronym, disabled: !!this.acronym}, Validators.required],
      version: [{value: '', disabled: this.isEdit()}, [Validators.required, RxwebValidators.numeric()]]
    });
  }

  // Lê os parametros da url
  private _readParams() {
    this._activatedRoute.params
      .subscribe({
        next: ({documentId, acronym}: any) => {
          this.documentId = Number(documentId);
          this.acronym = acronym;
        }, error: (err) => this._alertService.errorToast(err.message)
      });
  }

  public handleGoBack() {
    if (!!this.acronym) {
      this._routeService.go([AppRoutes.Dashboard.Folders.Documents.path], {acronym: this.acronym});
    } else {
      this._routeService.go([AppRoutes.Dashboard.Folders.path]);
    }
  }

  public isEdit(): boolean {
    return !!this.documentId;
  }

  submit(): void {
    this.submittingFormLoading = true;
    if (this.isEdit()) {
      this._documentService.editInfo(this.getValue('id'), {
        title: this.getValue('title'),
        description: this.getValue('description')
      }).subscribe({
        next: () => {
          this._alertService.successToast('Documento editado com sucesso!');
          this.handleGoBack();
        }, error: ({error}: HttpErrorResponse) => {
          this._alertService.errorToast(!!error ? error : 'Erro ao editar documento');
          this.submittingFormLoading = false;
        }
      });
    } else {
      this._documentService.save({
        ...this.form.value,
        acronym: !!this.acronym ? this.acronym : this.getValue('acronym')
      })
        .subscribe({
          next: () => {
            this._alertService.successToast('Documento criado com sucesso!');
            this.handleGoBack();
          }, error: ({error}: HttpErrorResponse) => {
            this._alertService.errorToast(!!error ? error : 'Erro ao criar documento');
            this.submittingFormLoading = false;
          }
        });
    }
  }
}
