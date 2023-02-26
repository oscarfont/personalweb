import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  baseURL: string = `${environment.backendHost}`;

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
    const numDays = (diff / (60 * 60 * 24 * 1000));

    // compute output string
    let outString = '';
    if (numDays < 1) {
      outString = 'today'
    } else if (numDays >= 1 && numDays < 30) {
      outString = `${Math.round(numDays)} day${numDays > 1 ? 's' : ''} ago`;
    }
    else if (numDays < 365) {
      const numMonths = Math.round(numDays / 30);
      outString = `${numMonths} month${numMonths > 1 ? 's' : ''} ago`;
    } else {
      const numYears = Math.round(numDays / 365);
      outString = `${numYears} year${numYears > 1 ? 's' : ''} ago`;
    }

    return outString;
  }

  dateString(date: number) {
    const dateObj = new Date();
    dateObj.setTime(date);
    return dateObj.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
  }

}
