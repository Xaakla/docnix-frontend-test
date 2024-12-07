import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'field-error-message',
  standalone: true,
  templateUrl: './field-error-message.component.html'
})
export class FieldErrorMessageComponent {

  @Input() control!: AbstractControl;
  @Input() message = 'message error default';
  @Input() params = {};
  @Input() type = 'required';
  @Input() boxAlert = false;

  @HostBinding('class') get valid() {
    // @ts-ignore
    if (this.control && this.control.errors && this.control.hasError(this.type) && this.control.touched) {
      if (this.boxAlert) {
        return 'invalid-feedback alert alert-danger fade show';
      } else {
        return 'invalid-feedback';
      }
    }

    return '';
  }
}
