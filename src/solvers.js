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
window.newTree = function(value) {
  this.value = value;
  this.valid = false;
  this.checked = 0;
  this.children = [];
  this.correct = 0;
};

window.newTree.prototype.addChild = (value) => {
  this.children.push(new this.newTree(value));
},

window.findNRooksSolution = function(n) {
  // debugger;
  var board = new Board({n: n});

  /*
  create output array on outermost scope
  create new board (empty at start)
  create new tree structure
    ~ probably requires new Tree object constructor
    value: board
    valid: false
    checked: 0
    children: []
    correct: 0
  create child tree
    create new board from parent board
    increment checked in currnent child
    add new member at appropriate index
      this is the mapping of 'checked' to [row, col]
    check board for conflicts
    if no conflicts
      add current board to child of current tree
      increment # correct
      if # correct === target
        push board to output array
      otherwise
        create children on current tree
   */


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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

/*
  Helper Function
 */
var check2rc = function(index, n) {
  var row = Math.floor(index / (n + 1));
  var col = (index % n) - 1;
  if (col < 0) { col += n; }

  return [row, col];
};
