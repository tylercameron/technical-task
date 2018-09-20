import React, { Component } from 'react';

class MovieCard extends Component {
  title;
  director;
  cast;
  genre;
  notes;
  index;
  year;

  constructor(props) {
    super(props);
    this.title = props.title;
    this.director = props.director;
    this.cast = props.cast;
    this.genre = props.genre;
    this.notes = props.notes;
    this.year = props.year;
    this.index = props.index;

    this.removeMovie = this.removeMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
  }

  removeMovie() {
    this.props.deleteMovie(this.props.id);
  }

  editMovie() {
    this.props.editClicked(this.props.id);
  }

  render() {
    // <a onClick={this.editMovie}>Edit</a> <a onClick={this.removeMovie}>Delete</a>
    return (
      <div className="">
        <div><h3>{this.title}</h3></div>
        <div>
          <div>Director: {this.director}</div>
          <div>Genre: {this.genre}</div>
          <div>Year: {this.year}</div>
        </div>
      </div>
    );
  }
}
export default MovieCard;