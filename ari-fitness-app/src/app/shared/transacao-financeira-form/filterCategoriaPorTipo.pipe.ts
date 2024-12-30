import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterCategoriaPorTipo'
})
export class FilterCategoriaPorTipoPipe implements PipeTransform {

  transform(categorias: any[], tipo: string): any[] {
    return categorias.filter(c => c.tipo === tipo);
  }
}
