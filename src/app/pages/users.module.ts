import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UserComponent } from './user/user.component';
import { HoverHighlightDirective } from '../shared/directives/highlight.directive';
import { UserResolver } from '../core/resolver/user-resolver';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [
      {
        path: 'add',
        component: UserComponent
      },
      {
        path: 'edit/:id',
        component: UserComponent,
      },
      {
        path: 'logs/:id',
        outlet: 'logInfo',
        resolve: {user: UserResolver},
        component: UserLogsComponent
      }
    ]
  },

];

@NgModule({
  declarations: [UserListComponent, UserComponent, UserLogsComponent, HoverHighlightDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    RouterModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
})
export class UsersModule { }
