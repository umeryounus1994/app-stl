import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { ListMenuComponent } from './list-menu/list-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListMenuComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
