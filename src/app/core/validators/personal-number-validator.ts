import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../store/selectors/users.selectors';

@Injectable({ providedIn: 'root' })
export class PersonalNumberValidatorService {
  constructor(private store: Store) {}

  uniquePersonalNumberValidator(currentPersonalNumber: string | undefined): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const personalNumber = control.value;

      if (personalNumber === currentPersonalNumber) {
        return of(null);
      }

      return this.store.select(selectUsers).pipe(
        switchMap(users =>
          this.checkPersonalNumberUniqueness(personalNumber, users)
        ),
        first(),
        catchError(() => of(null))
      )
      ;
    };
  }

  private checkPersonalNumberUniqueness(personalNumber: string, users: any[]): Observable<ValidationErrors | null> {
    const userWithSamePersonalNumber = users.find(user => user.personalNumber === personalNumber);
    if (userWithSamePersonalNumber) {
      return of({ userExists: true });
    }
    return of(null);
  }
}