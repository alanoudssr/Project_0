$(function () {

    //this var determines the current player
    var $player = 'x';
    //this var determines if the game hits a draw
    var counter = 0;

    //assign the board var
    var $board = $('#container');

    //these variables can be changed to change the grid size
    var size = 3;
    var doubleSize = 6;
    var tripleSize = 9;

    //calling the create a grid function
    createGrid();

    //this funtion created the grid automatically (grid size can be easily changed)
    function createGrid() {
        //loop to create multiple rows
        var random = 0;
        for (var row = 0; row < size; row++) {
            var $row = $('<div>').addClass('row').attr('id', 'row' + row);
            //within each row create multiple columns
            for (var column = 0; column < size; column++) {
                var $column = $('<div>').addClass('column empty').attr('id', random).attr('data-column', column).attr('data-row', row);
                $row.append($column);
                random++;
            }
            $board.append($row);
        }
    }

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

    // if a slot in the 3x3 grid is clicked give it class x or o depending on the player's turn
    // also check for wins and change current player to the other player 
    $('.column.empty').on('click', function (event) {
     
            if ($(this).hasClass('empty')) {
                if ($player === 'x') {
                    $(this).removeClass('empty');
                    $(this).addClass($player);
                    $(this).data('player', $player);
                    checkWin();
                    $player = 'o';
                    changePlayer();
                } else if ($player === 'o') {
                    $(this).removeClass('empty');
                    $(this).addClass($player);
                    checkWin();
                    $player = 'x';
                    changePlayer();
                }
            }
        
    });

    // this is popup window that displayed result
    var popUp = document.getElementById('winPopup');
    var span = document.getElementsByClassName("close")[0];

    function checkWin() {

        //check for wins and display popup when win is achieved
        checkHorizontal();
        checkVertical();
        checkDiagonal();

        // this will check for a horizontal win
        function checkHorizontal() {
            for (var j = 0; j < 9; j++) {
                    var currentRow = '#'+j;
                    var nextSibling = '#'+ ++j;
                    var nextNextSibling = '#'+ ++j;
                    if ($(currentRow).hasClass($player) && $(nextSibling).hasClass($player) && $(nextNextSibling).hasClass($player)) {
                        $('.popUp-content>p').text("Congrats player " + $player + "!");
                        popUp.style.display = "block";
                    }
                
            }
        }

        // this will check for a vertical win
        function checkVertical() {
            for (var j = 0; j < tripleSize; j ++) {
                    var currentRow = '#'+j;
                    j += size;
                    var nextRow = '#'+j;
                    j += size;                    
                    var nextNextRow = '#'+j;
                    j -= doubleSize;                    
                    if ($(currentRow).hasClass($player) && $(nextRow).hasClass($player) && $(nextNextRow).hasClass($player)) {
                        $('.popUp-content>p').text("Congrats player " + $player + "!");
                        popUp.style.display = "block";

                    }
                }
            }
        

        function checkDiagonal() {

        }

        // this will check for draw
        $('.slot').each(function (index) {
            if ($(this).hasClass('playedO') || $(this).hasClass('playedX')) {
                counter++;
            }
            if (counter === 45) {
                $('.popUp-content>p').text("Aww it's a draw");
                popUp.style.display = "block";
            }
        });
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