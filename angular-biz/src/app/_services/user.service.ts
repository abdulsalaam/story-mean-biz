import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

    getAll() {
        return this.http.get<User[]>(`${this.config.apiUrl}/users?top=5&skip=0`);
    }

    getById(id: number) {
        return this.http.get(`${this.config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.config.apiUrl}/users`, user);
    }

    update(user: User) {
        return this.http.put(`${this.config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.config.apiUrl}/users/${id}`);
    }
}