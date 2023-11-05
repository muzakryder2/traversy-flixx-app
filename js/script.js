const global = { currentPage: window.location.pathname }

// Fetch and display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular')
  results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `
      <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />
      `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`
    document.querySelector('#popular-movies').appendChild(div)
  })
}

// Fetch and display Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchApiData('tv/popular')
  results.forEach((show) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
          : `
      <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />
      `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${show.first_air_date}</small>
      </p>
    </div>`
    document.querySelector('#popular-shows').appendChild(div)
  })
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
  const API_KEY = '8e97bad3b85c51d8e8e039b01d2f2f1f'
  const API_URL = 'https://api.themoviedb.org/3'

  showSpinner()

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  )
  const data = await response.json()

  hideSpinner()
  return data
}

// Show/Hide Spinner Functions
function showSpinner() {
  document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show')
}

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies()
      break
    case '/shows.html':
      displayPopularShows()
      break
    case '/movie-details.html':
      console.log('Movie Details')
      break
    case '/tv-details.html':
      console.log('TV Details')
      break
    case '/search.html':
      console.log('Search')
      break
  }

  highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
