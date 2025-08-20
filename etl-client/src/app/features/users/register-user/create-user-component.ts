import {Component} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './create-user-component.html',
  styleUrl: './create-user-component.scss'
})
export class CreateUserComponent {
  visible: boolean = false;
  enteredUsername: string = '';
  enteredPassword: string = '';
  enteredEmail: string = '';

  enteredUsernameChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredUsername = input.value
    console.log(this.enteredUsername);
  }

  enteredPasswordChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredPassword = input.value
    console.log(this.enteredPassword);
  }

  enteredEmailChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enteredEmail = input.value
    console.log(this.enteredEmail);
  }


  showDialog() {
    this.visible = true;
  }
}
