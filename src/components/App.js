import "./App.css";
import Gallery from "./imageGallery/imageGallery";
import Searchbar from "./searchbar/searchbar";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    title: "",
  };

  formSubmitHandler = (value) => {
    this.setState({ title: value });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />

        <Gallery title={this.state.title} />
      </div>
    );
  }
}
