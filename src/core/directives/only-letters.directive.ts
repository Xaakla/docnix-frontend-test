import {Directive, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appOnlyLetters]',
  standalone: true
})
export class OnlyLettersDirective {
  private regex: RegExp = /^[a-zA-Z\s]*$/;

  constructor(private control: NgControl) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Remove caracteres não permitidos
    const sanitizedValue = value.split('').filter(char => this.regex.test(char)).join('');

    // Atualiza o valor do campo se necessário
    if (value !== sanitizedValue) {
      this.control.control?.setValue(sanitizedValue);
    }
  }
}
