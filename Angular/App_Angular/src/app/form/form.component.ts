import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  public username = "";
  public password = "";
  public vehicles = ['toyota', 'bmw', 'audi'];
  private selectVehicle = '';

  public onChangeVehicle(event){
    this.selectVehicle = event.target.value;
  }

  public onSubmit(){
    console.log("onSubmit");
    console.log("username: "+this.username);
    console.log("password: "+this.password);
    console.log("selectVehicle: "+this.selectVehicle);
  }
}
