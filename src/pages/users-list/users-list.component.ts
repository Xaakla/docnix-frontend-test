import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {IUser} from "../../interfaces/user.interface";
import {AlertService} from "../../services/alert.service";
import {UserCardComponent} from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public users: IUser[] = [];

  constructor(
    private _apiService: ApiService,
    private _alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this._findAll();
  }

  private _findAll(): void {
    this._apiService.findAll()
      .then((users) => this.users = users)
      .catch(() => this._alertService.errorToast('Erro ao buscar usuários!'));
  }

  public removeUser(user: IUser): void {
    this.users = this.users.filter(it => it.document !== user.document);
  }
}
