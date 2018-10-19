$(document).ready(function () {

  // this displays the signature svg
  $("path").css("stroke-dashoffset", "0");

  // activate start gif on mouse enter
  $(".homeButtonStyle").on("mouseenter", function () {
    if (this.id === "startOne") {
      $("#startOne>img").attr("src", "images/start.gif")
    } else {
      $("#startTwo>img").attr("src", "images/startcopy.gif")
    }
  });

  // activate end gif on mouse leave
  $(".homeButtonStyle").on("mouseleave", function () {
    if (this.id === "startOne") {
      $("#startOne>img").attr("src", "images/end.gif");
    } else {
      $("#startTwo>img").attr("src", "images/endcopy.gif");
    }
  });

  // make buttons appear later
  window.setTimeout(() => {
    $("#startOne").css("display", "inline-block");
    $("#startTwo").css("display", "inline-block");
    $("#startOne").addClass("slideInLeft");
    $("#startTwo").addClass("slideInRight");
  }, 2600);

  // play audio on click
  $("#startOne").on("click", function () {
    $('#my_audio').get(0).play();
    goToOnePlayer()
  });

  $("#startTwo").on("click", function () {
    $('#my_audio').get(0).play();
    goToHome();
  });

  // go to desired page 
  function goToHome() {
    window.setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }

  function goToOnePlayer() {
    window.setTimeout(() => {
      window.location.href = "onePlayer.html";
    }, 1000);
  }
});
