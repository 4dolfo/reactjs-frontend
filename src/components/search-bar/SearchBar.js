import React, {Component} from 'react';
import { connect } from "react-redux";
import * as movieActions from "../../store/actions/movie";
import { GET_MOVIES_SEARCH } from "../../shared/services/movie";
import { useLazyQuery, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
      
}));
  
const SearchBar = ({updateMovies})=> {

    const classes = useStyles();

    const [searchMovies, {  loading, error, data  }] =  useLazyQuery(GET_MOVIES_SEARCH,{ onCompleted: () => doSomething()});
    
    const doSomething = ()=>{
        updateMovies(data);
    }
    const handleChange = (event) => {
        let text = event.target.value;
        searchMovies({ variables: { input: text}});
    };
    
    return (

        <TextField id="outlined-search" label="Buscar" type="search" variant="outlined"  onChange={handleChange }/>
       
    )
}

/*
const mapStateToProps = (state) =>({
    search: state.search,
});
*/

const mapDispatchToProps = (dispatch) =>({
    updateMovies: (movies) => dispatch(movieActions.updateMovies(movies))
    
});

export default connect(null,mapDispatchToProps)(SearchBar);