$(document).ready(function () {

  $("path").css("stroke-dashoffset", "0");

  $(".homeButtonStyle").on("mouseenter", function () {
    // if ($(this).is("#startOne")) {
    if (this.id === "startOne") {
      $("#startOne>img").attr("src", "images/start.gif")
    } else {
      $("#startTwo>img").attr("src", "images/startcopy.gif")

    }
  });

  $(".homeButtonStyle").on("mouseleave", function () {
    // if ($(this).is("#startOne")) {
    if (this.id === "startOne") {
      $("#startOne>img").attr("src", "images/end.gif");
    } else {
      $("#startTwo>img").attr("src", "images/endcopy.gif");
    }
  });
  window.setTimeout(() => {
    $("#startOne").css("display", "inline-block");
    $("#startTwo").css("display", "inline-block");
    $("#startOne").addClass("slideInLeft");
    $("#startTwo").addClass("slideInRight");
  }, 2600);

  $("#startOne").on("click", function () {
    $('#my_audio').get(0).play();
    goToOnePlayer()
  });

  $("#startTwo").on("click", function () {
    $('#my_audio').get(0).play();
    goToHome();
  });

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
