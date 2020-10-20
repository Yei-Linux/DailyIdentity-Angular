import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './daily-public-routing.module';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PublicLayoutComponent } from './layouts/public.component';

const DAILY_PUBLIC__PAGES = [PublicLayoutComponent,ResetPasswordPageComponent];

const DAILY_PUBLIC__COMPONENTS = [ResetPasswordComponent];

const DAILY_PUBLIC__SERVICES= [];

const DAILY_PUBLIC__ENTRY_COMPONENTS = []

@NgModule({
  declarations: [...DAILY_PUBLIC__PAGES, ...DAILY_PUBLIC__COMPONENTS],
  imports: [
    SharedModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...DAILY_PUBLIC__COMPONENTS],
  entryComponents: [...DAILY_PUBLIC__ENTRY_COMPONENTS],
  providers: [...DAILY_PUBLIC__SERVICES]
})
export class PublicModule {}