import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 apiUrl = 'https://api.codenation.dev/v1/challenge/dev-ps';
 myToken = 'f1d8519ae4b84d2799027e17d9034d39ac89e11e';

 // Http Options
httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/x-www-form-urlencoded'
  })
  }
  constructor(private http: HttpClient) { }

  public pergunta():Observable<any>{
    return this.http.get(`${this.apiUrl}/generate-data?token=${this.myToken}`)
    .pipe();
  }

  public resposta(file): Observable<any>{
    var formData = new FormData();
    formData.append('answer',file, file.name);
    return this.http.post(`${this.apiUrl}/submit-solution?token=${this.myToken}`
    ,formData);
  }
  
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
    }
}
