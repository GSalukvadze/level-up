import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.interface';
import { GetUsers } from 'src/app/store/actions/users.actions';
import { selectUserById } from 'src/app/store/selectors/users.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | null> {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | null> {    const idFromParam = route.params['id'];
  const userId = parseInt(idFromParam, 10);

  return this.store.select(selectUserById(userId)).pipe(
    map(user => {
      if (user) {
        return user;
      } else {
        this.router.navigate(['/users']);
        return null;
      }
    }),
    catchError(() => {
      this.router.navigate(['/users']);
      return of(null);
    })
  );
}
}





