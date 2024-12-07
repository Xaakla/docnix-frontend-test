import {Directive} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

import $ from 'jquery';

@Directive()
export abstract class FormReactiveBase {

  form!: FormGroup;
  submitted: boolean = false;

  protected constructor() {
  }

  abstract submit(): void;

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.submit();
    } else {
      this.markAllFormFieldsAsTouched(this.form);
      // go element with error
      this.goToAnchorWithError();
    }
  }

  markAllFormFieldsAsTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup['controls']).forEach(field => {
      const control = formGroup.get(field) as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllFormFieldsAsTouched(control);
      }
    });
  }

  goToAnchorWithError(): void {
    // go element with error
    setTimeout(() => {
      const diff = 200;

      const elementTarget = $('.ng-invalid:not(form):first');
      if (elementTarget.length > 0) {
        $('html, body').animate({
          // @ts-ignore
          scrollTop: (elementTarget.first().offset().top - diff)
        }, 500);
      }
    });
  }

  isValid(name: string, showIcon: boolean = true, showIfValid: boolean = false): {
    'is-invalid': boolean,
    'is-valid': boolean,
    'without-icon': boolean
  } {
    const el = this.form.get(name) as AbstractControl;
    const invalid = (!el.valid && (el.touched || el.dirty) && el.status === 'INVALID');
    return {
      'is-invalid': invalid,
      'is-valid': (showIfValid && el.valid),
      'without-icon': !showIcon
    };
  }

  getFormArray(formArrayName: string): FormArray {
    return this.form.get(formArrayName) as FormArray;
  }

  get(field: string): AbstractControl {
    return this.form.get(field) as AbstractControl;
  }

  getValue(field: string): any {
    return (this.form.get(field) as AbstractControl).value;
  }
}

