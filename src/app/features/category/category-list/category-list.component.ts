import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { Category } from '../Models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories?: Category[];
  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
        }
      });
  }
}
