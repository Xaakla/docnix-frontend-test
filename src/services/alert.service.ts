import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

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
