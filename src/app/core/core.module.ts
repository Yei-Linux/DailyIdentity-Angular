import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/share.module';
import { MenuComponent } from './components/menu/menu.component'
import { LoginComponent } from './pages/user/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './pages/user/signup/signup.component';
const COMPONENTS = [LoginComponent,SignupComponent,MenuComponent,HeaderComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS]
})
export class CoreModule {}
