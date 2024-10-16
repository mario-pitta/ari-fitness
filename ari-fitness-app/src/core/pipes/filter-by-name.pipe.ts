import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true,
})
export class FilterByNamePipe implements PipeTransform {
  transform(arr: any[], ...args: string[]): any[] {
    const filtered = arr.filter(
      (a) =>
        a.nome
          .normalize('NFD')
          .toLowerCase()
          .indexOf(args[0].normalize('NFD').toLowerCase()) > -1
    );

    return filtered;
  }
}
