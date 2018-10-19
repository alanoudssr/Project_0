$(document).ready(function () {

  // check if the player had previously written their name before --> Improving UX
  if (sessionStorage.getItem("playerOne") !== null) {
    $("#playerOne").val(sessionStorage.getItem("playerOne"));
  }

  // score setting
  var scoreXCount = $("#numberOfXWins");
  var scoreOCount = $("#numberOfOWins");
  if (sessionStorage.getItem("xAIScore") === null) {
    sessionStorage.setItem("xAIScore", 0);
  }
  var xCurrentScore = parseInt(sessionStorage.getItem("xAIScore"));
  if (sessionStorage.getItem("oAIScore") === null) {
    sessionStorage.setItem("oAIScore", 0);
  }
  var oCurrentScore = parseInt(sessionStorage.getItem("oAIScore"));


  //initiate landing popup! Shows up on load
  var gridPopUp = document.getElementById("gridPopup");
  var span = document.getElementsByClassName("close")[0];
  gridPopUp.style.display = "block";

  //initiate popup window that displays the result
  var popUp = document.getElementById("winPopup");
  var span = document.getElementsByClassName("close")[0];

  //variables needed
  var arr3 = [];
  var moves = 0;
  var random = 0;
  var noScenario = true;
  var $board = $("#container");

  //this declares the starting player
  var playerArray = ["x", "o"];
  var randomIndex = Math.floor(Math.random() * 2);
  var $player = playerArray[randomIndex];

  //this function builds the array of winning scenarios
  //--> The math behind this function is explained in the README file
  function buildArray() {
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
      startIndex += selectedSize;
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
  }

  //landing popup promotes user to choose a grid size and user name 
  var selectedSize;
  $("#choiceButton").click(function () {
    selectedSize = parseInt($("input[name=gridNum]:checked").val());
    sessionStorage.setItem("playerOne", $("#playerOne").val());
    gridPopUp.style.display = "none"; // close popup
    createGrid(); // create the grid
  });


  // this function alternates between player x and o
  function changePlayer() {
    $player === "o" ? $player = "x" : ($player = "o", noScenario = true, onePlayer());
  }

  // this function adds the token in the slot 
  function addToken(slotPlayed) {
    slotPlayed.removeClass("empty");
    slotPlayed.css("cursor", "default");
    slotPlayed.css("border", "none");
    slotPlayed.css("background-color", "rgb(57, 148, 189)");
    slotPlayed.addClass($player);
    checkWin();
    //if no win is achieved trigger next turn
    if (!checkWin()) {
      changePlayer();
    }
  }

  //this function creates the grid automatically (grid size is chosen by the player)
  function createGrid() {

    // display name on game start
    $('#playerName').text(sessionStorage.getItem("playerOne"));

    buildArray();

    // empty out the board before creating a new one
    $board.empty();

    //loop to create multiple rows
    for (var row = 0; row < selectedSize; row++) {
      var $row = $("<div>").addClass("row");
      //within each row create multiple columns
      for (var column = 0; column < selectedSize; column++) {
        var $column = $("<div>").addClass("column empty");
        $column.css("cursor", "pointer");
        $row.append($column);
      }
      $board.append($row);
    }

    //if it's the A.I's turn go to the A.I function
    if ($player === 'o') {
      onePlayer();
    }

    //when player clicks a slot check if it's empty and play
    $(".column.empty").on("click", function (event) {
      if ($player === "x") {
        if ($(this).hasClass('empty')) {
          addToken($(this));
        }
      }
      if ($player === 'o') {
        onePlayer();
      }
    });
  }

  // this function creates the A.I that plays against the player
  function onePlayer() {
    var $slot = $(".column");
    var current;
    var ruinPlayer = true;

    // if it's the first move in the game
    if (moves === 0) {
      // if this is a 3x3 grid try to put it in the middle slot
      if (selectedSize === 3 && $slot.eq(4).hasClass('empty')) {
        addToken($slot.eq(4));
        current = 4;
        noScenario = false;
        moves++;
      } else { //if this isn't a 3x3 game or if the middle slot is not empty put the first token in a random empty slot
        for (var i = 0; i < $slot.length; i++) {
          random = Math.floor(Math.random() * ($slot.length - 1));
          if ($slot.eq(random).hasClass('empty')) {
            addToken($slot.eq(random));
            current = random;
            noScenario = false;
            moves++;
            break;
          }
        }
      }
    } else if (moves > 0) { //if this is not the first move
      //check if possibility of immediate winning exists 
      loopWinner: for (var i = arr3.length - 1; i >= 0; i--) {
        var anotherCounter = 0;
        for (var j = 0; j < arr3[i].length; j++) {
          if ($slot.eq(arr3[i][j]).hasClass("o")) {
            anotherCounter++
          }
          if (anotherCounter === (selectedSize - 1)) {
            for (var k = 0; k < arr3[i].length; k++) {
              if ($slot.eq(arr3[i][k]).hasClass("empty")) {
                addToken($slot.eq(arr3[i][k]));
                noScenario = false;
                ruinPlayer = false;
                break loopWinner;
              }
            }
          }
        }
      }
      //check if possibility of other player's win is possible and stop it
      loopEvil: for (var i = arr3.length - 1; i >= 0; i--) {
        var anotherCounter = 0;
        for (var j = 0; j < arr3[i].length; j++) {
          if ($slot.eq(arr3[i][j]).hasClass("x")) {
            anotherCounter++
          }
          if (anotherCounter === (selectedSize - 1)) {
            for (var k = 0; k < arr3[i].length; k++) {
              if ($slot.eq(arr3[i][k]).hasClass("empty")) {
                addToken($slot.eq(arr3[i][k]));
                noScenario = false;
                ruinPlayer = false;
                break loopEvil;
              }
            }
          }
        }
      }
      // if none of the above possibilities exist then check the placement of the last played toke "current" 
      //and try to play in a slot that would form a winning scenario with that last token
      if (ruinPlayer) {
        loop1: for (var i = arr3.length - 1; i >= 0; i--) {
          for (var j = 0; j < selectedSize; j++) {
            if (arr3[i][j] === current) {
              loop3: for (var k = 0; k < arr3[i].length; k++) {
                for (var w = 0; w < arr3[i].length; w++) {
                  if ($slot.eq(arr3[i][w]).hasClass("x")) {
                    break loop3;
                  } else if ($slot.eq(arr3[i][k]).hasClass("empty")) {
                    addToken($slot.eq(arr3[i][k]));
                    random = arr3[i][k];
                    noScenario = false;
                    break loop1;
                  }
                }
              }
            }
          }
        }
      }
      // if no winning scenarios are possible play in the first empty slot you find
      if (noScenario) {
        for (var i = 0; i < $slot.length; i++) {
          if ($slot.eq(i).hasClass("empty")) {
            addToken($slot.eq(i));
            noScenario = false;
            break;
          }
        }
      }
    }
  }

  //this function checks whether a win is achieved
  function checkWin() {
    var $slot = $(".column");

    // this will check the array for all possible wins
    function checkWinningArray() {
      var counter = 0;
      for (var i = 0; i < arr3.length; i++) {
        for (var j = 0; j < arr3[i].length; j++) {
          var index = arr3[i][j];
          if ($slot.eq(index).hasClass($player)) {
            counter++;
          }
          if (counter === selectedSize) {
            return true;
          }
        }
        counter = 0;
      }
    }

    var winner = checkWinningArray();

    // if a win is achieved pop up the score and the winner
    if (winner) {
      if ($player === "x") {
        xCurrentScore = parseInt(sessionStorage.getItem("xAIScore")) + 1;
        sessionStorage.setItem("xAIScore", xCurrentScore);
      } else if ($player === "o") {
        oCurrentScore = parseInt(sessionStorage.getItem("oAIScore")) + 1;
        sessionStorage.setItem("oAIScore", oCurrentScore);
      }

      xCurrentScore = sessionStorage.getItem("xAIScore");
      oCurrentScore = sessionStorage.getItem("oAIScore");
      scoreXCount.text(xCurrentScore);
      scoreOCount.text(oCurrentScore);
      var playerName = sessionStorage.getItem("playerOne")

      if ($player === "x") {
        $(".popUp_Border>p").text("Congrats " + playerName + "!");
      } else {
        $(".popUp_Border>p").text("Hahaha, I win!");
      }
      popUp.style.display = "block";
      return true;
    }

    //this checks whether a draw is reached
    var newCounter = 0;
    for (var i = 0; i < $slot.length; i++) {
      if ($slot.eq(i).hasClass("empty")) {
        newCounter++;
      }
    }
    if (newCounter === 0) {
      scoreXCount.text(xCurrentScore);
      scoreOCount.text(oCurrentScore);
      $(".popUp_Border>p").text("Aw it's a draw");
      popUp.style.display = "block";
      return true;
    }

    return false;
  }

  //when popup x button is clicked close the popup
  span.onclick = function () {
    popUp.style.display = "none";
  };

  //when area outside the popup is clicked close the popup
  window.onclick = function (event) {
    if (event.target == popUp) {
      popUp.style.display = "none";
    }
  };

  //if replay button is clicked reload page
  $(".replay").on("click", function () {
    location.reload();
  });
});