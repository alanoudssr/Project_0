$(document).ready(function () {

    //this var determines the current player
    var $player = 'x';
    //this var determines if the game hits a draw
    var counter = 0;

    //assign the board var
    var $board = $('#container');

    // assign grid size from user
    var selectedSize;

    $('#choiceButton').click(function () {
        selectedSize = $('input[name=gridNum]:checked').val();
        selectedSize = parseInt(selectedSize);
        // debugger;
        createGrid();

    });

    //these variables can be changed to change the grid size
    // the starting turn of the game is displayed on the page by creating a span and adding text to it
    var $turn = $("<span/>");
    $turn.text('X');
    $(".playerTurn").css('color', 'whitesmoke');
    $turn.css('color', 'black');
    $(".playerTurn").append($turn);

    // this function alternates the text displayed between player x and o
    function changePlayer() {
        if ($player === 'x') {
            $(".playerTurn").css('color', 'whitesmoke');
            $turn.css('color', 'black');
            $turn.text('X');
        } else if ($player === 'o') {
            $(".playerTurn").css('color', 'black');
            $turn.css('color', 'whitesmoke');
            $turn.text('O');
        }
    }

    //calling the create a grid function

    //this funtion created the grid automatically (grid size can be easily changed)
    function createGrid() {
        var size = selectedSize;
        // debugger;
        $board.empty();
        //loop to create multiple rows
        var random = 0;
        for (var row = 0; row < size; row++) {
            var $row = $('<div>').addClass('row').attr('id', row);
            //within each row create multiple columns
            for (var column = 0; column < size; column++) {
                var $column = $('<div>').addClass('column empty').attr('data-column', column).attr('data-row', row);
                $row.append($column);
            }
            $board.append($row);

        }
        $('.column.empty').on('click', function (event) {

            if ($(this).hasClass('empty')) {
                if ($player === 'x') {
                    $(this).removeClass('empty');
                    $(this).addClass($player);
                    $(this).data('player', $player);
                    var winner = checkWin();
                    if (!winner) {
                        $player = 'o';
                        changePlayer();
                    }
                } else if ($player === 'o') {
                    $(this).removeClass('empty');
                    $(this).addClass($player);
                    var winner = checkWin();
                    if (!winner) {
                        $player = 'x';
                        changePlayer();
                    }
                }
            }
            // debugger;
            if (winner) {
                console.log("yay");
                $('.popUp-content>p').text("Congrats player " + $player + "!");
                popUp.style.display = "block";
            }

        });
    }



    // if a slot in the 3x3 grid is clicked give it class x or o depending on the player's turn
    // also check for wins and change current player to the other player 

    // this is popup window that displayed result
    var popUp = document.getElementById('winPopup');
    var span = document.getElementsByClassName("close")[0];

    function checkWin() {
        // var doubleSize = selectedSize * 2;
        var sizeSquared = selectedSize * selectedSize;
        // var diagonalSize = selectedSize + 1;
        // var reverseDiagonal = selectedSize - 1;
        // var bottomLeftCorner = selectedSize * (selectedSize - 1);
        var arraySize = selectedSize + selectedSize + 2;
        // debugger;

        //check for wins and display popup when win is achieved

        // checkVertical();
        // checkDiagonalTopLeft();
        // checkDiagonalTopRight();


        var startIndex = 0;
        var arr3 = [];
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
        for (var i = 0; i < selectedSize; i++) {
            var arr2 = [];
            var currentIndex = i;
            for (var j = 0; j < selectedSize; j++) {
                arr2.push(currentIndex);
                currentIndex += selectedSize;
            }
            arr3.push(arr2);
        }

        var arr2 = [];
        var currentIndex = 0;
        for (var j = 0; j < selectedSize; j++) {
            arr2.push(currentIndex);
            currentIndex += (selectedSize + 1);
        }
        arr3.push(arr2);

        var arr4 = [];
        var currentIndex = (selectedSize - 1);
        for (var j = 0; j < selectedSize; j++) {
            arr4.push(currentIndex);
            currentIndex += (selectedSize - 1);
        }
        arr3.push(arr4);

        // console.log(arr3);


        // this will check for a WinningArray win
        function checkWinningArray() {

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

            //     var firstIndex = 0
            //     for (var i = 0; i < selectedSize; i++) {
            //         var arr = [];
            //         var classExists = false;
            //         var currentIndex = firstIndex;
            //         console.log("currentIndex", currentIndex);
            //         for (k = 0; k < selectedSize; k++) {
            //             if ($(".column").eq(currentIndex).hasClass($player)) {
            //                 arr.push(currentIndex);
            //                 if (arr.length === (selectedSize - 1)) {
            //                     return true;
            //                 }
            //                 console.log('yes');
            //             } else {
            //                 classExists = false;
            //                 console.log('no');
            //             }
            //             currentIndex++;
            //             // debugger;
            //             console.log("k", k);
            //             console.log("The length is " + arr.length);

            //         }
            //         firstIndex = firstIndex + selectedSize;
            //         console.log("firstIndex", firstIndex);
            //         console.log('i', i);

            //         for (var j = 0; j < arr.length; j++) {
            //             arr.pop();
            //         }
            //     }
            //     return classExists;
            // }


        }

        // this will check for a vertical win
        // function checkVertical() {
        //     for (var j = 0; j < sizeSquared; j++) {
        //         var currentRow = '#' + j;
        //         j += selectedSize;
        //         var nextRow = '#' + j;
        //         j += selectedSize;
        //         var nextNextRow = '#' + j;
        //         j -= doubleSize;
        //         if ($(currentRow).hasClass($player) && $(nextRow).hasClass($player) && $(nextNextRow).hasClass($player)) {
        //             $('.popUp-content>p').text("Congrats player " + $player + "!");
        //             popUp.style.display = "block";

        //         }
        //     }
        // }


        // function checkDiagonalTopLeft() {
        //     for (var j = 0; j < sizeSquared; j++) {
        //         var currentRow = '#' + j;
        //         j += diagonalSize;
        //         var nextRow = '#' + j;
        //         j += diagonalSize;
        //         var nextNextRow = '#' + j;
        //         j += diagonalSize;
        //         if ($(currentRow).hasClass($player) && $(nextRow).hasClass($player) && $(nextNextRow).hasClass($player)) {
        //             $('.popUp-content>p').text("Congrats player " + $player + "!");
        //             popUp.style.display = "block";

        //         }
        //     }

        // }

        // function checkDiagonalTopRight() {
        //     for (var j = bottomLeftCorner; j >= 0; j--) {
        //         var currentRow = '#' + j;
        //         j -= reverseDiagonal;
        //         var nextRow = '#' + j;
        //         j -= reverseDiagonal;
        //         var nextNextRow = '#' + j;

        //         if ($(currentRow).hasClass($player) && $(nextRow).hasClass($player) && $(nextNextRow).hasClass($player)) {
        //             $('.popUp-content>p').text("Congrats player " + $player + "!");
        //             popUp.style.display = "block";

        //         }
        //     }
        // }

        // this will check for draw
        // $('.slot').each(function (index) {
        //     if ($(this).hasClass('playedO') || $(this).hasClass('playedX')) {
        //         counter++;
        //     }
        //     if (counter === 45) {
        //         $('.popUp-content>p').text("Aww it's a draw");
        //         popUp.style.display = "block";
        //     }
        // });
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
    $('.replay').on('click', function () {
        location.reload();
    });

}); 