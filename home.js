const api = "api_key=0d7fcb538472b4a248392fdaf9ae8532";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

// Requests for movie data
const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

// Used to truncate strings
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];

        const banner = document.getElementById("banner");
        const banner_title = document.getElementById("banner__title");
        const banner_desc = document.getElementById("banner__description");

        banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
        banner_title.innerText = setMovie.name || setMovie.original_name;
        banner_desc.innerText = truncate(setMovie.overview, 150);
    });

// Movie Rows
function createRow(title, fetchUrl, isLargeRow = false) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");

            const row = document.createElement("div");
            row.className = "row";
            headrow.appendChild(row);

            const row_title = document.createElement("h2");
            row_title.className = "row__title";
            row_title.innerText = title;
            row.appendChild(row_title);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = isLargeRow ? "row__posterLarge" : "row__poster";
                poster.src = img_url + movie.poster_path;
                row_posters.appendChild(poster);
            });
        });
}

// Create multiple rows for different categories
createRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals, true);
createRow("Top Rated", requests.fetchTrending);
createRow("Comedy Movies", requests.fetchComedyMovies);
createRow("Horror Movies", requests.fetchHorrorMovies);
createRow("Romance Movies", requests.fetchRomanceMovies);
createRow("Documentaries", requests.fetchDocumentaries);
