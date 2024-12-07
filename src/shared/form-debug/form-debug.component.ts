import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-form-debug',
  standalone: true,
  imports: [
    NgxJsonViewerModule,
    NgClass
  ],
  templateUrl: './form-debug.component.html'
})
export class FormDebugComponent {

  @Input() form!: FormGroup;
  @Input() simple: boolean = false;
  @Input() expanded: boolean = true;

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control?.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }
}
