import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from '../../model/Articulo.model';
import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-catalogo-articulo',
  templateUrl: './catalogo-articulo.component.html',
  styleUrls: ['./catalogo-articulo.component.css']
})
export class CatalogoArticuloComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Articulos';
  lstArticulos: Articulo[] = [];

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  constructor(private articuloServicio: ArticuloService,
              private router: Router) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  listarArticulos() {
    this.loading = true;
    this.articuloServicio.listarArticulos('')
      .subscribe(response => {
        this.lstArticulos = response as Articulo[];
        console.log(this.lstArticulos);
        this.loading = false;
      });
  }
  onTableDataChange(event) {
    this.page = event;
    this.lstArticulos;
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.lstArticulos;
  }

  registrararticulos() {
this.router.navigate(['inventario/creararticulo']);
  }
}
