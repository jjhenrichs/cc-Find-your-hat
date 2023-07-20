const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldChar = "░";
const pathChar = "*";

// pathChar Coordinates

class Field {
  constructor(field) {
    this._field = field;
    this.x = 0; // x -> Horizontal Coord (Row)
    this.y = 0; // y -> Verticial Coord (Column)
  }

  get field() {
    return this._field;
  }

  // Prints the field
  print() {
    for (let i = 0; i < this._field.length; i++) {
      console.log(this._field[i].join("")); // Prints the field one array at a time
    }
  }

  // Asks user for input and validates it
  input() {
    const directions = ["A", "a", "S", "s", "D", "d", "W", "w"];

    let choice;
    do {
      console.log("A -> Left  S -> Down  D -> Right  W -> Up");
      choice = prompt("Which direction would you like to go?: ");
      if (!directions.includes(choice)) {
        console.log("Invalid Choice");
      }
    } while (!directions.includes(choice));

    return choice;
  }

  // Updates the user's location and the field
  update() {
    let direction = this.input();

    console.log(this.x, this.y);

    // Update the pathChar coordinates based on direction value
    if (direction === "A" || direction === "a") {
      this.y--;
    } else if (direction === "S" || direction === "s") {
      this.x++;
    } else if (direction === "D" || direction === "d") {
      this.y++;
    } else {
      this.x--;
    }

    console.log(this.x, this.y);
    this.status();

    // Update the field

    this.print();
  }

  //Checks to see if the user Wins, Loses, or Continues
  status() {}
}

const game = new Field([
  [pathChar, fieldChar, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, fieldChar],
  [hole, fieldChar, fieldChar, hole],
  [fieldChar, hole, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, hat],
]);

game.print();
// game.input();
game.update();
