import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {NgClass} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDetailsComponent} from "../dialogs/user-details/user-details.component";
import {AlertService} from "../../services/alert.service";
import {ApiService} from "../../services/api.service";
import {AppRoutes} from "../../core/routes.config";
import {RouteService} from "../../services/route.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgClass,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Output() userToRemove: EventEmitter<IUser> = new EventEmitter();
  @Input() user!: IUser;

  constructor(
    private _modalService: NgbModal,
    private _alertService: AlertService,
    private _apiService: ApiService,
    private _routeService: RouteService
  ) {}

  public openUserDetailsDialog() {
    const modalRef = this._modalService.open(UserDetailsComponent, {size: 'md', centered: true});

    modalRef.componentInstance.user = this.user;

    modalRef.result.finally(() => {});
  }

  public openConfirmRemove() {
    this._alertService.confirm('Remover usuário', `Tem certeza que deseja remover o usuário "${this.user.firstName}"? Essa ação é irreversível.`, (response: boolean) => {
      if (response) {
        this._apiService.deleteByDocument(this.user.document)
          .then(() => {
            this.userToRemove.emit(this.user);
            this._alertService.successToast(`${this.user.firstName} removido com sucesso!`);
          }).catch(() => this._alertService.errorToast(`Erro ao deletar ${this.user.firstName}`));
      }
    });
  }

  public gotoEditUser() {
    this._routeService.go([AppRoutes.Dashboard.User.Edit.path], {document: this.user.document});
  }
}
