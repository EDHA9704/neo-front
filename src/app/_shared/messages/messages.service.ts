import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastr: ToastrService) { }
  showSuccess(title,text) {
    this.toastr.success(title, text, {
      timeOut: 3000
    });
  }
  showError(title,text) {
    this.toastr.error(title, text, {
      timeOut: 3000
    });
  }
  showInfo(title,text) {
    this.toastr.info(title, text, {
      timeOut: 2000
    });
  }
}
