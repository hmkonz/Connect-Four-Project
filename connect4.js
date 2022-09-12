/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer='p1'; // active player: 1 or 2
let player;
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
// TODO: set "board" to empty HEIGHT x WIDTH matrix array, with the WIDTH number of elements in each subarray set to null, and the HEIGHT number of subarrays

  for (let i=0; i<HEIGHT; i++){
    let heightArr=[];
    for (let j=0; j<WIDTH; j++){
      heightArr.push(null)
    }
    board.push(heightArr) 
  } 
  return board
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard=document.querySelector('#board')
  // create row element 'tr' and set equal to 'top'
  // set id of top row element to "column-top"
  // add an eventListener to top row 'top' to listen for a 'click' which will then drop the colored piece to an empty cell in that column
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
// for loop creates 'headCell' (table cells 'td') of the top row 'top' by iterating as many times as WIDTH of the board. Each iteration creates the 'td', sets its id equal to 'x' and appends it to the top row ('top'). Result is 7 headCells ('td's)with id's from 0-6
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
// appends the top row ('top') to the gameboard (htmlBoard)
  htmlBoard.append(top);

// The outer for loop creates the rows of the gameboard by iterating as many times as HEIGHT of board. Each iteration creates a new row element 'tr' called 'row'. With every iteration, each row is appended to the gameboard ('htmlBoard'). 

// The inner loop creates the columns (the table cells ('td') of each row) by iterating as many times as WIDTH  of board. Each 'cell' is then assigned an id that equals an index of y,x. Each "cell" is then appended to the row created in the outer loop.

// Result is a board 'htmlBoard' with 6 rows and 7 coumns

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
    
  }
    console.log(htmlBoard)
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // 'x' is the id of each cell in the top row
  // check the column of 'x' starting at the bottom cell (y=HEIGHT) to see if any are empty empty 
    for (y = HEIGHT - 1; y >= 0; y--){
    // if cell in column 'x' is full, do nothing
      if(board[y][x] !== null){
      }
    // if cell in column 'x' is not full, return that y coordinate
      else {
        console.log(board)
        console.log(y)
        return y
      }
    }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const pieceDiv=document.createElement('div');
  pieceDiv.setAttribute('class', 'piece');
  pieceDiv.classList.add(currPlayer);
  console.log(`${y}-${x}`);
  console.log(currPlayer);
  const correctTableCell = document.getElementById
  (`${y}-${x}`);
  correctTableCell.append(pieceDiv);
  console.log(correctTableCell);
}

// switch players
// TODO: switch currPlayer 1 <-> 2 
function switchPlayer(player){ 
  if (player === 'p1' ){
      currPlayer = 'p2';
  } else { 
    currPlayer= 'p1';
  }
  return currPlayer;
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}




/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  console.log(x);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
 
  // place piece in board and add to HTML table
  placeInTable(y, x);

  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;

  

  // check for win
  if (checkForWin()) {
    console.log('Game Over')
    endGame(`Player ${currPlayer} won!`);
    this.removeEventListener('click', handleClick);
  }

  if (board[0].every(function(cell){
    return cell !== null
  })) {
    //endgame logic
  }
  
  // check for tie
  // if all the cells in the top row (x=0) are filled (not equal to null), it's a tie game
  if(board[0].every((cell) => cell !==null)){
    endGame("Game Over - Tie! Try Again!")
  }
// switch players
  switchPlayer(currPlayer);
  console.log(currPlayer);


  // function checkForTie(cell){
  //   if (board[0].every(cell)) {
  //   cell !==null;
  //   return endGame('Game Over - Tie! Try Again!')
  //   }
  // }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }  

  // TODO: read and understand this code. Add comments to help you.
  // outer loop iterates HEIGHT number of times (6 in this case). y is equal to the same value for each of the 7 iterations of the inner loop
  // inner loop iterates WIDTH number of times (7 in this case) so for every iteration, x increases from 0 to 7
  // these loops check the gameboard cell by cell (42 times) to see if any 4 cells horizonally, vertically, diagonally down from the right or diagonally down from the left are from the same user
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
  // assigns 'horiz' to 4 horizonal cells in a row (y is the same in every cell)
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // console.log(horiz);
  // assigns 'vert' to 4 vertical cells in a column (x is the same in every cell)
  
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
  // assigns 'diagDR' to 4 adjacent cells diagonally left to right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // console.log(diagDR);
  // assigns 'diagDL' to 4 adjacent cells diagonally right to left  
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // console.log(diagDL);
  // if there are 4 in a row in any of the 4 directions, and '_win' returns true (if all are legal coordinates & all match currPlayer) true will be returned 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// these 2 functions are run when page is opened to download the memory board and html board
makeBoard();
makeHtmlBoard();
