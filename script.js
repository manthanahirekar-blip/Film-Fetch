let form = document.querySelector("form")
let inputBox = document.querySelector(".inputBox")
let searchBtn = document.querySelector(".searchBtn")
let movieContainer = document.querySelector(".movie-container")

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName)
    }
    else {
        movieContainer.innerHTML = showError("Enter movie name to get movie information.");
        movieContainer.classList.add("noBackground");
    }
})

const getMovieInfo = async (movie) => {

    const movieKey = "4058183d";
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=${movieKey}&t=${movie}`, requestOptions);
    let data = await response.json();
    console.log(data);
    showMovieData(data);



}

const showMovieData = (data) => {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove("noBackground");
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement("div");
    movieElement.classList.add('movie-info')
    movieElement.innerHTML = `<h2>${Title}</h2>
                                <p><strong>Rating: &#11088</strong>${imdbRating}</p>
                                <p><strong>Genre: </strong>${Genre}</p>
                                <p><strong>Released: </strong>${Released}</p>
                                <p><strong>Runtime: </strong>${Runtime}</p>
                                <p><strong>Actors: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;


    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`



    movieContainer.appendChild(moviePosterElement)
    movieContainer.appendChild(movieElement)

}

const showError = (messsage) => {
    movieContainer.innerHTML = `<h1>${messsage}</h1>`;
    movieContainer.classList.add("noBackground");
}