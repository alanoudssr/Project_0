$(document).ready(function() {
  // Run code
  $("path").css("stroke-dashoffset", "0");

  $("#startOne").on("click", function() {
    window.location.href = "onePlayer.html";
  });

  $("#startTwo").on("click", function() {
    window.location.href = "home.html";
  });
});
