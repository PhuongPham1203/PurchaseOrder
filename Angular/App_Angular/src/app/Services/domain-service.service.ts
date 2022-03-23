import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainServiceService {

  constructor() { }

  private urlPO = "http://localhost:4321/";

  public getUrlPO(){
    return this.urlPO;
  }
  
}
