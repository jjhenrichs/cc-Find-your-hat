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

  // Updates the user's coordinates
  updateXY(direction) {
    let prev_x = this.x; //Previous X Coord
    let prev_y = this.y; //Previous Y Coord
    let new_x, new_y;

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

    new_x = this.x; //New X Coord
    new_y = this.y; //New Y Coord

    return { prev_x, prev_y, new_x, new_y };
  }

  // Updates the field
  updateField(direction) {
    let status = this.status();
    console.log(status);

    // Update the field based on the value of status
    if (status === "Continue") {
      if (
        direction === "S" ||
        direction === "s" ||
        direction === "W" ||
        direction === "w"
      ) {
        this.field[prev_x][prev_y] = "|";
      } else {
        this.field[prev_x][prev_y] = "-";
      }
      this.field[new_x][new_y] = "*";
    }

    this.print();
  }

  //Checks to see if the user Wins, Loses, or Continues
  status() {
    if (
      this.x < 0 ||
      this.x > this.field[0].length ||
      this.y < 0 ||
      this.y > this.field.length
    ) {
      return "Lose - you went out of bounds.";
    } else if (this.field[this.x][this.y] === "O") {
      return "Lose - you fell in the hole.";
    } else if (this.field[this.x][this.y] === "^") {
      return "Win - you found your hat.";
    } else {
      return "Continue";
    }
  }
}

const game = new Field([
  [pathChar, fieldChar, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, fieldChar],
  [hole, fieldChar, fieldChar, hole],
  [fieldChar, hole, fieldChar, fieldChar],
  [fieldChar, fieldChar, hole, hat],
]);

// let { prev_x, prev_y, new_x, new_y } = game.updateXY("W", 0, 0);
// console.log("Previous X: ", prev_x, "Previous Y: ", prev_y);
// console.log("Current X: ", new_x, "Current Y: ", new_y);
