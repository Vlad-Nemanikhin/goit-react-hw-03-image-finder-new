import { Overlay, ModalMarkup } from "./modal.styled";
import { createPortal } from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import React, { Component } from "react";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static defaultProps = {
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    disableBodyScroll(modalRoot);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    enableBodyScroll(modalRoot);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onCloseModal();
    }
  };

  handleClickModal = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    return createPortal(
      <Overlay>
        <ModalMarkup>
          <img src={this.props.selectedImage} alt="" />
        </ModalMarkup>
      </Overlay>,
      modalRoot
    );
  }
}
