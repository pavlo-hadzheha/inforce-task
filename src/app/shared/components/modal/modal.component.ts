import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id!: string;
  @Output('opened') opened = new EventEmitter<boolean>();
  element!: HTMLElement;
  private onEscapeBound!: any;

  constructor(
    private modalService: ModalService,
    private modal: ElementRef
  ) {
    this.element = modal.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }
    document.body.append(this.element);
    this.element.addEventListener('click', (event) => {
      let trg = event.target as HTMLElement;
      if (trg.matches('.ss-modal')) {
        this.close();
      }
    });
    
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add("ss-modal-open");
    this.onEscapeBound = this.onEscape.bind(this);
    document.addEventListener('keydown', this.onEscapeBound);
    this.opened.next(true);
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('ss-modal-open');
    document.removeEventListener('keydown', this.onEscapeBound);
    this.opened.next(false);
  }

  onEscape(event: KeyboardEvent): void {
      if(event.key === "Escape") {
        this.close();
      }
  }

  onKeydown(event: Event) {
    this.close();
  }

}
