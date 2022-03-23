import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public name = new FormControl('');
  public profileForm = new FormGroup({
    name : new FormControl(''),
    age : new FormControl(''),
  });

  public changeName(){
    this.name.setValue("Defaul name");
  }

  public onSubmit(){
    console.log("onSubmit");
    console.log(this.profileForm.controls['name'].value +" - "+this.profileForm.controls['age'].value);
  }

}
