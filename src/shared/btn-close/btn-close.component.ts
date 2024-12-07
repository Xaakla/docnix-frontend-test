import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-btn-close',
  templateUrl: './btn-close.component.html',
  standalone: true,
  styleUrls: ['./btn-close.component.scss']
})
export class BtnCloseComponent {

  @Input()
  public fontSize: number = 14;

  @Input()
  public color: 'red' | 'black' | 'white' = 'red';

  constructor(private _ngbActiveModal: NgbActiveModal) {
  }

  public onClose(): void {
    this._ngbActiveModal.dismiss(false);
  }
}
