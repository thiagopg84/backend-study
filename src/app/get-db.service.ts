import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameInterface } from '../app/shared/models/game-interface'
import { UserInterface } from './shared/models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class GetDbService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<GameInterface[]>('http://127.0.0.1:5000/allgames');
  }

  getUsers() {
    return this.http.get<UserInterface[]>('http://127.0.0.1:5000/allusers');
  }

  postGame(game: string) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //   }),
    // };

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post('http://127.0.0.1:5000/creategame', game, { headers, responseType: 'text'});
    // return this.http.post('http://127.0.0.1:5000/creategame', game); --- caso eu queira receber o mesmo tipo que foi enviado
  }

  postUser(user: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post('http://127.0.0.1:5000/createuser', user, { headers, responseType: 'text'});
  }

  getUser(user: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    
    return this.http.get<UserInterface>('http://127.0.0.1:5000/user', requestOptions)
    // return this.http.get<UserInterface>('http://127.0.0.1:5000/user', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type'}})

  }
}
