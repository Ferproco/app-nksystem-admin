import { FormaPagoService } from './../../formapago/FormaPagoService.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-eliminar',
  templateUrl: './mensaje-eliminar.component.html',
  styleUrls: ['./mensaje-eliminar.component.css']
})
export class MensajeEliminarComponent implements OnInit {

  constructor(private formapagoservice: FormaPagoService) { }


  ngOnInit(): any {

  }

  aceptar(){
    this.formapagoservice.Eliminar.emit(true);
  }

}
