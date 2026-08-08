import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiredInventory'
})
export class ExpiredInventoriesPipe implements PipeTransform {

  transform(expiredDate: string): string {
    const expiry = new Date(expiredDate).getTime();
    const now = Date.now();
    const diffDays = (expiry - now) / (1000 * 60 * 60 * 24); 

    if (diffDays < 0) {
      return "Expired";
    } else if (diffDays <= 3) {
      return "Within 3 Days";
    } else {
      return "Not Expired";
    }
  }
}
