import { Injectable } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: Array<ModalComponent> = [];

  constructor() { }

  add(modal: ModalComponent): void {
    this.modals.push(modal);
  }

  remove(id: string): void {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string): void {
    const modal = this.modals.find(x => x.id === id);
    modal?.open();
  } 
  close(id: string): void {
    const modal = this.modals.find(x => x.id === id);
    modal?.close();
  }
}
