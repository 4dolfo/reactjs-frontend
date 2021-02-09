export function selectMovie(movie) {
    return{
        type:'SELECT_MOVIE',
        movie
    }
}

export function updateMovies(movies) {
    return{
        type:'UPDATE_MOVIES',
        movies
    }
}

export function initMovies(movies) {
    return{
        type:'GET_ALL_MOVIES',
        movies
    }
}
