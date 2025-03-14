# Anime Search Engine

This is the assessment exercise for Module 2 of the Adalab School's Web Development Bootcamp, Nov 2024 - Mar 2025.

Tis is a website that displays anime shows through a search bar and an API.

## Features

### Anime Search
The user types data in the input field and clicks Search. Then, a request is made to [this API](https://docs.api.jikan.moe/) and the results are displayed.

### Favorites List
Clicking on a result adds it to a Favorites list. Favorites can be removed individually, and the entire list can also be cleared with the Clear option. Favorites are saved in localStorage, so they are displayed again when the page is reloaded.

### Reset
When Reset is pressed the page returns to its initial state.

## Technologies

* JavaScript
* HTML
* Sass


## Installation and Use
```
git clone https://github.com/radiofiambre/anime-search-engine.git
cd anime-search-engine
npm install
npm run dev
```