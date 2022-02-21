import { Gallery } from "./imageGallery.styled";
import React, { Component } from "react";
import Btn from "../button/button";
import { getImg } from "../API Service/services";
import Modal from "../modal/modal";
import { ImageItem } from "../imageGalleryItem/imageGalleryItem";
import Spin from "../loader/loader";
import PropTypes from "prop-types";

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
    const { title } = this.props;
    const { page } = this.state;

    if (prevProps.title !== this.props.title) {
      this.setState({ images: [] });
      this.setState({ page: 1 });
      this.setState({ loading: true });
      getImg(title, page)
        .then((r) => r.json())
        .then(({ hits }) => this.setState({ images: hits }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    if (prevState.page !== this.state.page) {
      getImg(title, page)
        .then((r) => r.json())
        .then(({ hits }) =>
          this.setState({ images: [...prevState.images, ...hits] })
        );
    }
    //console.log(this.state.images)
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
          <ImageItem images={images} selectImage={this.selectImage} />
        </Gallery>
        {images.length > 0 ? <Btn onClick={this.loadBtnHandler} /> : null}
        {showModal && (
          <Modal onCloseModal={this.onResetImage} selectedImage={selectedImg} />
        )}
      </>
    );
  }
}
