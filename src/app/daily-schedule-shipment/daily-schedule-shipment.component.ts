import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data/product-data.service';
import { DatePipe } from '@angular/common';
import { ProductToProceed } from '../services/model/product-to-proceed.model';
import { error } from 'protractor';

@Component({
  selector: 'app-daily-schedule-shipment',
  templateUrl: './daily-schedule-shipment.component.html',
  styleUrls: ['./daily-schedule-shipment.component.css'],
  providers: [DatePipe],
})
export class DailyScheduleShipmentComponent implements OnInit {
  date = new Date();
  todayDate: string;
  productsToProceed: ProductToProceed[];
  productToProceed: ProductToProceed;
  isAuthenticated: boolean = false;

  constructor(
    private productDataService: ProductDataService,
    private datePipe: DatePipe
  ) {
    this.todayDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    localStorage.getItem('userId') !== null
      ? (this.isAuthenticated = true)
      : false;
    const currentInvForShipment = +localStorage.getItem(
      'currentInvForShipment'
    );
    this.productDataService
      .getProductListByDate(this.todayDate, true)
      .subscribe(
        (data) => {
          if (currentInvForShipment) {
            this.productToProceed = data.filter(
              (inv) => inv.invnumber === currentInvForShipment
            )[0];
            const indexForFilter = data.findIndex(
              (invInst) => invInst.invnumber === currentInvForShipment
            );
            this.productsToProceed = data.splice(indexForFilter, 1);
          } else {
            this.productsToProceed = data;
          }
          // this.productsToProceed = data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setProductForShipmentProcess(currentInv: number, index: number) {
    const currentUser = +localStorage.getItem('userId');
    const currentProductForShipment: ProductToProceed = this.productsToProceed.filter(
      (inv) => inv.invnumber === currentInv
    )[0];
    this.productDataService.updateProductForShipmentProcess(
      currentUser,
      currentInv
    );
    this.productToProceed = currentProductForShipment;
    localStorage.setItem('currentInvForShipment', String(currentInv));
    this.productsToProceed.splice(index, 1);
  }

  finishShipmentProcess(inv: number) {
    this.productDataService.updateTheConfirmationOfShipmentProcess(inv, false);
    localStorage.removeItem('currentInvForShipment');
    this.productToProceed = null;
  }
}
