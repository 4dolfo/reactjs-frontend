
const INITIAL_STATE={
  movie : {},
  movies:[]
};

const movie = (state = INITIAL_STATE, action)=> {
    if(action.type === "SELECT_MOVIE"){
      return {...state, movie: action.movie}
    }
    if(action.type === "UPDATE_MOVIES"){
      return {...state, movies: action.movies.search}
    }
    if(action.type === "GET_ALL_MOVIES"){
      return {...state, movies: action.movies.movies}
    }
    return state;
}

export default movie;