import { NgModule } from '@angular/core'
import { LoginComponent as LayoutLoginComponent} from './Login/login.component';
import { MainComponent as MainComponentOfApplication} from './main/main.component'

const COMPONENTS = [LayoutLoginComponent,MainComponentOfApplication]

@NgModule({
  imports: [],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
