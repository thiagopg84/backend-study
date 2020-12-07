import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameInterface } from '../app/shared/models/game-interface'

@Injectable({
  providedIn: 'root'
})
export class GetDbService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<GameInterface[]>('http://127.0.0.1:5000/allgames');
  }

  getUsers() {
    return this.http.get<any[]>('http://127.0.0.1:5000/allusers');
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
}
