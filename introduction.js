'use strict';


let container1 = document.querySelector("#container1");
let container2 = document.querySelector("#container2");
let container3 = document.querySelector("#container3");
let h2 = document.getElementsByTagName("h2");


h2[0].addEventListener("click", function clickDisplay() {
 if (container1.style.display === "none") {
  container1.style.display = "block";
  } else {
    container1.style.display = "none";
  }
});

h2[1].addEventListener("click", function clickDisplay() {
 if (container2.style.display === "none") {
  container2.style.display = "block";
  } else {
    container2.style.display = "none";
  }
});

h2[2].addEventListener("click", function clickDisplay() {
 if (container3.style.display === "none") {
  container3.style.display = "block";
  } else {
    container3.style.display = "none";
  }
});



