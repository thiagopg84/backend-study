import { Component, OnInit } from '@angular/core';
import { GetDbService } from '../get-db.service';
import { Game } from '../shared/models/game.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games: Game[] = [];
  users: User[] = [];

  constructor(private getDb: GetDbService) { }

  ngOnInit(): void {
    this.getDb.getGames().subscribe(games => {
      games.forEach(game => {
        this.games.push(new Game(
          game[0],
          game[1],
          game[2],
          game[3],
          game[4],
          game[5],
          game[6],
          game[7],
          game[8],
          game[9]))
      })
      console.log(this.games)
    });

    this.getDb.getUsers().subscribe(users => {
      users.forEach(user => {
        this.users.push(new User(
          user[0],
          user[1],
          user[2],
          user[3],
          user[4],
          user[5],
          user[6]
        ));
      })
      console.log(this.users)
    })
  }

  getUser(userId: number) {
    let user: User;
    this.users.forEach(e => {
      if (e.id == userId) {
        user = e;
      }
    });
    return user;
  }
}