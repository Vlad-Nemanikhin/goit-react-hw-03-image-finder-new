import "./App.css";
import Btn from "./button/button";
import Gallery from "./imageGallery/imageGallery";
import Card from "./imageGalleryItem/imageGalleryItem";
import Loader from "./loader/loader";
//import Modal from './modal/modal';
import Searchbar from "./searchbar/searchbar";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    title: "",
  };

  componentDidUpdate(prevProps, prevState) {}

  formSubmitHandler = (value) => {
    this.setState({ title: value });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />
        <Gallery />
        <Card />
        <Btn />

        <Loader />
      </div>
    );
  }
}
