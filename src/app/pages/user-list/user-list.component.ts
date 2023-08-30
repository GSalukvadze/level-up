import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user.interface';
import { DeleteUser, GetUsers } from 'src/app/store/actions/users.actions';
import { selectUsers } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {

  users$ = this.store.select(selectUsers)
  selectedLanguage = localStorage.getItem('CurLang') || 'ka'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService
  ) {
    translate.setDefaultLang(this.selectedLanguage);
  }
  ngOnInit(): void {
    this.store.dispatch(GetUsers());
  }
 
  updateUser(userId: number) {
    this.router.navigate([`edit/${userId}`], {relativeTo: this.route});
  }

  addUser() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  deleteUser(event: any, userId: number) {
    event.stopPropagation()
    this.store.dispatch(DeleteUser({ userId }));
  }

  changeLanguage() {
    const newLanguage = localStorage.getItem('CurLang') === 'ka' ? 'en' : 'ka';
    localStorage.setItem('CurLang', newLanguage);
    this.translate.use(newLanguage);
  }
}
