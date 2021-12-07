import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guards/admin/admin.guard';
import { VariationListComponent } from './variation-list/variation-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: VariationListComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationRoutingModule { }
