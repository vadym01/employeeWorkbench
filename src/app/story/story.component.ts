import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data/product-data.service';
import { ProductToProceed } from '../services/model/product-to-proceed.model';
import { ErrorReport } from '../services/model/error.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  productHistoryOfEmployee: ProductToProceed[];
  error: ErrorReport;
  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
    const userId = +localStorage.getItem('userId');
    this.productDataService.getProductHistoryByUserId(userId).subscribe(
      (data) => {
        this.productHistoryOfEmployee = data;
      },
      (error) => {
        this.error = error.error;
        return error;
      }
    );
  }
}
