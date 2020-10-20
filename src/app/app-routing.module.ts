import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent as LayoutLoginComponent } from "./layouts/login/login.component";
import { LoginComponent } from "./core/pages/user/login/login.component";
import { SharedModule } from "./shared/share.module";
import { MainComponent as MainComponentOfApplication } from "./layouts/main/main.component";
import { CoreModule } from "./core/core.module";
import { SignupComponent } from './core/pages/user/signup/signup.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardGuard } from './core/guards/dashboard.guard';

const COMPONENTS = [LayoutLoginComponent, MainComponentOfApplication];

const routes: Routes = [
  {
    path: "user",
    component: LayoutLoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "signin", component: LoginComponent, data: { title: "Login" } },
      { path: "signup", component: SignupComponent, data: { title: "SingUp" } }
    ]
  },
  {
    path: "public",
    loadChildren: () =>
      import("src/app/modules/dailyPublic/daily-public.module").then(
        m => m.PublicModule
      )
  },
  {
    path: "",
    component: MainComponentOfApplication,
    canActivate: [DashboardGuard],
    children: [
      {
        path: "identity",
        loadChildren: () =>
          import("src/app/modules/dailyIdentity/daily-identity.module").then(
            m => m.IdentityModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  declarations: [...COMPONENTS],
  exports: [RouterModule]
})
export class AppRoutingModule {}
