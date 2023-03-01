import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toAge'
})
export class ToAgePipe implements PipeTransform {
  transform(value: string): number {
    let currentYear:number=new Date().getFullYear();
    let date = new Date(value).getFullYear()  
    return (currentYear - date)
  }
}
