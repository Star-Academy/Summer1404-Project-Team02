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

  showDialog() {
    this.visible = true;
  }
}
