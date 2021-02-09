import './App.css';
import React, {Component} from 'react';
import Movies from "./components/movies/Movies"
import store from "./store"
import { Provider } from "react-redux";
import apolloClient from "./shared/services/apollo"
import { ApolloProvider } from '@apollo/client';
class App extends Component{
  
  render(){
    return <div>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <div className="title"><h1>Filmes Ad</h1></div>
          <hr></hr>
          <Movies></Movies>
        </Provider>
      </ApolloProvider>
      
    </div>
  }
}


export default App;
