import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], page:number, itemPerPage:number): any[] {
    return [...value.slice(itemPerPage*(page), itemPerPage*(page+1))]
  }

}
