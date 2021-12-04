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
    path: 'sub_category',
    loadChildren: './pages/sub-category/sub-category.module#SubCategoryModule'
  },
  {
    path: 'item',
    loadChildren: './pages/item/item.module#ItemModule'
  },

];
