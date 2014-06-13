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

window.findNRooksSolution = function(n) {
  var createBoard = function(n){
    var board = [];
    for (var i=0; i<n; i++) {
      var row = [];
      for (var j=0; j<n; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  };
  //will find the longest major diagonal solution 
  var solution = new Board(createBoard(n));
  for (var i=0; i<n; i++) {
      for (var j=0; j<n; j++) {
        solution.togglePiece(j,i);
        if(solution.hasAnyRooksConflicts()) {
          solution.togglePiece(j,i);
        }
      }
    }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(num) {
 
  var solutionCount = 0;
  //create empty board of nxn
  //quotes automatically put around the key 'n'
  var board = new Board({n:num});
  //array of row position we can choose at each level
  //var rows = _.range(1, num+1);
  //create function to call recursively
  var findCombo = function(depth) {
    for (var i=0; i<num; i++) {
      //toggle entire column, 1 at a time
      board.togglePiece(i, depth);
      if (!board.hasAnyRooksConflicts()) {
        if(depth === num-1) {
          solutionCount++;
        }else {
          findCombo(depth+1);
        }
      }
      //toggle column value
      //this is so that we can move onto the next column position
      //need to no longer consider this piece
      board.togglePiece(i, depth);
    }
  };

  findCombo(0);

  console.log('Number of solutions for ' + num + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create a blank board
  var solution = new Board({n:n});
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      solution.togglePiece(j,i);
      if(solution.hasAnyQueensConflicts()) {
        solution.togglePiece(j,i);
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {

//initialize a board
var board = new Board({n:num});
var rows = board.rows();
var depth = 0;
var solutionCount = 0;

var buildTree = function(dep) {
//iterate over rows
for (var i=0; i<rows.length; i++) {
    //toggle board one element at a time
    board.togglePiece(i,dep);
    //check for conflicts
    //if no conflicts
    if(!board.hasAnyQueensConflicts()) {
      //base case
      if(dep === num-1) {
        solutionCount++;
      } else {
        buildTree(dep+1);
      }
    }
    //toggle back
    board.togglePiece(i,dep);
}
};
  //start going through levels
  buildTree(0);

  if (num === 0 || num === 1){
    solutionCount = 1;
  }
  console.log('Number of solutions for ' + num + '  queens:', solutionCount);
  return solutionCount;

};
