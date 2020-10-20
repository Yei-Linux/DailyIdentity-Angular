import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IdentityLayoutComponent } from './layout/identity.component';
import { ClientsSettingsComponent } from './pages/clients/clients-settings/clients-settings.component';
import { TokenSignatureComponent } from './pages/token/token-signature/token-signature.component';
import { TokenAdditionalInformationComponent } from './pages/token/token-additional-information/token-additional-information.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
    {
      path: '',
      component: IdentityLayoutComponent,
      children: [
        {
          path: 'clients/settings',
          component: ClientsSettingsComponent,
        },
        {
          path: 'token/signature',
          component: TokenSignatureComponent
        },
        {
          path: 'token/additional-information',
          component: TokenAdditionalInformationComponent
        },
        {
          path: 'users/team',
          component: UsersComponent
        }
      ]
    },
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class IdentityRoutingModule {}