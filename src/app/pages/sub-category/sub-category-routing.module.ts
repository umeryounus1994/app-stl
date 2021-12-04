import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SubCategoryListComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
