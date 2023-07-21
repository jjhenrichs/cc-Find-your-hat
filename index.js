const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldChar = "░";
const pathChar = "*";

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

  // Update the field based on the value of status
  updateField(direction, prev_x, prev_y, new_x, new_y, status) {
    // Draws a path
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

    // Updates the location of the star or finishes the path
    if (status === "Continue") {
      this.field[new_x][new_y] = "*";
    } else if (status.includes("Win")) {
      this.field[new_x][new_y] = "^";
    }
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

  // Starts the game and continues it until the player wins or loses
  play() {
    let direction, prev_x, prev_y, new_x, new_y, status;
    this.print();

    do {
      direction = this.input();
      ({ prev_x, prev_y, new_x, new_y } = this.updateXY(direction));
      status = this.status();
      this.updateField(direction, prev_x, prev_y, new_x, new_y, status);
      this.print();
    } while (status === "Continue");

    console.log(status);
  }

  static generateField() {
    let width = Math.floor(Math.random() * 17) + 4;
    let height = Math.floor(Math.random() * 26) + 5;
    // let numOfHoles = Math.floor((width * height) / 5);
    let board = [];
    let temp_arr = [];
    let temp_height = height;
    console.log(width, height, width * height);

    // Make a blank board with the hat (at the bottom right corner) and pathChar (at the top left corner)
    while (temp_height > 0) {
      for (let i = 0; i <= width; i++) {
        if (i === 0 && temp_height === height) {
          temp_arr.push(pathChar);
        } else if (i === width && temp_height === 1) {
          temp_arr.push(hat);
        } else {
          temp_arr.push(fieldChar);
        }
      }
      board.push(temp_arr);
      temp_arr = [];
      temp_height--;
    }

    // Print the generated board
    for (let i = 0; i < board.length; i++) {
      console.log(board[i].join("")); // Prints the field one array at a time
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

// game.play();

Field.generateField();
