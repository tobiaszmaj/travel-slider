"use strict";

// mustache
var templateCarousel = document.getElementById("carousel-template").innerHTML;
var carousel = document.querySelector('.main-carousel');
var carouselElements = "";

for (var i = 0; i < slideData.length; i++) {
  carouselElements += Mustache.render(templateCarousel, slideData[i]);
}

carousel.innerHTML = carouselElements;

// flickity carousel
var flkty = new Flickity(carousel, {
  //options
  cellAlign: "left",
  contain: true,
  pageDots: false, // remove page dots
  hash: true // change page url after slide change
});

// restart button
var restart = document.querySelector(".restart-button");

restart.addEventListener("click", function () {
  flkty.select(0);
});

// progress bar
var progressBar = document.querySelector(".progress-bar");

flkty.on("scroll", function (progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});

// google maps
(function () {
  window.initMap = function () {

    var mapLocation = slideData[0].coords;

    // zoom and center
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: mapLocation
    });

    // 
    var markers = [];
    for (var i = 0; i < slideData.length; i++) {
      markers.push(new google.maps.Marker({
        position: slideData[i].coords,
        map: map,
        id: i
      }))
      markers[i].addListener("click", function () {
        flkty.select(this.id)
      });

      // change map after slide
      flkty.on("change", function (index) {
        map.panTo(slideData[index].coords);
        map.setZoom(6);
      });
    }
  };
})();