import {Component} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './create-user-modal.html',
  styleUrl: './create-user-modal.scss'
})
export class CreateUserModal {
  visible: boolean = false;
  enteredUsername: string = '';
  enteredPassword: string = '';
  enteredEmail: string = '';

  enteredUsernameChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredUsername = input.value
  }

  enteredPasswordChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredPassword = input.value
  }

  enteredEmailChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredEmail = input.value
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.enteredUsername = '';
    this.enteredPassword = '';
    this.enteredEmail = '';
    this.visible = false
  }

  submitHandler() {
    const newUser = {
      username: this.enteredUsername,
      password: this.enteredPassword,
      email: this.enteredEmail
    };

    this.enteredUsername = '';
    this.enteredPassword = '';
    this.enteredEmail = '';
    this.visible = false;
  }

}
