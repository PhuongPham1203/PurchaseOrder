import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private common: CommonService) { 
    this.age = common.age;
  }

  ngOnInit(): void {
  }

  public name = "Pham";
  public age = 15;

  public vehicles = ['toyota', 'bmw', 'audi'];

  public tangtuoi() {
    this.common.age+=1;
    this.age = this.common.age;
  }


}
