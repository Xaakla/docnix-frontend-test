import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  info(code: string, parameters: object = {}, description: string = '') {
    this._open('info', code, description);
  }

  confirm(title: string = '', description: string = '', callback: Function) {
    this._confirm(title, description, callback);
  }

  private _open(
    icon: SweetAlertIcon = 'success',
    title: string = 'title',
    description: string = ''
  ): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: description,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success mt-2'
      }
    });
  }

  private _confirm(
    title: string = 'title text here?',
    description: string = 'Lorem ipsum dolor sit amet',
    callback: Function
  ): void {
    Swal.fire({
      icon: 'question',
      html: description,
      title: title,
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success mt-2',
        cancelButton: 'btn btn-danger ms-2 mt-2'
      }
    }).then((result) => {
      callback(!!result.value);
    });
  }

  warningToast(code: string, parameters: object = {}, description: string = ''): void {
    this.toast('warning', code, description);
  }

  successToast(code: string, parameters: object = {}, description: string = ''): void {
    this.toast('success', code, description);
  }

  errorToast(code: string, parameters: object = {}, description: string = ''): void {
    this.toast('error', code, description);
  }

  private toast(icon: SweetAlertIcon = 'success',
                title: string = 'title',
                description: string = '',
                timer = 5000): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: timer,
      timerProgressBar: true,
      icon: icon,
      title: title,
      text: description
    });
  }
}
