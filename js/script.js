"use strict";

let elResult = document.querySelector(".movies__result");
let elTemplate = document.querySelector(".template").content;
let elList = document.querySelector(".movies__list");
let elInput = document.querySelector(".input--search");
let elPagenation = document.querySelector(".btn-group");

const API_KEY = "b1566df1";
let search = "avengers";
var page = 1;

const renderMovies = (arr, element) => {
  let filmsFragment = document.createDocumentFragment();
  arr.forEach((item) => {
    const templateClone = elTemplate.cloneNode(true);

    templateClone.querySelector(".card-img-top").src = item.Poster;
    templateClone.querySelector(".card-title").textContent = item.Title;
    templateClone.querySelector(".card-text").textContent = item.Year;
    filmsFragment.appendChild(templateClone);
  });
  elList.innerHTML = "";
  element.appendChild(filmsFragment);
};

const renderPagenation = (arr, element) => {
  elPagenation.innerHTML = "";
  const countPage = Math.ceil(Number(arr.totalResults) / 10);
  for (let i = 1; i <= countPage; i++) {
    let newPgeBtn = document.createElement("button");

    newPgeBtn.setAttribute("type", "button");
    newPgeBtn.setAttribute("class", "btn btn-primary mx-1");

    newPgeBtn.textContent = i;

    element.appendChild(newPgeBtn);
  }
  let elPage = document.querySelectorAll(".btn-group button");
  elPage.forEach((item) => {
    item.addEventListener("click", () => {
      let pageNumber = +item.innerHTML;
      page = pageNumber;
      getMovies();
    });
  });
};

const getMovies = async () => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );

  const data = await res.json();
  elResult.textContent = data.totalResults;
  if (data.Response === "True" && data.Search.length > 0)
    renderMovies(data.Search, elList);
  renderPagenation(data, elPagenation);
};

getMovies();

elInput.oninput = (evt) => {
  search = evt.target.value;

  getMovies();
};
document.body.onload = () => {
  setTimeout(() => {
    let preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("done")) {
      preloader.classList.add("done");
    }
  }, 1000);
};
