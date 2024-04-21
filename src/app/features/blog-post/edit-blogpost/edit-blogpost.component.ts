import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../Models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/Models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  routeSubscription?: Subscription;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[]
  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        if (this.id) {
          this.blogPostService.getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategories = response.categories.map(x => x.id);
              }
            });
        }
      }
    });
  }

  onSubmitForm(): void {

  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
  }

}
