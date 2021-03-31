import { Component, OnInit } from '@angular/core';
import { Product } from '../services/model/product.model';
import { ProductDataService } from '../services/product-data/product-data.service';
import { ProductToProceed } from '../services/model/product-to-proceed.model';
import { ProductLoadedByEmployeeInfo } from '../services/model/product-loaded-by-employee-info';
import { ErrorReport } from '../services/model/error.model';

@Component({
  selector: 'app-daily-schedule-receiving',
  templateUrl: './daily-schedule-receiving.component.html',
  styleUrls: ['./daily-schedule-receiving.component.css'],
})
export class DailyScheduleReceivingComponent implements OnInit {
  constructor(private productDataService: ProductDataService) {}

  productsToProceed: ProductToProceed[];
  currentProductToProceed: ProductToProceed;
  productLoadedByEmployeeInfo: ProductLoadedByEmployeeInfo;
  isAuthenticated: boolean;
  error: ErrorReport;

  ngOnInit(): void {
    localStorage.getItem('userId') !== null
      ? (this.isAuthenticated = true)
      : false;

    this.productDataService.getProductListToProceed().subscribe((data) => {
      this.productsToProceed = data;
      const currentProductINVNumber = +localStorage.getItem(
        'currentProductToProceedInv'
      );
      if (currentProductINVNumber) {
        this.productDataService
          .getProductByInv(currentProductINVNumber)
          .subscribe(
            (dataByInv) => {
              this.currentProductToProceed = dataByInv;
              console.log(dataByInv);
            },
            (error) => {
              this.error = error.error;
              console.error(error);
            }
          );
      }
    });
  }

  setProductToProceed(index: number) {
    const currentUser = +localStorage.getItem('userId');
    const selectedProduct = this.productsToProceed[index];
    localStorage.setItem(
      'currentProductToProceedInv',
      String(selectedProduct.invnumber)
    );
    this.productLoadedByEmployeeInfo = {
      currentEmployeeId: currentUser,
      productId: selectedProduct.invnumber,
    };
    this.productDataService
      .updateProductLoadedBy(this.productLoadedByEmployeeInfo)
      .subscribe(
        (response) => {},
        (error) => {
          this.error = error.error;
          console.error(error);
        }
      );
    this.currentProductToProceed = selectedProduct;
    this.productsToProceed.splice(index, 1);
  }

  submitProceededProduct(inv: number) {
    this.productDataService.submitProceededProduct(inv).subscribe(
      (response) => {},
      (error) => {
        this.error = error.error;
        console.error(error);
      }
    );
    localStorage.removeItem('currentProductToProceedInv');
    this.currentProductToProceed = null;
  }
}
