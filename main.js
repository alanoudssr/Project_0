$(document).ready(function () {

    //landing popup! Promotes user to choose a grid size
    var gridPopUp = document.getElementById('gridPopup');
    var span = document.getElementsByClassName("close")[0];
    gridPopUp.style.display = "block";

    //this var determines the current player
    var $player = 'x';
    //assign the board variable
    var $board = $('#container');

    // assign grid size from user
    var selectedSize;
    $('#choiceButton').click(function () {
        selectedSize = $('input[name=gridNum]:checked').val();
        selectedSize = parseInt(selectedSize);
        //close popup and create the grid
        gridPopUp.style.display = "none";
        createGrid();
    });

    // the starting turn of the game is displayed on the page by creating a span and adding text to it
    var $turn = $("<span/>");
    $turn.text('X');
    $(".playerTurn").css('color', 'whitesmoke');
    $turn.css('color', 'black');
    $(".playerTurn").append($turn);

    // this function alternates the text displayed between player x and o
    function changePlayer() {
        if ($player === 'o') {
            $player = 'x';
            $(".playerTurn").css('color', 'whitesmoke');
            $turn.css('color', 'black');
            $turn.text('X');
        } else if ($player === 'x') {
            $player = 'o';
            $(".playerTurn").css('color', 'black');
            $turn.css('color', 'whitesmoke');
            $turn.text('O');
        }
    }

    //this function creates the grid automatically (grid size is chosen by the player)
    function createGrid() {
        var size = selectedSize;
        $board.empty();
        //loop to create multiple rows
        var random = 0;
        for (var row = 0; row < size; row++) {
            var $row = $('<div>').addClass('row');
            //within each row create multiple columns
            for (var column = 0; column < size; column++) {
                var $column = $('<div>').addClass('column empty');
                $row.append($column);
            }
            $board.append($row);

        }

        //when player clicks a slot
        $('.column.empty').on('click', function (event) {

            //check if slot is empty
            if ($(this).hasClass('empty')) {
                $(this).removeClass('empty');
                $(this).addClass($player);
                var winner = checkWin();
                //if no win is achieved trigger next turn
                if (!winner) {
                    changePlayer();
                }
            }
            //if win is achieved display the winner
            if (winner) {
                console.log("yay");
                $('.popUp-content>p').text("Congrats player " + $player + "!");
                popUp.style.display = "block";
            }

        });
    }

    // this is a popup window that displays the result
    var popUp = document.getElementById('winPopup');
    var span = document.getElementsByClassName("close")[0];

    //this function checks whether a win is achieved
    function checkWin() {

        var startIndex = 0;
        //create empty array to store possible winning scenarios
        var arr3 = [];

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
            currentIndex += (selectedSize + 1);
        }
        arr3.push(arr2);

        //this adds a diagonal top right win
        var arr4 = [];
        var currentIndex = (selectedSize - 1);
        for (var j = 0; j < selectedSize; j++) {
            arr4.push(currentIndex);
            currentIndex += (selectedSize - 1);
        }
        arr3.push(arr4);

        // this will check the array for all possible wins
        function checkWinningArray() {
            var counter = 0;
            for (var i = 0; i < arr3.length; i++) {

                for (var j = 0; j < arr3[i].length; j++) {
                    var index = arr3[i][j];
                    if ($(".column").eq(index).hasClass($player)) {
                        counter++;
                    }
                    if (counter === selectedSize) {
                        return true;
                    }
                }
                counter = 0;
            }

        }
        return checkWinningArray();
    }


    //when popup x button is clicked close the popup
    span.onclick = function () {
        popUp.style.display = "none";
    }

    //when area outside the popup is clicked close the popup
    window.onclick = function (event) {
        if (event.target == popUp) {
            popUp.style.display = "none";
        }
    }

    //if replay button is clicked reload page
    $('#replay').on('click', function () {
        location.reload();
    });

}); 