import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  public string2DatetimeFormat(stringDate) {

    var d = new Date(stringDate);

    var dateString =
      ("0" + d.getDate()).slice(-2) + "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
      d.getFullYear() + " " +
      ("0" + d.getHours()).slice(-2) + ":" +
      ("0" + d.getMinutes()).slice(-2) + ":" +
      ("0" + d.getSeconds()).slice(-2);

    return dateString;
  }


  public string2DateFormat(stringDate) {

    var d = new Date(stringDate);
    var dateString =
      ("0" + d.getDate()).slice(-2) + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      d.getFullYear();

    return dateString;
  }

  public timestamp2Datetime(timestamp) {
    var str = timestamp.replace(/\D/g, "");
    var d = new Date(parseInt(str));

    var dateString =
      ("0" + d.getDate()).slice(-2) + "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
      d.getFullYear() + " " +
      ("0" + d.getHours()).slice(-2) + ":" +
      ("0" + d.getMinutes()).slice(-2) + ":" +
      ("0" + d.getSeconds()).slice(-2);

    return dateString;
  }

}
