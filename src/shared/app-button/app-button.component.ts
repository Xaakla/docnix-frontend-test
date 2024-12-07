import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './app-button.component.html',
  imports: [],
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent {
  @Input()
  public label!: string;

  @Input()
  public loadingLabel!: string;

  @Input()
  public type!: string;

  @Input()
  public customClass!: string;

  @Input()
  public loading!: boolean;
}
