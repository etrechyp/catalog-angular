import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../../models/user.model';
import { environment } from './../../../environments/environment';


@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }
  register(user: User) {
    console.log(user);
    this.http.post(`${environment.API_URL}users`, user)
      .subscribe(
        (resp: User) => {
          console.log(resp);
        },
        err => console.log(err)
      );
  }

}
