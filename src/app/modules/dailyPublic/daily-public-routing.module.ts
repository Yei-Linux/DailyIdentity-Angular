import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public.component';
import { NgModule } from '@angular/core';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

const routes: Routes = [
    {
      path: '',
      component: PublicLayoutComponent,
      children: [
        {
            path: 'reset/:clientId/password',
            component: ResetPasswordPageComponent,
        }
      ]
    },
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PublicRoutingModule {}