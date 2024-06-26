import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryModalComponent } from './pages/categories/category-modal/category-modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductModalComponent } from './pages/products/product-modal/product-modal.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'create',
        component: ProductModalComponent
      },
      {
        path: 'update/:id',
        component: ProductModalComponent
      }
    ]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      {
        path: 'create',
        component: CategoryModalComponent
      },
      {
        path: 'update/:id',
        component: CategoryModalComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
