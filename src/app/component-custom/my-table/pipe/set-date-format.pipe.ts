import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { MyTableConfig } from '../model/MyTableConfig';

@Pipe({
  name: 'setDateFormat',
})
export class SetDateFormatPipe implements PipeTransform {
  transform(value: any[], tableConfig: MyTableConfig): any[] {
    const datepipe: DatePipe = new DatePipe('en-US');

    value.forEach((item) => {
      tableConfig.headers.forEach((header) => {
        if (typeof item[header.key] == 'string') {
          let date = new Date(item[header.key]);
          if (date.valueOf() >= 0) {
            item[header.key] = datepipe.transform(
              item[header.key],
              'dd-MM-YYYY'
            );
          }
        }
      });
    });
    return value;
  }
}
