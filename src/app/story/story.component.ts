import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data/product-data.service';
import { ProductToProceed } from '../services/model/product-to-proceed.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  constructor(private productDataService: ProductDataService) {}

  productHistoryOfEmployee: ProductToProceed[];
  ngOnInit(): void {
    const userId = +localStorage.getItem('userId');
    this.productDataService.getProductHistoryByUserId(userId).subscribe(
      (data) => {
        this.productHistoryOfEmployee = data;
        console.log(data);
      },
      (error) => {
        // console.log(error);
        return error;
      }
    );
  }
}
