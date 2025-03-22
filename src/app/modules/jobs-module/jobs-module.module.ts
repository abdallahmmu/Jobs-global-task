import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsModuleRoutingModule } from './jobs-module-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from '../../shared/show-error/show-error.component';
import { NumberOnlyDirective } from '../../shared/directives/number-only.directive';
import { SeeMoreDirective } from '../../shared/directives/see-more.directive';
import { DateAgoPipe } from '../../shared/pipes/date-ago.pipe';

@NgModule({
  declarations: [
    JobsListComponent,
  ],
  imports: [
    CommonModule,
    JobsModuleRoutingModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    ShowErrorComponent,
    NumberOnlyDirective,
    SeeMoreDirective,
    DateAgoPipe,
    FormsModule
  ]
})
export class JobsModuleModule { }
