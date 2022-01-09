import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { ListTcategoryComponent } from './list-tcategory/list-tcategory.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTcategoryComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationcategoriesRoutingModule { }
