import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading } from './store/selectors/users.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'User Managment';
  isLoading$ = this.store.select(selectLoading)

  constructor(private store: Store) {}
}
