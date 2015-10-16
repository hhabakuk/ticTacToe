
var gridValues = [' ',' ',' ',' ',' ',' ',' ',' ',' ',];
var playerMoves = ['X','X','X','X','X','X','X','X','X',];
var computerMoves = ['O','O','O','O','O','O','O','O','O'];
var emptySpaces = [0,1,2,3,4,5,6,7,8];
var playerHasMovedTo = [];
var computerHasMovedTo = [];
var MAXMOVES = 9;
var gameFinished = false;

$("#resetBtn").on("click", function() {

  $('.board').empty()
  $('.winner').empty()
  gridValues = [' ',' ',' ',' ',' ',' ',' ',' ',' ',];
  playerMoves = ['x','x','x','x','x','x','x','x','x',];
  computerMoves = ['o','o','o','o','o','o','o','o','o',];
  emptySpaces = [0,1,2,3,4,5,6,7,8];
  playerHasMovedTo = [];
  computerHasMovedTo = [];
  gameFinished = false;

  makeList(gridValues);
});



function makeList (gridValues) {
  // set the gameboard
  var itemsList = $('<ul>'); // set up the unordered list
  $.each(gridValues, function(index, gridValue) { // create a loop that goes through each of the grid values and gives them the following property:
    
    var li = $('<li>' + gridValue + '</li>'); // create list items that include gridValues
    li.addClass('gridValue'); // add the class to the list item (gridvalue)
    
    itemsList.append(li); // add the newly created list items to the unordered list
  });

  var board = $('.board').first(); // we are using the class 'board'
  board.append(itemsList); // append the list items to that class
 

   $('.board').css({ "background-color": "yellow", "display": "inline-block", "width":"400px", "height":"400px", "margin":"0px" });
  $('.board li').css({ "padding":"10px","font-family":"helvetica","font-size":"75px","background-color": "white", "display": "inline-block", "width":"1em", "height":"1em", "float":"left", "margin":"10px" });
  $('.winner').css({"position": "relative","text-decoration":"underline", "list-style": "none","text-transform": "uppercase","padding":"10px","font-family":"helvetica","font-size":"75px","background-color": "white", "display": "inline-block", "width":"1em", "height":"1em", "margin":"10px", "z-index":"-200" });

 

};

makeList(gridValues); // call the function







// player makes a move 

$('.board').on('click', 'li', function() { // this function will apply only to the list elements in "board" class that are clicked
if (gameFinished === false) {
  

  var move = $(event.target); // make a variable of the clicked item

  if (playerHasMovedTo.indexOf($('li').index(move)) === -1 && computerHasMovedTo.indexOf($('li').index(move)) === -1) {
    var moveIndex = $('li').index(move); // get the index of the clicked item 

    console.log('player move index is ' + moveIndex);

    playerHasMovedTo.push(emptySpaces[moveIndex]);
    console.log('playerHasMovedTo '+ playerHasMovedTo);
    delete emptySpaces [moveIndex]; // remove the clicked item from the possibilities of the next moves

    console.log('empty spaces are ' + emptySpaces);

    gridValues[moveIndex] = playerMoves[moveIndex]; // the value on the original board that's index is equal to the index of the element in the array that the user clicked on, is now equal to the element on the same index in the playerMove array

    temporary = [];
    var possibleChoices = function () {
        // choose from possible indexes only
      for (i=0; i<=emptySpaces.length; i++) {
        if (emptySpaces[i] != undefined)
          temporary.push(emptySpaces[i]);
      }

    };

    possibleChoices();

    var computerMoveIndex =_.sample(temporary); // get random index from the possible indexes
    
    console.log('computer move index is ' + computerMoveIndex);

    computerHasMovedTo.push(emptySpaces[computerMoveIndex]);
    console.log('computer has moved to '+ computerHasMovedTo);

    delete emptySpaces [computerMoveIndex];
    console.log('emptySpaces are '+ emptySpaces);

    gridValues[computerMoveIndex] = computerMoves[computerMoveIndex]; // computer makes a move

    $('.board').empty();// clear the board ( clear the 'board class')
    makeList(gridValues); // show the new list

    theWinnerIs(playerHasMovedTo, computerHasMovedTo);

    }

   };

  function theWinnerIs (playerHasMovedTo, computerHasMovedTo) {

    var movesLeft = (MAXMOVES - ((playerHasMovedTo.length) + (computerHasMovedTo.length)))
    console.log(" all moves " + movesLeft);

    var winningCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
    console.log('win  '+ winningCombination[0][1])
    var playerWins = playerHasMovedTo.sort().join('');
    console.log ('players winning combination ' + playerWins)
    var computerWins = computerHasMovedTo.sort().join('');
    console.log ('computers winning combination ' + computerWins)
    var announceWinner = $('<li>');
    var board = $('.winner').first();
    var tie = false;

    
   
      for (var i = 0; i<winningCombination.length;  i++) {

        if (_.contains(playerHasMovedTo,winningCombination[i][0]) && _.contains(playerHasMovedTo,winningCombination[i][1]) && _.contains(playerHasMovedTo,winningCombination[i][2]) )
 {
          var playerWon = $('<li>' + "Player wins" + '</li>');
          announceWinner.append(playerWon); 
          $(playerWon).fadeIn(400);
          board.append(announceWinner);
          var tie = false;
         
          gameFinished = true;



        } else if (_.contains(computerHasMovedTo,winningCombination[i][0]) && _.contains(computerHasMovedTo,winningCombination[i][1]) && _.contains(computerHasMovedTo,winningCombination[i][2])) {

          var computerWon = $('<li>' + "COMPUTER WINS" + '</li>');
          announceWinner.append(computerWon);
          $(computerWon ).fadeIn( 400 );
          board.append(announceWinner);
          gameFinished = true;
          var tie = false;


        } else if (_.contains(computerHasMovedTo,winningCombination[i][0]) && _.contains(computerHasMovedTo,winningCombination[i][1]) && _.contains(computerHasMovedTo,winningCombination[i][2])&& _.contains(playerHasMovedTo,winningCombination[i][0]) && _.contains(playerHasMovedTo,winningCombination[i][1]) && _.contains(playerHasMovedTo,winningCombination[i][2])) {


           var playerWon = $('<li>' + "PLAYER WINS" + '</li>');
          announceWinner.append(playerWon); 
          $(playerWon).fadeIn(400);
          board.append(announceWinner);
          var tie = false;
         
          gameFinished = true;


        } else if ((movesLeft <= 0) && (tie = true)){

          var tie = true;
          gameFinished = true;

      }
      
    }

      if (tie === true) {
         var nooneWon = $('<li>' + "TIE" + '</li>');
          announceWinner.append(nooneWon); 
          board.append(announceWinner);
        

          gameFinished === true;
        }

  };
});




