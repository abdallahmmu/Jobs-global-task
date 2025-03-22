import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'jobs',
    loadChildren: ()=>import('./modules/jobs-module/jobs-module.module').then(m => m.JobsModuleModule)
  },
  {
    path:'auth',
    loadChildren: ()=>import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate:[authGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
