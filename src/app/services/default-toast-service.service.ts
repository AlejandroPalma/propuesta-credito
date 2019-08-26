import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DefaultToastServiceService {

  constructor(
    private toastrService: ToastrService
  ) { }

  public SuccessGuardadoPropuesta() {
     return this.toastrService.success('Se guardo la propuesta exitosamente');
  }


  

}

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

  