import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  { 
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListModule)
  },
  { 
    path: 'product-detail', 
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule) 
  },
  {
    path: '**',
    redirectTo: 'product-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
