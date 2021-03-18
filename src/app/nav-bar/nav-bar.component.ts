import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../services/model/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userName: string;

  constructor() {}

  ngOnInit(): void {}

  //   authentication() {
  //     this.router.navigate(['/authentication']);
  //   }
}
