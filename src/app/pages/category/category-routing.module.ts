import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CategoryListComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
