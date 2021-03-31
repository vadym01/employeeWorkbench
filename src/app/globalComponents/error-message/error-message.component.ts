import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'protractor';
import { ErrorReport } from 'src/app/services/model/error.model';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() technicalError: ErrorReport;
  @Input() customErrorMessage: string;
  displayTechnicalError: boolean = false;
  hideErrorsComponent: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.technicalError);
    setTimeout(() => (this.hideErrorsComponent = true), 7500);
  }

  onChangeDisplayStatusClickHandler() {
    this.displayTechnicalError = !this.displayTechnicalError;
    console.log(this.displayTechnicalError);
  }
}
