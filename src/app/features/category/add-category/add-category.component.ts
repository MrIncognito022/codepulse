
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../Models/add-category-request.models';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;
  constructor(private categoryservice: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    }
  }
  onFormSubmit() {
    this.addCategorySubscription = this.categoryservice.addCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log("Success");
        },
        error: (error) => {
          console.log("error");
        }
      }
      );
  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
