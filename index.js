const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldChar = "░";
const pathChar = "*";

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    for (let i = 0; i < this._field.length; i++) {
      console.log(this._field[i].join(""));
    }
  }

  // Asks user for input and validates it
  input() {
    const directions = ["A", "a", "S", "s", "D", "d", "W", "w"];

    let x;
    do {
      console.log("A -> Left  S -> Down  D -> Right  W -> Up");
      x = prompt("Which direction would you like to go?:");
      if (directions.includes(x)) {
        console.log("Valid Choice");
      } else {
        console.log("Invalid Choice");
      }
    } while (!directions.includes(x));
  }
}

const game = new Field([
  [pathChar, fieldChar, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, fieldChar],
  [hole, fieldChar, fieldChar, hole],
  [fieldChar, hole, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, hat],
]);

game.print();
game.input();
