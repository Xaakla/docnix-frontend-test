import {Component, Input} from '@angular/core';
import {BtnCloseComponent} from "../../../shared/btn-close/btn-close.component";
import {IUser} from "../../../interfaces/user.interface";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    BtnCloseComponent,
    NgClass
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  @Input() user!: IUser;

  public get userScoreStatus(): string {
    return this.user.score < 500 ? 'Inapto' : (this.user.score >= 500 && this.user.score < 800 ? 'Apto com limitações' : 'Totalmente Apto');
  }

}
