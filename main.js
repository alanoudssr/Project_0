$(function () {

    //this var determines the current player
    var $player = 'x';
    //this var determines if the game hits a draw
    var counter = 0;

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
                checkWin();
            } else if ($player === 'o') {
                $(this).addClass('playedO');
                $player = 'x';
                changePlayer();
                checkWin();
            }
        }
    });

    // this is popup window that displayed result
    var popUp = document.getElementById('winPopup');
    var span = document.getElementsByClassName("close")[0];

    function checkWin() {

        //check for wins and display popup when win is achieved
        if ($('.slot1.playedX, .slot2.playedX, .slot3.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot1.playedX, .slot4.playedX, .slot7.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot1.playedX, .slot5.playedX, .slot9.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot4.playedX, .slot5.playedX, .slot6.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot7.playedX, .slot8.playedX, .slot9.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot2.playedX, .slot5.playedX, .slot8.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot3.playedX, .slot6.playedX, .slot9.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot3.playedX, .slot5.playedX, .slot7.playedX').length == 3) {
            $('.popUp-content>p').text('Congrats Player X!');
            popUp.style.display = "block";
        } else if ($('.slot1.playedO, .slot2.playedO, .slot3.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot1.playedO, .slot4.playedO, .slot7.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot1.playedO, .slot5.playedO, .slot9.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot4.playedO, .slot5.playedO, .slot6.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot7.playedO, .slot8.playedO, .slot9.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot2.playedO, .slot5.playedO, .slot8.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot3.playedO, .slot6.playedO, .slot9.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        } else if ($('.slot3.playedO, .slot5.playedO, .slot7.playedO').length == 3) {
            $('.popUp-content>p').text('Congrats Player O!');
            popUp.style.display = "block";
        }


        // this will check for draw and display a draw result
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
    })

});