import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

// Components
import { ContentComponent } from './layouts/content/content.component';
// Routes
import { content } from './shared/routes/content.routes';
import { AuthGuard } from './guards/auth/auth.guard';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { full } from './shared/routes/full.routes';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/cashier',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: '',
    component: FullWidthComponent,
    children: full
  }
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: NoPreloading, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
