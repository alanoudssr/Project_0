$(document).ready(function () {
  // Run code
  $("#my_audio").on("mousemove", function () {
    $(this).get(0).play();
  });
  $("path").css("stroke-dashoffset", "0");
  $("#startOne").on("mouseenter", function () {
    $("#startOne>img").attr("src", "images/start.gif")
  });
  $("#startOne").on("mouseleave", function () {
    $("#startOne>img").attr("src", "images/end.gif");
  });
  $("#startTwo").on("mouseenter", function () {
    $("#startTwo>img").attr("src", "images/start.gif")
  });
  $("#startTwo").on("mouseleave", function () {
    $("#startTwo>img").attr("src", "images/end.gif");
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
