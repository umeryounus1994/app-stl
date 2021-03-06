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
  // {
  //   path: 'variation',
  //   loadChildren: './pages/variation/variation.module#VariationModule'
  // },
  {
    path: 'sub_category',
    loadChildren: './pages/sub-category/sub-category.module#SubCategoryModule'
  },
  {
    path: 'products',
    loadChildren: './pages/item/item.module#ItemModule'
  },
  {
    path: 'parts',
    loadChildren: './pages/parts/parts.module#PartsModule'
  },
  {
    path: 'textures',
    loadChildren: './pages/textures/textures.module#TexturesModule'
  },
  {
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuModule'
  },
  {
    path: 'company',
    loadChildren: './pages/company/company.module#CompanyModule'
  },
  {
    path: 'language',
    loadChildren: './pages/language/language.module#LanguageModule'
  },
  {
    path: 'tcategories',
    loadChildren: './pages/translationcategories/translationcategories.module#TranslationcategoriesModule'
  },
  {
    path: 'translation',
    loadChildren: './pages/translation/translation.module#TranslationModule'
  },
  {
    path: 'users',
    loadChildren: './pages/users/users.module#UsersModule'
  },

];
