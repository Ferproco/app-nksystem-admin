import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-tipo-impuesto-modal',
  templateUrl: './crear-tipo-impuesto-modal.component.html',
  styleUrls: ['./crear-tipo-impuesto-modal.component.css']
})
export class CrearTipoImpuestoModalComponent implements OnInit {

  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }
  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
