import {Component, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {TableModule, Table} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {TableColumn, User} from './models/user.model';
import {mockUsers} from './__mock__/mock-users';
import {CreateUserModalComponent} from './create-user-modal/create-user-modal-component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, CommonModule, CreateUserModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {
  private _users: User[] = mockUsers;

  columns: TableColumn<User>[] = [
    {key: 'id', label: 'ID'},
    {key: 'username', label: 'Username'},
    {key: 'email', label: 'Email'},
    {key: 'role', label: 'Role'}
  ];

  public _enteredSearch = '';
  private search$ = new Subject<string>();
  private sub = new Subscription();

  @ViewChild('dt') dt?: Table;

  ngOnInit() {
    this.sub.add(
      this.search$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(q => {
        this._enteredSearch = q.trim();
      })
    );
  }

  get users(): User[] {
    const searchQuery = this._enteredSearch.trim().toLowerCase();
    if (!searchQuery) return this._users;
    return this._users.filter(user => user.username.toLowerCase().includes(searchQuery));
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search$.next(input.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
