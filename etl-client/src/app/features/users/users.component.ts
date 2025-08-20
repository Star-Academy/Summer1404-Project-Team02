import {Component, ViewChild, OnDestroy} from '@angular/core';
import {TableModule, Table} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {UserRow, TableColumn} from './typeModule';
import {mockUsers} from './mockUsers';
import {CreateUserModal} from './register-user/create-user-modal';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, CommonModule, CreateUserModal],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  private _users: UserRow[] = mockUsers.map(({password, ...rest}) => rest);

  columns: TableColumn<UserRow>[] = [
    {key: 'id', label: 'ID'},
    {key: 'username', label: 'Username'},
    {key: 'email', label: 'Email'},
    {key: 'role', label: 'Role'}
  ];

  enteredSearch = '';
  private search$ = new Subject<string>();
  private sub = new Subscription();

  @ViewChild('dt') dt?: Table;

  registerDialogVisible = false;

  constructor() {
    this.sub.add(
      this.search$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(q => {
        this.enteredSearch = q.trim();
      })
    );
  }

  get users(): UserRow[] {
    const q = this.enteredSearch.trim().toLowerCase();
    if (!q) return this._users;
    return this._users.filter(u => u.username.toLowerCase().includes(q));
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value)
    this.search$.next(input.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
