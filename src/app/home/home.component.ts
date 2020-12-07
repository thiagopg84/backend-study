import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDbService } from '../get-db.service';
import { Game } from '../shared/models/game.model';
import { User } from '../shared/models/user.model';
import { tap } from 'rxjs/operators';
import { SelectorListContext } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
import { GameInterface } from '../shared/models/game-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // games: Game[] = [];
  games: GameInterface[];
  users: User[] = [];
  modalUser: boolean = false;
  modalGame: boolean = false;

  formGamesInfo = this.forms.group({
    sale: [null, Validators.required],
    gamePrice: [null],
    gameConsole: ['', Validators.required],
    gameName: ['', Validators.required],
    gameCover: ['', Validators.required],
    email: [false],
    fbMessenger: [false],
    whatsapp: [false]
  })

  constructor(private getDb: GetDbService, private forms: FormBuilder) { }

  ngOnInit(): void {
    this.formGamesInfo.get('sale').valueChanges.pipe(
      tap((sale: boolean) => {
        if (sale) {
          this.formGamesInfo.get('gamePrice').setValidators(Validators.required);
        } else {
          this.formGamesInfo.get('gamePrice').clearValidators();
        }
        this.formGamesInfo.get('gamePrice').updateValueAndValidity();
      })
    ).subscribe();

    this.getDb.getGames().subscribe(games => {
      // games.forEach(game => {
      //   this.games.push(new Game(
      //     game.id,
      //     game.gameconsole,
      //     game.gamecover,
      //     game.gamename,
      //     game.email,
      //     game.fbmessenger,
      //     game.gameprice,
      //     game.sale,
      //     game.whatsapp,
      //     game.userid
      //   ));
      // })
      this.games = games;
      console.log(this.games);
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
      console.log(this.users);
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

  onSubmit() {
    let formObj = this.formGamesInfo.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);

    this.getDb.postGame(serializedForm).subscribe(response => {
      console.log(response);
    })
  }
}