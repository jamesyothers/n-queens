// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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

    //create a cols function that translates an array of rows
    //to an array of columns
    cols: function() {
      var rows = this.rows();
      var storage = [];
      //iterate over the number of rows
      for (var i=0; i<rows.length; i++) {
        //invert the nxn matrix by using _.pluck
        //_.pluck(array, indecie of inner arrays)
        //will grab all at a indicie of the inner arrays
        //and make a new array
        storage.push(_.pluck(rows, i));
      }
      return storage;
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

      var counter = 0;
      var row = this.rows()[rowIndex];
      // iterating over a single row
      for (var i = 0; i < row.length; i++ ){
        // check for pieces
        counter += row[i];
      }
      // if there's more than one piece
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      // get the rows
      var rows = this.rows();
      // loop through rows
      // check if there's a conflict
      for (var i = 0; i < rows.length; i++){
        if (this.hasRowConflictAt(i)){
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
      //get column array
      //iterate over array
      //check for column conflict
      var counter = 0;
      var col = this.cols()[colIndex];
      for (var i=0; i<col.length; i++) {
        if (col[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //get column array
      //iterate over array
      //check for column conflict
      //use the cols method we wrote
      var cols = this.cols();
      for (var i=0; i<cols.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },




    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
     // traverse the row index for values of 1
      var rows = this.rows();
      // initialize the storage array
      var storage = [];
      // iterate over all rows and columns
      for (var i = 0; i < rows.length; i++){
        for (var j = 0; j < rows.length; j++){
          //if there is a piece in the row/col location
          if ( rows[i][j] === 1 ) {
            //subtract it's row/col to get a value
            var diff = this._getFirstRowColumnIndexForMajorDiagonalOn(i,j);
            //if the storage array does not contain the value
            if ( storage.indexOf(diff) === -1 ){
              //push in the value
              storage.push(diff);
            }else{
              //if the storage array does contain the value
              //this means there is a diagonal conflict
              //diagonal conflicting pieces have a  characteristic
              //that their row/col difference are equal
              return true;
            }
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    // see documentation of major diagonal conflicts method
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      // initialize the storage array
      var storage = [];
      // double for loop
      for (var i = 0; i < rows.length; i++){
        for (var j = 0; j < rows.length; j++){
          if ( rows[i][j] === 1 ) {
            var diff = this._getFirstRowColumnIndexForMinorDiagonalOn(i,j);
            if ( storage.indexOf(diff) === -1 ){
              storage.push(diff);
            }else{
              return true;
            }
          }
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
