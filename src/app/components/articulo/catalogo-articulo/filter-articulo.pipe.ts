import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArticulo'
})
export class FilterArticuloPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
