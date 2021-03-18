import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  @Input() description: string;
  @Input() authenticationStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {
    localStorage.getItem('userId') !== null
      ? (this.authenticationStatus = true)
      : false;
  }
}
