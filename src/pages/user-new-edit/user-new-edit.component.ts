import {Component, OnInit} from '@angular/core';
import {FormReactiveBase} from "../../shared/base-form/form-reactive-base";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {FieldErrorMessageComponent} from "../../shared/field-error-message/field-error-message.component";
import {AppButtonComponent} from "../../shared/app-button/app-button.component";
import {ApiService} from "../../services/api.service";
import {IUser} from "../../interfaces/user.interface";
import {RouteService} from "../../services/route.service";
import {AppRoutes} from "../../core/routes.config";
import {FormDebugComponent} from "../../shared/form-debug/form-debug.component";
import {AlertService} from "../../services/alert.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {OnlyLettersDirective} from "../../core/directives/only-letters.directive";
import {NgxMaskDirective} from "ngx-mask";
import {ActivatedRoute} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-new-edit',
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
  templateUrl: './user-new-edit.component.html',
  styleUrl: './user-new-edit.component.scss'
})
export class UserNewEditComponent extends FormReactiveBase implements OnInit {

  public submittingFormLoading = false;
  public document!: string;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _routeService: RouteService,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this._readParams();
    this._createForm();
    this._listenChanges();

    if (this.isEdit()) {
      this._apiService.findByDocument(this.document)
        .then((user) => {
          if (user) {
            this.form.patchValue(user);
            this.get('creditAnalysis').patchValue(true);
            this.get('document').disable();
          }
        }).catch(() => this._alertService.errorToast(`Erro ao buscar usuário com CPF ${document}`));
    }
  }

  private _createForm(): void {
    this.form = this._fb.group({
      document: ['', [Validators.required]],
      firstName: ['', [Validators.required, RxwebValidators.maxLength({value: 16})]],
      lastName: ['', [Validators.required, RxwebValidators.maxLength({value: 40})]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],

      number: ['', Validators.required],
      holderName: ['', [Validators.required, RxwebValidators.maxLength({value: 40})]],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.required],

      creditAnalysis: [false, Validators.required],

      score: [500, [RxwebValidators.numeric(), RxwebValidators.maxNumber({value: 1000})]]
    });
  }

  // Escuta as modificações feitas no formulário
  private _listenChanges(): void {
    // Habilita e desabilita o campo de inserção de score de acordo com o valor do checkbox
    this.get('creditAnalysis').valueChanges
      .subscribe((value: boolean) => {
        this.get('score')[value ? 'enable' : 'disable']();
      });

    this.get('holderName').valueChanges
      .subscribe((value: string) => {
        if (value) {
          this.get('holderName').setValue(value.toUpperCase(), {emitEvent: false});
        }
      });
  }

  // Lê os parametros da url
  private _readParams() {
    this._activatedRoute.params
      .subscribe({
        next: ({document}: any) => this.document = document,
        error: (err) => this._alertService.errorToast(err.message)
      });
  }

  private _generateRandomScore(): number {
    return Math.floor(Math.random() * 1001); // Gera um número entre 0 e 1000
  }

  private _buildUserDto(form: any): IUser {
    return {
      document: form.document,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form?.email,
      phone: form?.phone,
      birthDate: form.birthDate,
      number: form.number,
      holderName: form.holderName,
      expirationDate: form.expirationDate,
      securityCode: form.securityCode,
      score: !!this.getValue('creditAnalysis') ? form.score : this._generateRandomScore(),
    };
  }

  public gotoUsersList() {
    this._routeService.go([AppRoutes.Dashboard.User.List.path]);
  }

  openDatePicker(event: MouseEvent): void {
    const input = event.target as HTMLInputElement;

    // Garante que o `showPicker` só será chamado se disponível
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    }
  }

  public isEdit(): boolean {
    return !!this.document;
  }

  submit(): void {
    const userToSave = this._buildUserDto(this.form.value);
    this.submittingFormLoading = true;

    if (this.isEdit()) {
      this._apiService.updateUserByDocument(this.document, {...userToSave, document: this.document})
        .then(() => {
          this._alertService.successToast('Usuário editado com sucesso!');
          this._routeService.go([AppRoutes.Dashboard.User.List.path]);
        })
        .catch(() => this.submittingFormLoading = false)
        .finally(() => {
        });
    } else {
      this._apiService.addUser(userToSave)
        .then(() => {
          this._alertService.successToast('Usuário salvo com sucesso!');
          this._routeService.go([AppRoutes.Dashboard.User.List.path]);
        })
        .catch(() => this.submittingFormLoading = false)
        .finally(() => {
        });
    }
  }
}
