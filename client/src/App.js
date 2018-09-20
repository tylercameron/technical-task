import React, { Component } from 'react';

import MovieCard from "./MovieCard";
import './App.css';

class App extends Component {

  // the base url used for any requests, don't forget to add your port number! :) 
  API_URL = "http://localhost:5000";






  constructor(props) {
    super(props);
    this.state= {
      movies: [],
      error: null,
      edit: null,
      deleted: null
    }
    this.getAllMovies = this.getAllMovies.bind(this);
    this.getMovieByTitle = this.getMovieByTitle.bind(this);
    this.getMovieRange = this.getMovieRange.bind(this);
    this.addMovieToList = this.addMovieToList.bind(this);
    this.removeMovieByID = this.removeMovieByID.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  getAllMovies() {
    fetch(`${this.API_URL}/movies`).then(res => res.json()).then(results => {
      this.setState({
        movies: results
      });
    })
    .catch(error => {
      this.setState({
        error: "Error in 'getAllMovies': " + error
      })
    });
  }

  getMovieRange(event) {
    event.preventDefault();
    const sYear = event.target.startYear.value;
    const eYear = event.target.endYear.value;
    fetch(`${this.API_URL}/movies?start=${sYear}&end=${eYear}`).then(res => res.json()).then(results => {
      this.setState({
        movies: []
      });
      this.setState({
        movies: results
      });
    })
    .catch(error => {
      this.setState({
        error: "Error in 'getMovieRange': " + error
      })
    });
  }

  getMovieByTitle(event) {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    fetch(`${this.API_URL}/movies?search=${searchTerm}`).then(res => res.json()).then(results => {
      this.setState({
        movies: []
      });

      this.setState({
        movies: results
      });
    })
    .catch(error => {
      this.setState({
        error: "Error in 'getMovieByTitle': " + error
      })
    });
  }

  addMovieToList(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const year = event.target.year.value;
    const director = event.target.director.value;
    const genre = event.target.genre.value;
    fetch(`${this.API_URL}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: title,year: year,director: director,genre: genre})
    }).then(res => res.json()).then(results => {
      const moviesCopy = this.state.movies;
      moviesCopy.push(results[0]);
      this.setState({
        movies: moviesCopy
      });
    })
    .catch(error => {
      this.setState({
        error: "Error in 'addMovieToList': " + error
      })
    });
  }

  removeMovieByID(id) {
    fetch(`${this.API_URL}/movies?id=${id}`, {
      method: 'delete'
    }).then(res => res.json()).then(results => {
      this.setState({deleted: true});
    })
    .catch(error => {
      this.setState({
        error: "Error in 'removeMovieByID': " + error
      })
    });
  }
// {"title":"Dirty Grandpa","year":2016,"director":"Dan Mazer","cast":"Zac Efron, Robert De Niro, Zoey Deutch, Aubrey Plaza","genre":"Comedy","notes":"Lions Gate Entertainment"}
  componentWillMount() {
    this.getAllMovies();
  }

  editClicked(movieID) {
    this.state.movies.forEach((movie, i) => {
      if (movie.id === movieID) {
        this.setState({edit: movie});
      }
    });
  }

  saveEdit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const year = event.target.year.value;
    const director = event.target.director.value;
    const genre = event.target.genre.value;
    fetch(`${this.API_URL}/movies`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        id: this.state.edit.id,
        title: title,
        year: year,
        director: director,
        genre: genre
      })
    }).then(res => res.json()).then(results => {
      const moviesCopy = this.state.movies;
      
      moviesCopy.forEach((movie, i) => {
        if (i === this.state.edit.movieID) {
          movie.title = title;
          movie.year = year;
          movie.director = director;
          movie.genre = genre;
        }
      });
      this.setState({
        movies: moviesCopy,
        edit: null
      });
    })
    .catch(error => {
      this.setState({
        error: "Error in 'saveEdit': " + error
      });
    });    
  }

  render() {
    var deleteHTML =(<div></div>);
    if (this.state.deleted) {
      deleteHTML = (<div>Movie was deleted!</div>);
    }
    var errorMessage = (<div></div>);
    if (this.state.error) {
      errorMessage = (<div>{this.state.error}</div>);
    }
    
      var editMovie = (<div></div>);
      if (this.state.edit !== null) {
        editMovie = (<form onSubmit={this.saveEdit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input name="title" type="text" defaultValue={this.state.edit.title}/>
          </div>

          <div>
            <label htmlFor="year">Year it was made:</label>
            <input name="year" type="text" defaultValue={this.state.edit.year}/>
          </div>

          <div>
            <label htmlFor="director">Director:</label>
            <input name="director" type="text" defaultValue={this.state.edit.director} />
          </div>

          <div>
            <label htmlFor="genre">Genre:</label>
            <input name="genre" type="text" defaultValue={this.state.edit.genre} />
          </div>
          <button>Save edit!</button>
        </form>);
      }
      var movieCards = [];
      this.state.movies.forEach((movie, i) => {
        movieCards.push(<MovieCard 
          key={i}
          id={movie.id}
          title={movie.title}
          director={movie.director}
          genre={movie.genre}
          year={movie.year}
          deleteMovie={this.removeMovieByID}
          editClicked={this.editClicked}/>);
      });
      return (
        <div>
          <div className={"dflex formContainer"}>
            <div>
              <form onSubmit={this.getMovieRange}>
                <div>
                  <label htmlFor="startYear">Start year</label>
                  <input id="startYear" name="startYear" min="1980" max="2030" type="number" />
                </div>
    
                <div>
                  <label htmlFor="endYear">End year</label>
                  <input id="endYear" name="endYear" min="1980" max="2030" type="number" />
                </div>
    
                <button>Year Search!</button>
              </form>
            </div>
            <div>
              <form onSubmit={this.getMovieByTitle}>
                <label htmlFor="search">Search by title:</label>
                <input id="search" name="search" type="text" />
    
                <button>Search!</button>
              </form>
            </div>
            <div>
              <form onSubmit={this.addMovieToList}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input name="title" type="text" />
                </div>
    
                <div>
                  <label htmlFor="year">Year it was made:</label>
                  <input name="year" type="text" />
                </div>
    
                <div>
                  <label htmlFor="director">Director:</label>
                  <input name="director" type="text" />
                </div>

                <div>
                  <label htmlFor="genre">Genre:</label>
                  <input name="genre" type="text" />
                </div>
    
                <button>Add Movie!</button>
              </form>
            </div>            
          </div>
          <div>
            {editMovie}
          </div>
          <div>{errorMessage}</div>
          <div>{movieCards}</div>
        </div>
      );
  }
}

export default App;
