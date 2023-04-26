document.querySelector('.burger-menu').addEventListener('click', () => {
  let btn = document.querySelector('.burger-menu__btn');
  btn.classList.toggle('burger-menu__btn--active');
});

document.addEventListener("DOMContentLoaded", () => {
  let sumVisit = localStorage.getItem('sumVisit');

  sumVisit === null ? (sumVisit = 1) : sumVisit++;
  console.log(`You visited ${sumVisit} time(s)`);

  localStorage.setItem('sumVisit', sumVisit);
  localStorage.setItem('start', performance.now());

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("end", performance.now());
  });

  let timePerVisit = Math.round(localStorage.getItem('end') - localStorage.getItem('start'));

  let allTime = localStorage.getItem('allTime');
  allTime === null ? (allTime = timePerVisit) : (allTime = Math.round(allTime) + timePerVisit);
  localStorage.setItem("allTime", allTime);

  let averageTime = allTime / sumVisit;
  localStorage.setItem('averageTime', averageTime);

  let s = Math.round(averageTime  / 1000);
  let min = Math.round(s / 60);
  let hours = Math.round(min / 60);

  averageTime < 60000
    ? console.log(`You spend ${s} seconds here on average`)
    : averageTime < 3600000
    ? min === 1
      ? console.log(`You spend ${min} minute here on average`)
      : console.log(`You spend ${min} minutes here on average`)
    : hours === 1
    ? console.log(`You spend ${hours} hour here on average`)
    : console.log(`You spend ${hours} hours here on average`);
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}