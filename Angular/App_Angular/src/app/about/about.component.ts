import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private common: CommonService,
    private serverHttpService: ServerHttpService) {
    //this.age = common.age;
  }

  ngOnInit(): void {
    
    this.getDisplayPost();

  }

  public age;
  public name;
  public posts;

  public datajson;

  public tangtuoi() {
    //this.common.age += 1;
    //this.age = this.common.age;
  }

  public addPost() {
    const newData = { title: "testing", author: "author Testing" };

  }

  public getDisplayPost() {
    
  }


}
