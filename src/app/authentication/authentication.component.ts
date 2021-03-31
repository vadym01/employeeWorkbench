import { Component, OnInit } from '@angular/core';

import { User } from '../services/model/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from '../services/user-data/user-data.service';
import { ErrorReport } from '../services/model/error.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  id: number;
  isAuthenticated: boolean;
  error: ErrorReport;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.id = +localStorage.getItem('userId');
    this.userDataService.executeUserListService().subscribe(
      (data) => {
        this.users = data;
        const currentIndex = this.users.findIndex(
          (data) => data.id === this.id
        );
        this.currentUser = this.users[currentIndex];
      },
      (error) => {
        this.error = error.error;
        // console.error(error);
      }
    );
  }

  setCurrentUser(id: number) {
    this.isAuthenticated = true;
    localStorage.setItem('userId', String(id));
    this.id = id;
    const currentIndex = this.users.findIndex((data) => data.id === id);
    this.currentUser = this.users[currentIndex];
  }

  onLogOutCLickHandler() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('userId');
  }
}
