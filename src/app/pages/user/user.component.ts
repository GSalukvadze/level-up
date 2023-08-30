import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PersonalNumberValidatorService } from 'src/app/core/validators/personal-number-validator';
import { User } from 'src/app/shared/models/user.interface';
import { AddUser, UpdateUser } from 'src/app/store/actions/users.actions';
import { selectUserById } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  formGroup!: FormGroup;
  cities = ['tbilisi', 'batumi', 'zugdidi', 'poti'];
  newCustomFieldControl: FormControl = new FormControl('');
  showEmptyCustomFieldError = false
  customFields: any = []
  userId!: number
  user!: User

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private personalNumberValidator: PersonalNumberValidatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userIdFromParam = this.route.snapshot.paramMap.get('id');
    if (userIdFromParam) {
      this.userId = parseInt(userIdFromParam, 10);
      this.store.select(selectUserById(this.userId)).subscribe(user => {
        if (user) {
          this.initForm(user)
          this.user = user
          this.customFields = user.customFields;
        }
      });
    }else {
      this.initForm()
    }
  }

  checkFormControl(controlName: string) {
    const control = this.formGroup.get(controlName);
    return control?.invalid && control?.touched;
  }

  get customFieldsArray() {
    return this.formGroup.get('customFields') as FormArray;
  }

  addCustomField() {
    const newFieldName = this.newCustomFieldControl.value;
    if (!newFieldName) {
      this.showEmptyCustomFieldError = true;
      return;
    }
    const newField = new FormGroup({
      name: new FormControl(newFieldName, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });

    (this.formGroup.get('customFields') as FormArray).push(newField);
    this.showEmptyCustomFieldError = false;
    this.newCustomFieldControl.reset()
  }
  
  removeCustomField(index: number) {
    this.customFieldsArray.removeAt(index);
  }

  initForm(user?: User) {
    this.formGroup = this.formBuilder.group({
      name: [user?.name || null, Validators.required],
      surname: [user?.surname || null, Validators.required],
      personalNumber: [user?.personalNumber || null, {
        validators: [Validators.required, Validators.pattern(/^\d{11}$/)],
        asyncValidators: [this.personalNumberValidator.uniquePersonalNumberValidator(user?.personalNumber)],
        updateOn: 'blur'
      }],
      gender: [user?.gender || null, Validators.required],
      city: [user?.city || null, Validators.required],
      address: [user?.address || null, Validators.required],
      customFields: new FormArray([])
    });
    
    if (user?.customFields) {
      user.customFields.forEach((field: { name: string; value: string }) => {
        const newFieldGroup = this.formBuilder.group({
          name: field.name,
          value: field.value
        });
        this.customFieldsArray.push(newFieldGroup);
      });
    }
  }

  back() {
    this.router.navigate(['/users'])
  }

  addOrUpdateUser() {
    if(!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    const now = new Date();

    const updatedUser: User = {
      ...this.formGroup.value,
      ...(this.userId ? { updatedAt: now, createdAt: this.user.createdAt} : { createdAt: now }),
    };
  
    if (this.userId) {
      this.store.dispatch(UpdateUser({ userId: this.userId, user: updatedUser }));
    } else {
      this.store.dispatch(AddUser({ user: updatedUser }));
    }
    this.back()
  }
}
