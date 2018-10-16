$(document).ready(function() {
  // Run code
  $("path").css("stroke-dashoffset", "0");
  window.setTimeout(() => {
    $("#startOne").css("display", "inline-block");
    $("#startTwo").css("display", "inline-block");
    $("#startOne").addClass("slideInLeft");
    $("#startTwo").addClass("slideInRight");
  }, 2600);

  $("#startOne").on("click", function() {
    window.location.href = "onePlayer.html";
  });

  $("#startTwo").on("click", function() {
    window.location.href = "home.html";
  });
});
