import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  executeUserListService() {
    return this.http.get<User[]>(this.baseUrl + 'employee/available');
  }
}
