import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import Rename from '../../../core/types/rename.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getMe(): Observable<User> {
    return this.http.get<User>('/users/me');
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }

  public deleteUserById(id: string): Observable<unknown> {
    return this.http.delete(`/users/${id}`);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`/users`, user);
  }

  public changeUserRole(user: { userId: string; role: string }): Observable<unknown> {
    return this.http.put(`/users/role`, user);
  }

  public updateUser(user: Rename<User, "id", "userId">): Observable<unknown> {
    return this.http.put(`/users`, user);
  }
}
