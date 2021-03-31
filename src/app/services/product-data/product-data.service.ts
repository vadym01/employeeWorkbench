import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { ProductToProceed } from '../model/product-to-proceed.model';
import { ProductLoadedByEmployeeInfo } from '../model/product-loaded-by-employee-info';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getProductListToProceed() {
    return this.http.get<ProductToProceed[]>(
      this.baseUrl + 'product/to/proceed'
    );
  }

  updateProductLoadedBy(
    productLoadedByEmployeeInfo: ProductLoadedByEmployeeInfo
  ) {
    return this.http.patch(
      this.baseUrl + 'product/update/begin/proceed',
      productLoadedByEmployeeInfo
    );
  }

  getProductByInv(inv: number) {
    return this.http.get<ProductToProceed>(
      this.baseUrl + `product/to/proceed/${inv}`
    );
  }

  submitProceededProduct(invnumber: number) {
    return this.http.put(
      this.baseUrl + `product/submit/proceeded/${invnumber}`,
      null
    );
  }

  getProductHistoryByUserId(userId: number) {
    return this.http.get<ProductToProceed[]>(
      this.baseUrl + `product/history/of/${userId}`
    );
  }

  getProductListByDate(date: string, isPresent: boolean) {
    return this.http.get<ProductToProceed[]>(
      this.baseUrl + `product/history/by/date/${date}/${isPresent}`
    );
  }

  updateProductForShipmentProcess(userId: number, productId: number) {
    return this.http.patch(
      this.baseUrl + `product/update/begin/shipment/${userId}/${productId}`,
      null
    );
  }

  updateTheConfirmationOfShipmentProcess(INVNumber: number, isSent: boolean) {
    return this.http.patch(
      this.baseUrl + `product/update/confirm/shipment/${INVNumber}/${isSent}`,
      null
    );
  }
}
