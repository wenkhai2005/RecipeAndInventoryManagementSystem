import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  private _role: string | null = null;
  private _fullname: string | null = null;
  private _email: string | null = null;
  private _userId: string | null = null;

  isLoggedIn():boolean {
    return this._isLoggedIn;
  }

  hasAnyRole(roles: string[]): boolean {
    return this._role !== null && roles.includes(this._role);
  }

  loginAs(fullname: string, role: string, email: string, userId: string) {
    this._isLoggedIn = true;
    this._role = role;
    this._fullname = fullname;
    this._email = email;
    this._userId = userId;
  }

  logout(){
    this._isLoggedIn = false;
    this._role = null;
    this._fullname = null;
    this._email = null;
    this._userId = null;
  }

  get role(){
    return this._role;
  }

  get fullname(){
    return this._fullname;
  }

  get email(){
    return this._email;
  }

  get userId() {
    return this._userId;
  }

}
