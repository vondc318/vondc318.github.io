let mover = document.querySelector(".mover");
let puddle = document.querySelector(".puddle");
let wrapper = document.querySelector(".wrapper");

let progress = 0;
let lastProgress = 0;

function updateClock() {
  let date = new Date();

  let secondsToday = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  progress = secondsToday / 86400;

  if (progress < lastProgress) {
    resetIce();
  }
  lastProgress = progress;

  mover.style.transform = "translateX(-50%) scale(" + (1 - progress * 0.95) + ")";
  mover.style.borderRadius = (12 + progress * 60) + "px";
  mover.style.opacity = 1 - progress * 0.5;

  puddle.style.width = (60 + progress * 300) + "px";
  puddle.style.height = (10 + progress * 50) + "px";

  // Fade the background from light to dark grey
  let shade;
  if (progress < 0.25) {
    shade = 27;
  } else if (progress < 0.333) {
    shade = 27 + (progress - 0.25) / 0.083 * 70;
  } else if (progress < 0.7) {
    shade = 97;
  } else {
    shade = 97 - (progress - 0.7) / 0.3 * 70;
  }
  document.body.style.backgroundColor = "hsl(0, 0%, " + shade + "%)";

  console.log("Progress:", progress);
}

function resetIce() {
  [mover, puddle].forEach(function (el) {
    el.classList.remove("reset");
    void el.offsetWidth;
    el.classList.add("reset");
  });
}

function makeDrip() {
  let size = 140 * (1 - progress * 0.95);
  let side = Math.random() < 0.5 ? -1 : 1;

  let drip = document.createElement("div");
  drip.className = "drip";
  drip.style.left = (200 + side * size / 2 - 4) + "px";
  drip.style.bottom = (70 + size * 0.5) + "px";
  drip.style.setProperty("--fall", (size * 0.5) + "px");
  wrapper.appendChild(drip);

  drip.addEventListener("animationend", function () {
    drip.remove();
  });
}

updateClock();

setInterval(updateClock, 1000);
setInterval(makeDrip, 3000);
