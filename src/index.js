/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */

const GRID_LENGTH = 3;
const grid = [];
let turn = "X",
  EMPTY = "&nbsp;",
  score,
  moves;

function initializeGrid() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < GRID_LENGTH; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < GRID_LENGTH; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("height", 120);
      cell.setAttribute("width", 120);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == GRID_LENGTH - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      grid.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}

/*
* New game or reset condition 
*/
function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  grid.forEach(function(square) {
    square.innerHTML = EMPTY;
  });
}

/*
* Check if a win or not
*/
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    // winning condition
    if (items.length == GRID_LENGTH) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

/*
* Sets clicked square and also updates the turn.
*/
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert("Winner: Player " + turn);
    startNewGame();
  } else if (moves === GRID_LENGTH * GRID_LENGTH) {
    alert("Draw");
    startNewGame();
  } else {
    turn = turn === "X" ? "O" : "X";
    // document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

initializeGrid();
