import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { selectUserById } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
})
export class UserLogsComponent {

  user!: User ; // Assuming User is the interface/type for your user data

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

}





