"use strict";


// ELEMENTOS HTML
const input = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-btnSearch");
const favsList = document.querySelector(".js-favList");
const resultsList = document.querySelector(".js-resultsList");
const buttonEmptyFavs = document.querySelector(".js-btnRemoveAll");
const resetButton = document.querySelector(".js-btnReset");


// ARRAYS VACÍOS
let searchResults = [];
let favShowsArray = [];


// FUNCIONES

// Obtener datos de la API
function getShowFromAPI(event) {
  event.preventDefault();
  const search = input.value.trim().toLowerCase();
  if (!search) return;

  const apiURL = `https://api.jikan.moe/v4/anime?q=${search}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      searchResults = data.data;
      renderSearchResults();
    })
    .catch((err) => console.error("Error al buscar:", err));
}

// Renderizar resultados de búsqueda
function renderSearchResults() {
  resultsList.innerHTML = "";
  for (const show of searchResults) {
    const img = show.images?.jpg?.image_url || "https://placehold.co/225?text=Sin+imagen&font=roboto.png";
    const title = show.title;
    const isFav = favShowsArray.some((fav) => fav.title === title);

    const li = document.createElement("li");
    li.classList.add("card");
    if (isFav) li.classList.add("favResult");

    li.innerHTML = `
      <img src="${img}" alt="${title}">
      <h3>${title}</h3>
    `;

    resultsList.appendChild(li);
  }
}

// Añadir o quitar un show a favoritos
function selectFavShow(event) {
  const clickedShow = event.target.closest("li.card");
  if (!clickedShow || !resultsList.contains(clickedShow)) return;

  const title = clickedShow.querySelector("h3").textContent;
  const img = clickedShow.querySelector("img").src;

  const showExists = favShowsArray.find((fav) => fav.title === title);

  if (!showExists) {
    favShowsArray.push({ title, img });
  } else {
    favShowsArray = favShowsArray.filter((fav) => fav.title !== title);
  }

  updateFavList();
  setFavsInLocalStorage();
  renderSearchResults();
}

// Renderizar lista de favoritos
function updateFavList() {
  favsList.innerHTML = "";
  favShowsArray.forEach((favShow) => {
    const li = document.createElement("li");
    li.classList.add("card", "fav");
    li.innerHTML = `
      <button class="btnX" aria-label="Eliminar">&#10006;</button>
      <img src="${favShow.img}" alt="${favShow.title}">
      <h3>${favShow.title}</h3>
    `;
    favsList.appendChild(li);
  });
}

// Guardar favoritos en LocalStorage
function setFavsInLocalStorage() {
  localStorage.setItem("FavoriteShows", JSON.stringify(favShowsArray));
}

// Cargar favoritos del LocalStorage
function loadLocalStorage() {
  const saved = localStorage.getItem("FavoriteShows");
  if (saved) {
    favShowsArray = JSON.parse(saved);
    updateFavList();
  }
}

// Eliminar un favorito individual
function removeOneFavShow(event) {
  const btn = event.target;
  if (!btn.classList.contains("btnX")) return;

  const li = btn.closest("li.fav");
  const title = li.querySelector("h3").textContent;

  favShowsArray = favShowsArray.filter((fav) => fav.title !== title);
  updateFavList();
  setFavsInLocalStorage();
  renderSearchResults();
}

// Eliminar todos los favoritos
function removeAllFavShows() {
  favShowsArray = [];
  updateFavList();
  setFavsInLocalStorage();
  renderSearchResults();
}

// Reset
function resetAll() {
  removeAllFavShows();
  searchResults = [];
  resultsList.innerHTML = "";
  input.value = "";
}

// EVENTOS

searchButton.addEventListener("click", getShowFromAPI);
resultsList.addEventListener("click", selectFavShow);
favsList.addEventListener("click", removeOneFavShow);
buttonEmptyFavs.addEventListener("click", removeAllFavShows);
resetButton.addEventListener("click", resetAll);

// Inicialización
loadLocalStorage();