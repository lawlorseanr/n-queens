// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var thisRowConflict = 0;
      for (var colOfRow = 0; colOfRow < this.attributes[0].length; colOfRow++) {
        thisRowConflict += this.attributes[rowIndex][colOfRow];

        if (thisRowConflict > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var row = 0; row < this.attributes[0].length; row++) {
        if (this.hasRowConflictAt(row)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var thisColConflict = 0;
      for (var rowOfCol = 0; rowOfCol < this.attributes[0].length; rowOfCol++) {
        thisColConflict += this.attributes[rowOfCol][colIndex];

        if (thisColConflict > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var col = 0; col < this.attributes[0].length; col++) {
        if (this.hasColConflictAt(col)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    hasMajorDiagonalConflictAt: function(majorRow, majorCol) {
      var currRow = majorRow;
      var currCol = majorCol;
      var thisMajorConflict = 0;
      while (currRow < this.attributes[0].length && currCol < this.attributes[0].length) {
        thisMajorConflict += this.attributes[currRow][currCol];
        if (thisMajorConflict > 1) {
          return true;
        }
        currRow++;
        currCol++;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // test top diagonals
      var topRow = 0;
      for (var topCol = 0; topCol < (this.attributes[0].length - 2); topCol++) {
        if (this.hasMajorDiagonalConflictAt(topRow, topCol)) {
          return true;
        }
      }

      // test side diagonals
      var sideCol = 0;
      for (var sideRow = 1; sideRow < this.attributes[0].length - 2; sideRow++) {
        if (this.hasMajorDiagonalConflictAt(sideRow, sideCol)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    //hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    hasMinorDiagonalConflictAt: function(minorRow, minorCol) {
      var currRow = minorRow;
      var currCol = minorCol;
      var thisMinorConflict = 0;
      while (currRow <= (this.attributes[0].length - 1) && currCol >= 0) {
        thisMinorConflict += this.attributes[currRow][currCol];
        if (thisMinorConflict > 1) {
          return true;
        }
        currRow++;
        currCol--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // test top diagonals
      var topRow = 0;
      for (var topCol = this.attributes[0].length - 1; topCol >= 0; topCol--) {
        if (this.hasMinorDiagonalConflictAt(topRow, topCol)) {
          return true;
        }
      }

      // test side diagonals
      var sideCol = this.attributes[0].length - 1;
      for (var sideRow = 1; sideRow < this.attributes[0].length - 1; sideRow++) {
        if (this.hasMinorDiagonalConflictAt(sideRow, sideCol)) {
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
