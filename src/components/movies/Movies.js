import React, {Component, useEffect} from 'react';
import { connect } from "react-redux";
import * as movieActions from "../../store/actions/movie";
import { GET_MOVIES } from "../../shared/services/movie";
import { UPDATE_MOVIE } from "../../shared/services/movie";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import StarRatings from "react-star-ratings";
import { Grid, Paper} from '@material-ui/core';
import SearchBar from '../search-bar/SearchBar';

import "./movies.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
       
        color: theme.palette.text.secondary,
      },
      trash:{
        background: '#00995C',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      added:{
        background: '#FF6688',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      }
    }));
  
const Movies = ({datos,initMovies})=> {
    const classes = useStyles();
    let movieToUpdate={};

    const [getAllMovies, {  loading, error, data  }] =  useLazyQuery(GET_MOVIES,{ onCompleted: () => onCompleteGetAllMovies()});
    const [updateMovie, {  loadingUpdate, errorUpdate, dataUpdate  }] =  useMutation(UPDATE_MOVIE,{ onCompleted:()=> onCompleteUpdateMovie()});
    
    const onCompleteGetAllMovies = ()=>{
        console.log("onCompleteGetAllMovies");
        initMovies(data);
    }
    const onCompleteUpdateMovie = ()=>{
        
        data.movies.map((item)=>{
            if(movieToUpdate.id===item.id){
                data.added = dataUpdate.added
            }
        })

        initMovies(data);
    }

    useEffect(() => {
        getAllMovies();
        console.log('Eu estou montado')
    } , [])

    const update = (movie)=>{
        movieToUpdate = movie;
        const value = (movie.added+1)%2;
        const updateObject ={
            added:value,
            name:movie.name,
            description:movie.description,
            poster:movie.poster,
            rating:movie.rating
        }
        updateMovie({ variables: { id:movie.id, input:updateObject}});
    }
    return (
        <div>
            <SearchBar/>
            <br></br>
            <Grid container spacing={7}>
                      
                {datos.movies.map(item=> ( 
                        <Grid item xs={3} key={item.id}>
                            <Paper className={classes.paper}>
                            <img className="img" src={`data:image/png;base64, ${item.poster}`}  />
                             
                            <p>{item.name}</p>
                             
                             <StarRatings rating={item.rating}
                                        starRatedColor="blue"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="16px"
                                        starSpacing="5px"
                                    />
                              {item.rating}      
                              <br></br>
                              
                              
                                {item.added ==0 ? (
                                    <Button variant="contained" className={classes.added} onClick={()=>update(item)}>Add to my library</Button>
                              
                                ) : (
                                    <Button variant="contained" className={classes.trash} onClick={()=>update(item)}>Delete</Button>
                              
                                )
                                }

                            </Paper>
                        </Grid>
                       
                ))}
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) =>({
    datos: state.movie
});


const mapDispatchToProps = (dispatch) =>({
    initMovies: (movies) => dispatch(movieActions.initMovies(movies))
});

export default connect(mapStateToProps,mapDispatchToProps)(Movies);