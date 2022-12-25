import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  baseURL: string = "http://localhost:3000/";

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, comment: string) {
    const body = { 'from': email, 'subject': subject, 'text': comment };
    return this.http.post<any>(this.baseURL + 'utils/sendMail', body, { headers: this.httpHeader });
  }

  deleteImage(imageId: string) {
    const body = { src: imageId }
    return this.http.post<any>(this.baseURL + 'utils/deleteImage/', body);
  }

  computeNumberOfDaysString(date: number) {
    // compute number of days between date and today
    const today = new Date().getTime();
    const diff = today - date;
    const numDays = (diff / (60 * 60 * 24 * 1000000));
    console.log(numDays);

    // compute output string
    let outString = '';
    if (numDays < 1) {
      outString = 'today'
    } else if (numDays > 1 && numDays < 30) {
      outString = `${Math.round(numDays)} days ago`;
    }
    else if (numDays < 365) {
      const numMonths = Math.round(numDays / 30);
      outString = `${numMonths} months ago`;
    } else {
      const numYears = Math.round(numDays / 365);
      outString = `${numYears} years ago`;
    }

    return outString;
  }

}
