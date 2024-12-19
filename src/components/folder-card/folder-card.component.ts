import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {UserDetailsComponent} from "../dialogs/user-details/user-details.component";
import {AlertService} from "../../services/alert.service";
import {RouteService} from "../../services/route.service";
import {NgxMaskPipe} from "ngx-mask";
import {IDocument} from "../../interfaces/document.interface";
import {IAcronymGroup} from "../../interfaces/acronym-group.interface";

@Component({
  selector: 'app-folder-card',
  standalone: true,
  imports: [
    NgClass,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgxMaskPipe,
    NgbTooltip
  ],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss'
})
export class FolderCardComponent {
  @Input() folder!: IAcronymGroup;

  constructor(
    private _modalService: NgbModal,
    private _alertService: AlertService,
    private _routeService: RouteService
  ) {}

  // public openUserDetailsDialog() {
  //   const modalRef = this._modalService.open(UserDetailsComponent, {size: 'md', centered: true});
  //
  //   modalRef.componentInstance.user = this.user;
  //
  //   modalRef.result.finally(() => {});
  // }

  public openConfirmRemove() {
    // this._alertService.confirm('Remover usuário', `Tem certeza que deseja remover o usuário "${this.user.firstName}"? Essa ação é irreversível.`, (response: boolean) => {
    //   if (response) {
    //     this._apiService.deleteByDocument(this.user.document)
    //       .then(() => {
    //         this.userToRemove.emit(this.user);
    //         this._alertService.successToast(`${this.user.firstName} removido com sucesso!`);
    //       }).catch(() => this._alertService.errorToast(`Erro ao deletar ${this.user.firstName}`));
    //   }
    // });
  }

  public gotoEditUser() {
    // this._routeService.go([AppRoutes.Dashboard.Documents.Edit.path], {document: this.user.document});
  }

  public get userTooltipMessage(): string {
    return 'Totalmente Apto'
  }
}
