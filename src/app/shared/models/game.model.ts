export class Game {
    constructor(
        public id: string,
        public gameconsole: string,
        public gamecover: string,
        public gamename: string,
        public email: boolean,
        public fbmessenger: boolean,
        public gameprice: number,
        public sale: boolean,
        public whatsapp: boolean,
        public userid: number     
        ) {
    }
}