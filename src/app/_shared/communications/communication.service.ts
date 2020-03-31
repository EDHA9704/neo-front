import { Injectable, Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  @Output() fundacionSelec: EventEmitter<any> = new EventEmitter();
  @Output() reload: EventEmitter<any> = new EventEmitter();
  constructor() { }

  perfilFundacionSelec(fundacion) {
    this.fundacionSelec.emit(fundacion);
  }
  reloadData(){
    this.reload.emit(true)
  }

}
