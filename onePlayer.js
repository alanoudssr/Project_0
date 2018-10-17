$(document).ready(function () {

  if (sessionStorage.getItem("playerOne") !== null) {
    $("#playerOne").val(sessionStorage.getItem("playerOne"));
  }

  //landing popup! Promotes user to choose a grid size
  var gridPopUp = document.getElementById("gridPopup");
  var span = document.getElementsByClassName("close")[0];
  gridPopUp.style.display = "block";

  //
  var arr3 = [];
  var moves;
  var comparingVariable;
  var random = 0;
  var noScenario = true;
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
  }

  //this declares the player
  var playerArray = ["x", "o"];
  var randomIndex = Math.floor(Math.random() * 2);
  var $player = playerArray[randomIndex];

  //assign the board variable
  var $board = $("#container");

  // assign grid size from user
  var selectedSize;
  $("#choiceButton").click(function () {
    selectedSize = $("input[name=gridNum]:checked").val();
    selectedSize = parseInt(selectedSize);
    var $playerOne = $("#playerOne").val();
    sessionStorage.setItem("playerOne", $playerOne);
    //close popup and create the grid
    gridPopUp.style.display = "none";
    createGrid();
  });


  // this function alternates the text displayed between player x and o
  function changePlayer() {
    if ($player === "o") {
      $player = "x";
    } else if ($player === "x") {
      $player = "o";
      noScenario = true;
      onePlayer();
    }
  }

  //this function creates the grid automatically (grid size is chosen by the player)
  function createGrid() {

    $('#playerName').text(sessionStorage.getItem("playerOne"));

    buildArray();
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
    $(".column.empty").on("click", function (event) {
      if ($player === "x") {
        //check if slot is empty
        if ($(this).hasClass("empty")) {
          $(this).removeClass("empty");
          $(this).css("cursor", "default");
          $(this).css("border", "none");
          $(this).css("background-color", "rgb(57, 148, 189)");
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
            if (sessionStorage.getItem("xAIScore") === null) {
              sessionStorage.setItem("xAIScore", 1);
              xCurrentScore = sessionStorage.getItem("xAIScore");
            } else {
              xCurrentScore = parseInt(sessionStorage.getItem("xAIScore")) + 1;
              sessionStorage.setItem("xAIScore", xCurrentScore);
            }
          } else if ($player === "o") {
            if (sessionStorage.getItem("oAIScore") === null) {
              sessionStorage.setItem("oAIScore", 1);
              oCurrentScore = sessionStorage.getItem("oAIScore");
            } else {
              oCurrentScore = parseInt(sessionStorage.getItem("oAIScore")) + 1;
              sessionStorage.setItem("oAIScore", oCurrentScore);
            }
          }
          xCurrentScore = sessionStorage.getItem("xAIScore");
          oCurrentScore = sessionStorage.getItem("oAIScore");
          scoreXCount.text(xCurrentScore);
          $("#numberOfXWins").append(scoreXCount);
          scoreOCount.text(oCurrentScore);
          $("#numberOfOWins").append(scoreOCount);
          var playerName = sessionStorage.getItem("playerOne")

          // popup winner

          $(".popUp_Border>p").text("Congrats " + playerName + "!");
          popUp.style.display = "block";
        }
      }
    });
    if ($player === 'o') {
      onePlayer();

    }
  }

  // this is a popup window that displays the result
  var popUp = document.getElementById("winPopup");
  var span = document.getElementsByClassName("close")[0];

  function onePlayer() {

    var ruinPlayer = true;


    if (moves === NaN || moves === undefined || moves === null) {
      moves = selectedSize;
      comparingVariable = selectedSize;
    }

    if (moves === comparingVariable) {
      if (selectedSize === 3 && $(".column").eq(4).hasClass("empty")) {
        $(".column").eq(4).addClass("o");
        $(".column").eq(4).css("border", "none");
        $(".column").eq(4).css("background-color", "rgb(57, 148, 189)");
        $(".column").eq(4).removeClass("empty");

        current = random;
        noScenario = false;
        moves--;
      } else {
        for (var i = 0; i < $(".column").length; i++) {
          random = Math.floor(Math.random() * ($(".column").length - 1));
          if (
            $(".column")
              .eq(random)
              .hasClass("empty")
          ) {
            $(".column")
              .eq(random)
              .addClass("o");
            $(".column").eq(random).css("border", "none");
            $(".column").eq(random).css("background-color", "rgb(57, 148, 189)");
            $(".column")
              .eq(random)
              .removeClass("empty");

            current = random;
            noScenario = false;
            moves--;
            break;
          }
        }
      }
    } else if (comparingVariable > moves) {
      loopWinner: for (var i = arr3.length - 1; i >= 0; i--) {
        var anotherCounter = 0;
        loopWinner2: for (var j = 0; j < arr3[i].length; j++) {
          // debugger;

          if ($(".column").eq(arr3[i][j]).hasClass("o")) {
            anotherCounter++
          }
          if (anotherCounter === (selectedSize - 1)) {
            for (var k = 0; k < arr3[i].length; k++) {
              if ($(".column").eq(arr3[i][k]).hasClass("empty")) {
                $(".column").eq(arr3[i][k]).removeClass("empty");
                $(".column").eq(arr3[i][k]).addClass("o");
                $(".column").eq(arr3[i][k]).css("border", "none");
                $(".column").eq(arr3[i][k]).css("background-color", "rgb(57, 148, 189)");
                noScenario = false;
                var winner = checkWinningArray2();
                ruinPlayer = false;
                break loopWinner;
              }
            }
          }
        }
      }

      loopEvil: for (var i = arr3.length - 1; i >= 0; i--) {
        var anotherCounter = 0;
        loopEvil2: for (var j = 0; j < arr3[i].length; j++) {
          // debugger;

          if ($(".column").eq(arr3[i][j]).hasClass("x")) {
            anotherCounter++
          }
          if (anotherCounter === (selectedSize - 1)) {
            for (var k = 0; k < arr3[i].length; k++) {
              if ($(".column").eq(arr3[i][k]).hasClass("empty")) {
                $(".column").eq(arr3[i][k]).removeClass("empty");
                $(".column").eq(arr3[i][k]).addClass("o");
                $(".column").eq(arr3[i][k]).css("border", "none");
                $(".column").eq(arr3[i][k]).css("background-color", "rgb(57, 148, 189)");
                noScenario = false;
                var winner = checkWinningArray2();
                ruinPlayer = false;
                break loopEvil;
              }
            }
          }
        }
      }
      // 

      if (ruinPlayer) {
        // 
        loop1: for (var i = arr3.length - 1; i >= 0; i--) {
          loop2: for (var j = 0; j < selectedSize; j++) {
            // debugger;
            if (arr3[i][j] === random) {
              loop3: for (var k = 0; k < arr3[i].length; k++) {
                for (var w = 0; w < arr3[i].length; w++) {
                  if ($(".column").eq(arr3[i][w]).hasClass("x")) {
                    break loop3;
                  } else if ($(".column").eq(arr3[i][k]).hasClass("empty")) {
                    $(".column").eq(arr3[i][k]).removeClass("empty");
                    $(".column").eq(arr3[i][k]).addClass("o");
                    $(".column").eq(arr3[i][k]).css("border", "none");
                    $(".column").eq(arr3[i][k]).css("background-color", "rgb(57, 148, 189)");
                    random = arr3[i][k];
                    noScenario = false;
                    var winner = checkWinningArray2();
                    break loop1;
                  }
                }
              }
            }
          }
        }
      }
      if (noScenario) {
        for (var i = 0; i < $(".column").length; i++) {
          if (
            $(".column")
              .eq(i)
              .hasClass("empty")
          ) {
            $(".column")
              .eq(i)
              .addClass("o");
            $(".column").eq(i).css("border", "none");
            $(".column").eq(i).css("background-color", "rgb(57, 148, 189)");
            $(".column")
              .eq(i)
              .removeClass("empty");
            noScenario = false;
            var winner = checkWinningArray2();
            moves--;
            break;
          }
        }
      }
    }

    function checkWinningArray2() {
      var counter = 0;
      for (var i = 0; i < arr3.length; i++) {
        for (var j = 0; j < arr3[i].length; j++) {
          var index = arr3[i][j];
          if (
            $(".column")
              .eq(index)
              .hasClass("o")
          ) {
            // console.log(arr3);
            counter++;
          }
          if (counter === selectedSize) {
            return true;
          }
        }
        counter = 0;
      }
    }

    var scoreXCount = $("#numberOfXWins");
    var scoreOCount = $("#numberOfOWins");
    var xCurrentScore;
    var oCurrentScore;
    if (winner) {

      if (sessionStorage.getItem("oAIScore") === null) {
        sessionStorage.setItem("oAIScore", 1);
        oCurrentScore = sessionStorage.getItem("oAIScore");
      } else {
        oCurrentScore = parseInt(sessionStorage.getItem("oAIScore")) + 1;
        sessionStorage.setItem("oAIScore", oCurrentScore);
      }

      xCurrentScore = sessionStorage.getItem("xAIScore");
      oCurrentScore = sessionStorage.getItem("oAIScore");
      scoreXCount.text(xCurrentScore);
      $("#numberOfXWins").append(scoreXCount);
      scoreOCount.text(oCurrentScore);
      $("#numberOfOWins").append(scoreOCount);

      $(".popUp_Border>p").text("Hahaha, I win!");
      popUp.style.display = "block";
    } else {
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
        xCurrentScore = sessionStorage.getItem("xAIScore");
        oCurrentScore = sessionStorage.getItem("oAIScore");
        scoreXCount.text(xCurrentScore);
        $("#numberOfXWins").append(scoreXCount);
        scoreOCount.text(oCurrentScore);
        $("#numberOfOWins").append(scoreOCount);
        $(".popUp_Border>p").text("Aw it's a draw");
        popUp.style.display = "block";
      }
      changePlayer();
    }
  }
  //create empty array to store possible winning scenarios

  //this function checks whether a win is achieved
  function checkWin() {
    // this will check the array for all possible wins
    function checkWinningArray() {
      var counter = 0;
      for (var i = 0; i < arr3.length; i++) {
        for (var j = 0; j < arr3[i].length; j++) {
          var index = arr3[i][j];
          if (
            $(".column")
              .eq(index)
              .hasClass("x")
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
      $(".popUp_Border>p").text("Aw it's a draw");
      popUp.style.display = "block";
    }

    return checkWinningArray();
  }

  //play against AI function

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
