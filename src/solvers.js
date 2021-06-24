/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// window.newTree = function(value) {
//   this.value = value;
//   this.children = [];
// };

// window.newTree.prototype.addChild = function(value) {
//   this.children.push(new this.newTree(value));
// };

window.findNRooksSolution = function(n) {
  var solutionArr = [];

  const checkBoard = function(board, row, col) {
    var newCol = col;
    for (var i = row; i < n; i++) {
      while (newCol < n) {
        board.togglePiece(i, newCol);
        if (!board.hasAnyRooksConflicts()) {
          counter++;
          if (counter === n) {

            var boardArray = [];
            for (var k = 0; k < n; k++) {
              boardArray.push(board.rows()[k]);
            }
            solutionArr.push(boardArray);

          }
        } else {
          board.togglePiece(i, newCol);
        }
        newCol++;
      }
      newCol = 0;
    }
  };

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      var counter = 0;
      var board = new Board({n: n});

      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        counter++;
        if (counter === n) {

          //for each row, push that row to the board array
          //then push the board array to solution array
          var boardArray = [];
          for (var k = 0; k < n; k++) {
            boardArray.push(board.rows()[k]);
          }

          solutionArr.push(boardArray);
        }
      } else {
        board.togglePiece(i, newCol);
      }

      checkBoard(board, row, col + 1);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionArr[0]));
  return solutionArr[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionArr = [];

  const checkBoard = function(board, row, col) {
    var newCol = col;
    for (var i = row; i < n; i++) {
      while (newCol < n) {
        board.togglePiece(i, newCol);
        if (!board.hasAnyRooksConflicts()) {
          counter++;
          if (counter === n) {
            var boardArray = [];
            for (var k = 0; k < n; k++) {
              boardArray.push(board.rows()[k]);
            }
            solutionArr.push(boardArray);
          } else {
            checkBoard(board, i, newCol + 1);
          }
        } else {
          board.togglePiece(i, newCol);
        }
        newCol++;
      }
      newCol = 0;
    }
  };

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      var counter = 0;
      var board = new Board({n: n});

      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        counter++;
        if (counter === n) {

          //for each row, push that row to the board array
          //then push the board array to solution array
          var boardArray = [];
          for (var k = 0; k < n; k++) {
            boardArray.push(board.rows()[k]);
          }

          solutionArr.push(boardArray);
        }
      } else {
        board.togglePiece(i, newCol);
      }

      checkBoard(board, row, col + 1);
    }
  }
  //[0 0 1]
  //[1 1 0]
  //[0 0 0]


  console.log(solutionArr);
  console.log('Number of solutions for ' + n + ' rooks:', solutionArr.length);
  return solutionArr.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
