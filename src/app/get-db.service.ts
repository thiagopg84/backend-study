import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './shared/models/game.model';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetDbService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<any[]>('http://127.0.0.1:5000/allgames');
  }

  getUsers() {
    return this.http.get<any[]>('http://127.0.0.1:5000/allusers');
  }
}
