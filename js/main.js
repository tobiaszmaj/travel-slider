var carousel = document.querySelector('.main-carousel');
var flkty = new Flickity( carousel, {
//options
  cellAlign: "left",
  contain: true,
  pageDots: false, // remove page dots
  hash: true // change page url after slide change
});

// Restart button - return to first slide
document
  .querySelector(".restart-button")
  .addEventListener("click", function() {
    flkty.selectCell(".start");
  });

// Progress bar below carousel   
var progressBar = document.querySelector(".progress-bar");

flkty.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});
