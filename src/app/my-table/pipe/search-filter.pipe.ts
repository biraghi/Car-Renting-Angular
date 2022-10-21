import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], key:string|null|undefined, search:string|null|undefined): any[] {
    if(!value){
      return value;
    }
    if(!search){
      return value;
    }
    if(!key){
      return value;
    }
    else{
      let valueFinal = [];
      search = search.toLocaleLowerCase();
      valueFinal = value.filter(obj=>obj[key].toLocaleLowerCase().includes(search))
      return valueFinal;
    }

  }

}
