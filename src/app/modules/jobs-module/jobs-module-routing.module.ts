import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'jobs-list',
    pathMatch:'full'
  },
  {
    path:'jobs-list',
    component:JobsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsModuleRoutingModule { }
