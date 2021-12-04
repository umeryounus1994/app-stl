
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ItemListComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
