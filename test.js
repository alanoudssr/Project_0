$(document).ready(function() {
  //landing popup! Promotes user to choose a grid size
  var gridPopUp = document.getElementById("gridPopup");
  var span = document.getElementsByClassName("close")[0];
  gridPopUp.style.display = "block";

  //
  var moves;
  var primary;
  var comparingVariable;
  var index = 0;
  var current = 0;
  var first = 0;
  //this declares the player
  var $player = "x";

  //assign the board variable
  var $board = $("#container");

  // assign grid size from user
  var selectedSize;
  $("#choiceButton").click(function() {
    selectedSize = $("input[name=gridNum]:checked").val();
    selectedSize = parseInt(selectedSize);
    //close popup and create the grid
    gridPopUp.style.display = "none";
    createGrid();
  });

  // the starting turn of the game is displayed on the page by creating a span and adding text to it
  var $turn = $("<span/>");
  $(".playerTurn").css("color", "whitesmoke");
  $turn.css("color", "black");
  $turn.text("X");
  $(".playerTurn").append($turn);

  // this function alternates the text displayed between player x and o
  function changePlayer() {
    if ($player === "o") {
      $player = "x";
      $(".playerTurn").css("color", "whitesmoke");
      $turn.css("color", "black");
      $turn.text("X");
    } else if ($player === "x") {
      $player = "o";
      $(".playerTurn").css("color", "black");
      $turn.css("color", "whitesmoke");
      $turn.text("O");
      onePlayer();
    }
  }

  //this function creates the grid automatically (grid size is chosen by the player)
  function createGrid() {
    var size = selectedSize;
    $board.empty();
    //loop to create multiple rows
    for (var row = 0; row < size; row++) {
      var $row = $("<div>").addClass("row");
      //within each row create multiple columns
      for (var column = 0; column < size; column++) {
        var $column = $("<div>").addClass("column empty");
        $column.css("cursor", "pointer");
        $row.append($column);
      }
      $board.append($row);
    }

    //when player clicks a slot
    $(".column.empty").on("click", function(event) {
      if ($player === "x") {
        //check if slot is empty
        if ($(this).hasClass("empty")) {
          $(this).removeClass("empty");
          $(this).css("cursor", "default");
          $(this).addClass($player);
          var winner = checkWin();
          //if no win is achieved trigger next turn
          if (!winner) {
            changePlayer();
          }
        }
        //if win is achieved display the winner
        if (winner) {
          // score counter
          var scoreXCount = $("#numberOfXWins");
          var scoreOCount = $("#numberOfOWins");
          var xCurrentScore;
          var oCurrentScore;
          if ($player === "x") {
            if (sessionStorage.getItem("xScore") === null) {
              sessionStorage.setItem("xScore", 1);
              xCurrentScore = sessionStorage.getItem("xScore");
            } else {
              xCurrentScore = parseInt(sessionStorage.getItem("xScore")) + 1;
              sessionStorage.setItem("xScore", xCurrentScore);
            }
          } else if ($player === "o") {
            if (sessionStorage.getItem("oScore") === null) {
              sessionStorage.setItem("oScore", 1);
              oCurrentScore = sessionStorage.getItem("oScore");
            } else {
              oCurrentScore = parseInt(sessionStorage.getItem("oScore")) + 1;
              sessionStorage.setItem("oScore", oCurrentScore);
            }
          }
          xCurrentScore = sessionStorage.getItem("xScore");
          oCurrentScore = sessionStorage.getItem("oScore");
          scoreXCount.text(xCurrentScore);
          $("#numberOfXWins").append(scoreXCount);
          scoreOCount.text(oCurrentScore);
          $("#numberOfOWins").append(scoreOCount);

          // popup winner

          $(".popUp_Border>p").text("Congrats player " + $player + "!");
          popUp.style.display = "block";
        }
      }
    });
  }

  // this is a popup window that displays the result
  var popUp = document.getElementById("winPopup");
  var span = document.getElementsByClassName("close")[0];

  //create empty array to store possible winning scenarios
  var arr3 = [];

  //this function checks whether a win is achieved
  function checkWin() {
    var startIndex = 0;

    //this first loop adds possible horizontal wins to the array
    for (var i = 0; i < selectedSize; i++) {
      var arr2 = [];
      var currentIndex = startIndex;
      for (var j = 0; j < selectedSize; j++) {
        arr2.push(currentIndex);
        currentIndex++;
      }
      arr3.push(arr2);
      startIndex = startIndex + selectedSize;
    }

    //this loop adds possible vertical wins to the array
    for (var i = 0; i < selectedSize; i++) {
      var arr2 = [];
      var currentIndex = i;
      for (var j = 0; j < selectedSize; j++) {
        arr2.push(currentIndex);
        currentIndex += selectedSize;
      }
      arr3.push(arr2);
    }

    //this adds a diagonal top left win
    var arr2 = [];
    var currentIndex = 0;
    for (var j = 0; j < selectedSize; j++) {
      arr2.push(currentIndex);
      currentIndex += selectedSize + 1;
    }
    arr3.push(arr2);

    //this adds a diagonal top right win
    var arr4 = [];
    var currentIndex = selectedSize - 1;
    for (var j = 0; j < selectedSize; j++) {
      arr4.push(currentIndex);
      currentIndex += selectedSize - 1;
    }
    arr3.push(arr4);

    // this will check the array for all possible wins
    function checkWinningArray() {
      var counter = 0;
      for (var i = 0; i < arr3.length; i++) {
        for (var j = 0; j < arr3[i].length; j++) {
          var index = arr3[i][j];
          if (
            $(".column")
              .eq(index)
              .hasClass($player)
          ) {
            counter++;
          }
          if (counter === selectedSize) {
            return true;
          }
        }
        counter = 0;
      }
    }

    //this checks whether a draw is reached
    var newCounter = 0;
    for (var i = 0; i < $(".column").length; i++) {
      if (
        $(".column")
          .eq(i)
          .hasClass("empty")
      ) {
        newCounter++;
      }
    }
    if (newCounter === 0) {
      console.log("draw");
      $(".popUp_Border>p").text("Aw it's a draw");
      popUp.style.display = "block";
    }

    return checkWinningArray();
  }

  //play against AI function
  function onePlayer() {
    //
    //
    if (moves === NaN || moves === undefined || moves === null) {
      moves = selectedSize - 1;
      primary = selectedSize - 1;
      comparingVariable = selectedSize - 1;
    }

    if (moves === comparingVariable) {
      for (var i = 0; i < arr3.length; i++) {
        if (
          $(".column")
            .eq(arr3[i][primary])
            .hasClass("empty")
        ) {
          $(".column")
            .eq(arr3[i][primary])
            .addClass("o");
          index = i;
          current = arr3[i][primary];
          moves--;
          primary--;
          break;
        }
      }
    } else if (comparingVariable > moves >= 0) {
      if (
        $(".column")
          .eq(arr3[index][primary])
          .hasClass("empty")
      ) {
        $(".column")
          .eq(arr3[index][primary])
          .addClass("o");
        current = arr3[index][primary];
        moves--;
        primary--;
      } else {
        for (var i = 0; i < arr3.length; i++) {
          if (arr3[i][primary + 1] === current) {
            if (
              $(".column")
                .eq(arr3[i][primary])
                .hasClass("empty")
            ) {
              $(".column")
                .eq(arr3[i][primary])
                .addClass("o");
              first = current;
              current = arr3[i][primary];
              index = i;
              moves--;
              primary--;
              break;
            }
          } else if (arr3[i][primary] === current) {
            if (
              $(".column")
                .eq(arr3[i][primary + 1])
                .hasClass("empty")
            ) {
              $(".column")
                .eq(arr3[i][primary + 1])
                .addClass("o");
              first = current;
              current = arr3[i][primary + 1];
              index = i;
              moves--;
              primary--;
              break;
            } else if (arr3[i][primary - 1] === current) {
              if (
                $(".column")
                  .eq(arr3[i][primary])
                  .hasClass("empty")
              ) {
                $(".column")
                  .eq(arr3[i][primary])
                  .addClass("o");
                first = current;
                current = arr3[i][primary];
                index = i;
                moves--;
                primary--;
                break;
              }
            } else {
              for (var i = 0; i < arr3.length; i++) {
                for (var j = 0; j < selectedSize; j++) {
                  if (
                    $(".column")
                      .eq(arr3[i][j])
                      .hasClass("empty")
                  ) {
                    $(".column")
                      .eq(arr3[i][j])
                      .addClass("o");
                    index = i;
                    current = arr3[i][j];
                    moves--;
                    primary--;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (moves < 0) {
      //
      //
      //
      var scoreXCount = $("#numberOfXWins");
      var scoreOCount = $("#numberOfOWins");
      var xCurrentScore;
      var oCurrentScore;

      if (sessionStorage.getItem("oScore") === null) {
        sessionStorage.setItem("oScore", 1);
        oCurrentScore = sessionStorage.getItem("oScore");
      } else {
        oCurrentScore = parseInt(sessionStorage.getItem("oScore")) + 1;
        sessionStorage.setItem("oScore", oCurrentScore);
      }

      xCurrentScore = sessionStorage.getItem("xScore");
      oCurrentScore = sessionStorage.getItem("oScore");
      scoreXCount.text(xCurrentScore);
      $("#numberOfXWins").append(scoreXCount);
      scoreOCount.text(oCurrentScore);
      $("#numberOfOWins").append(scoreOCount);

      $(".popUp_Border>p").text("Sorry, I win!");
      popUp.style.display = "block";
    }

    changePlayer();
  }
  //when popup x button is clicked close the popup
  span.onclick = function() {
    popUp.style.display = "none";
  };

  //when area outside the popup is clicked close the popup
  window.onclick = function(event) {
    if (event.target == popUp) {
      popUp.style.display = "none";
    }
  };

  //if replay button is clicked reload page
  $(".replay").on("click", function() {
    location.reload();
  });
});
