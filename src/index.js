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
let turn = "O",
  EMPTY = "",
  score,
  moves;
var c00, c01, c02, c10, c11, c12, c20, c21, c22;
var human = "X";
var ai = "O";
function clearBoard() {
  c00 = $("#c00").text("");
  c01 = $("#c01").text("");
  c02 = $("#c02").text("");
  c10 = $("#c10").text("");
  c11 = $("#c11").text("");
  c12 = $("#c12").text("");
  c20 = $("#c20").text("");
  c21 = $("#c21").text("");
  c22 = $("#c22").text("");
  // turn = 0;
}
function checkSquareValues() {
  c00 = $("#c00").html();
  c01 = $("#c01").html();
  c02 = $("#c02").html();
  c10 = $("#c10").html();
  c11 = $("#c11").html();
  c12 = $("#c12").html();
  c20 = $("#c20").html();
  c21 = $("#c21").html();
  c22 = $("#c22").html();
}

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
      cell.setAttribute("id", "c" + i + j);
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
  console.log(grid);
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
  clearBoard();
  checkSquareValues();
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
  if (calculateFun(this)) {
  } else {
    checkSquareValues();
    turn = turn === "X" ? "O" : "X";
    var thisObj = computerTurn();
    moves += 1;
    score[turn] += thisObj.identifier;
    calculateFun(thisObj);
    turn = turn === "X" ? "O" : "X";
    checkSquareValues();
  }
}
function calculateFun(obj) {
  if (win(obj)) {
    document.getElementById("message").innerHTML = "Winner: Player " + turn;
    $("#myModal").modal("show");
    startNewGame();
    return true;
  } else if (moves === GRID_LENGTH * GRID_LENGTH) {
    document.getElementById("message").innerHTML = "Draw";
    $("#myModal").modal("show");
    startNewGame();
    return true;
  }
}

function computerTurn() {
  // case 1: if there is a chance to win

  if (
    c00 === "" &&
    ((c01 === ai && c02 === ai) ||
      (c10 === ai && c20 === ai) ||
      (c11 === ai && c22 === ai))
  ) {
    $("#c00").text(turn);
    return $("#c00")[0];
  } else if (
    c01 === "" &&
    ((c00 === ai && c02 === ai) || (c11 === ai && c21 === ai))
  ) {
    $("#c01").text(turn);
    return $("#c01")[0];
  } else if (
    c02 === "" &&
    ((c00 === ai && c01 === ai) ||
      (c12 === ai && c22 === ai) ||
      (c11 === ai && c20 === ai))
  ) {
    $("#c02").text(turn);
    return $("#c02")[0];
  } else if (
    c10 === "" &&
    ((c00 === ai && c20 === ai) || (c11 === ai && c12 === ai))
  ) {
    $("#c10").text(turn);
    return $("#c10")[0];
  } else if (
    c11 === "" &&
    ((c10 === ai && c12 === ai) ||
      (c00 === ai && c22 === ai) ||
      (c02 === ai && c20 === ai))
  ) {
    $("#c11").text(turn);
    return $("#c11")[0];
  } else if (
    c12 === "" &&
    ((c10 === ai && c11 === ai) || (c02 === ai && c22 === ai))
  ) {
    $("#c12").text(turn);
    return $("#c12")[0];
  } else if (
    c20 === "" &&
    ((c21 === ai && c22 === ai) ||
      (c00 === ai && c10 === ai) ||
      (c02 === ai && c11 === ai))
  ) {
    $("#c20").text(turn);
    return $("#c20")[0];
  } else if (
    c21 === "" &&
    ((c20 === ai && c22 === ai) || (c01 === ai && c11 === ai))
  ) {
    $("#c21").text(turn);

    return $("#c21")[0];
  } else if (
    c22 === "" &&
    ((c20 === ai && c21 === ai) ||
      (c02 === ai && c12 === ai) ||
      (c00 === ai && c11 === ai))
  ) {
    $("#c22").text(turn);
    return $("#c22")[0];
  }
  // case 2: if there is a chance to block
  else if (
    c00 === "" &&
    ((c01 === human && c02 === human) ||
      (c10 === human && c20 === human) ||
      (c11 === human && c22 === human))
  ) {
    $("#c00").text(turn);

    return $("#c00")[0];
  } else if (
    c01 === "" &&
    ((c00 === human && c02 === human) || (c11 === human && c21 === human))
  ) {
    $("#c01").text(turn);

    return $("#c01")[0];
  } else if (
    c02 === "" &&
    ((c00 === human && c01 === human) ||
      (c12 === human && c22 === human) ||
      (c11 === human && c20 === human))
  ) {
    $("#c02").text(turn);

    return $("#c02")[0];
  } else if (
    c10 === "" &&
    ((c00 === human && c20 === human) || (c11 === human && c12 === human))
  ) {
    $("#c10").text(turn);

    return $("#c10")[0];
  } else if (
    c11 === "" &&
    ((c10 === human && c12 === human) ||
      (c00 === human && c22 === human) ||
      (c02 === human && c20 === human))
  ) {
    $("#c11").text(turn);

    return $("#c11")[0];
  } else if (
    c12 === "" &&
    ((c10 === human && c11 === human) || (c02 === human && c22 === human))
  ) {
    $("#c12").text(turn);

    return $("#c12")[0];
  } else if (
    c20 === "" &&
    ((c21 === human && c22 === human) ||
      (c00 === human && c10 === human) ||
      (c02 === human && c11 === human))
  ) {
    $("#c20").text(turn);

    return $("#c20")[0];
  } else if (
    c21 === "" &&
    ((c20 === human && c22 === human) || (c01 === human && c11 === human))
  ) {
    $("#c21").text(turn);

    return $("#c21")[0];
  } else if (
    c22 === "" &&
    ((c20 === human && c21 === human) ||
      (c02 === human && c12 === human) ||
      (c00 === human && c11 === human))
  ) {
    $("#c22").text(turn);

    return $("#c22")[0];
  }
  // case 3: center
  else if (c11 === "") {
    $("#c11").text(turn);

    return $("#c11")[0];
  }
  // case 4: opposite corner
  else if (c00 === "" && (c02 === human || c20 === human)) {
    $("#c00").text(turn);

    return $("#c00")[0];
  } else if (c02 === "" && (c00 === human || c22 === human)) {
    $("#c02").text(turn);

    return $("#c02")[0];
  } else if (c22 === "" && (c02 === human || c20 === human)) {
    $("#c22").text(turn);

    return $("#c22")[0];
  } else if (c20 === "" && (c00 === human || c22 === human)) {
    $("#c20").text(turn);

    return $("#c20")[0];
  }
  // case 5: corner
  else if (c00 === "") {
    $("#c00").text(turn);

    return $("#c00")[0];
  } else if (c02 === "") {
    $("#c02").text(turn);

    return $("#c02")[0];
  } else if (c20 === "") {
    $("#c20").text(turn);

    return $("#c20")[0];
  } else if (c22 === "") {
    $("#c22").text(turn);

    return $("#c22")[0];
  }
  // case 6: empty side
  else if (c01 === "") {
    $("#c01").text(turn);

    return $("#c01")[0];
  } else if (c12 === "") {
    $("#c12").text(turn);

    return $("#c12")[0];
  } else if (c21 === "") {
    $("#c21").text(turn);

    return $("#c21")[0];
  } else if (c10 === "") {
    $("#c10").text(turn);

    return $("#c10")[0];
  }
}

initializeGrid();
