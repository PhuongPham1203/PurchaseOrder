import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public age = 18;

  public tangtuoi() {
    this.age+=1;
    
  }

}
