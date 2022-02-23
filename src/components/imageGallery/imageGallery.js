import { Gallery } from "./imageGallery.styled";
import React, { Component } from "react";
import Btn from "../button/button";
import { getImg } from "../API Service/services";
import Modal from "../modal/modal";
import { ImageItem } from "../imageGalleryItem/imageGalleryItem";
import Spin from "../loader/loader";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default class ImageGallery extends Component {
  static defaultProps = {
    title: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    showModal: false,
    selectedImg: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevProps.title !== this.props.title) {
      this.setState({ images: [], page: 1, loading: true });
      getImg(this.props.title, page)
        .then((r) => r.json())
        .then(({ hits }) => this.setState({ images: hits }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    if (prevState.page !== this.state.page) {
      getImg(this.props.title, page)
        .then((r) => r.json())
        .then(({ hits }) =>
          this.setState({ images: [...prevState.images, ...hits] })
        );
    }
  }

  loadBtnHandler = (newPage) => {
    this.setState({ page: newPage });
  };

  selectImage = (newImage) => {
    this.setState({ selectedImg: newImage });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onResetImage = () => {
    this.setState({ selectedImg: null });
    this.toggleModal();
  };

  render() {
    const { images, selectedImg, showModal, loading } = this.state;
    return (
      <>
        {loading && <Spin />}
        <Gallery>
          {images.map(({ webformatURL, tags, largeImageURL }) => (
            <ImageItem
              key={uuidv4()}
              source={webformatURL}
              name={tags}
              sourceLarge={largeImageURL}
              onSelectImg={this.selectImage}
            />
          ))}
        </Gallery>
        {images.length > 0 ? <Btn onClick={this.loadBtnHandler} /> : null}
        {showModal && (
          <Modal onCloseModal={this.onResetImage} selectedImage={selectedImg} />
        )}
      </>
    );
  }
}
