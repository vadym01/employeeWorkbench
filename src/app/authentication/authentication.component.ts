import { Component, OnInit } from '@angular/core';

import { User } from '../services/model/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from '../services/user-data/user-data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  public id: number;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.id = +localStorage.getItem('userId');
    this.userDataService.executeUserListService().subscribe((data) => {
      this.users = data;
      const currentIndex = this.users.findIndex((data) => data.id === this.id);
      this.currentUser = this.users[currentIndex];
    });
  }

  setCurrentUser(id: number) {
    localStorage.setItem('userId', String(id));
    this.id = id;
    const currentIndex = this.users.findIndex((data) => data.id === id);
    this.currentUser = this.users[currentIndex];
  }
}
