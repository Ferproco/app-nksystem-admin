import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCliente'
})
export class FilterClientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultclientes = [];
    try {
      for (const Clientes of value) {
        if (Clientes.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultclientes.push(Clientes);
        }
      }
    }
    catch (err) { }
    return resultclientes;
  }

}
