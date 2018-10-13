$(function () {

    //this var determines the current player
    var $player = 'x';

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
    $('.slot').on('click', function (event) {

        if ($(this).hasClass('playedX') === false && $(this).hasClass('playedO') === false) {
            if ($player === 'x') {
                $(this).addClass('playedX');
                $player = 'o';
                changePlayer();
            } else if ($player === 'o') {
                $(this).addClass('playedO');
                $player = 'x';
                changePlayer();
            }
        }
    });

});