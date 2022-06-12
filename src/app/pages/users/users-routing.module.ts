import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { TokenlistComponent } from './tokenlist/tokenlist.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UsersListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'tokens',
        component: TokenlistComponent,
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
