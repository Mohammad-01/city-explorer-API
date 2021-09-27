const axios = require('axios');
let cacheMemory = {};
class AllMovie {
    constructor(element) {
        this.title = element.title;
        this.overview = element.overview;
        this.average_votes = element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;
    }
}

//http://localhost:3005/getapimovies?city=Amman
function getMovies(req, res) {
    let nameOfMovies = req.query.city


    let reqMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${nameOfMovies}`
    console.log('For test req' + reqMovieUrl);

    if (cacheMemory[nameOfMovies] !== undefined) {
        res.send(cacheMemory[nameOfMovies]);
    } else {
        try {
            axios.get(reqMovieUrl).then(movieResults => {
                console.log('movie' + movieResults);
                let newArray = movieResults.data.results.map(element => {
                    console.log('movie' + movieResults.data.results);

                    return new AllMovie(element)
                });
                cacheMemory[nameOfMovies] = newArray;
                res.send(newArray)
            })
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = getMovies;