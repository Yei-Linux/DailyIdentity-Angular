import { SharedModule } from "src/app/shared/share.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IdentityRoutingModule } from "./daily-identity-routing.module";
import { NgModule } from "@angular/core";
import { ClientsSettingsComponent } from './pages/clients/clients-settings/clients-settings.component';
import { IdentityLayoutComponent } from './layout/identity.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { ClientService } from './services/client.service';
import { ClientModalComponent } from './components/client-table/client-modal/client-modal.component';
import { TokenSignatureComponent } from './pages/token/token-signature/token-signature.component';
import { SignatureGeneratorComponent } from './components/token/signature-generator/signature-generator.component';
import { ClientAdditionalComponent } from './components/client-table/drawer-additional-information/client-additional/client-additional.component';
import { AdditionalInformationModalComponent } from './components/client-table/drawer-additional-information/client-additional/additional-information-modal/additional-information-modal.component';
import { DrawerAdditionalInformationComponent } from './components/client-table/drawer-additional-information/drawer-additional-information.component';
import { TokenAdditionalInformationComponent } from './pages/token/token-additional-information/token-additional-information.component';
import { AdditionalInformationComponent } from './components/token/additional-information/additional-information.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const DAILY_IDENTITY__PAGES = [IdentityLayoutComponent,ClientsSettingsComponent,TokenSignatureComponent,TokenAdditionalInformationComponent,DrawerAdditionalInformationComponent,UsersComponent];

const DAILY_IDENTITY__COMPONENTS = [ClientTableComponent,ClientModalComponent,SignatureGeneratorComponent,ClientAdditionalComponent,AdditionalInformationModalComponent,AdditionalInformationComponent,UsersTableComponent];

const DAILY_IDENTITY__SERVICES= [ClientService];

const DAILY_IDENTITY__ENTRY_COMPONENTS = [ClientModalComponent,AdditionalInformationModalComponent]

@NgModule({
  declarations: [...DAILY_IDENTITY__PAGES, ...DAILY_IDENTITY__COMPONENTS],
  imports: [
    SharedModule,
    IdentityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  exports: [...DAILY_IDENTITY__COMPONENTS],
  entryComponents: [...DAILY_IDENTITY__ENTRY_COMPONENTS],
  providers: [...DAILY_IDENTITY__SERVICES]
})
export class IdentityModule {}
