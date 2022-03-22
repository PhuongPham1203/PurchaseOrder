import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private common: CommonService) { 
    this.age = common.age;
  }

  ngOnInit(): void {
  }

  public age = 18;

  public tangtuoi() {
    this.common.age+=1;
    this.age = this.common.age;
    
  }


}
