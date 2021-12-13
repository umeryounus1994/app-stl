import { Routes, RouterModule } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'category',
    loadChildren: './pages/category/category.module#CategoryModule'
  },
  {
    path: 'variation',
    loadChildren: './pages/variation/variation.module#VariationModule'
  },
  {
    path: 'sub_category',
    loadChildren: './pages/sub-category/sub-category.module#SubCategoryModule'
  },
  {
    path: 'products',
    loadChildren: './pages/item/item.module#ItemModule'
  },
  {
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuModule'
  },

];
