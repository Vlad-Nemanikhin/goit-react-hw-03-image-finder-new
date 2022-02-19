import { Image, Card } from "./imageGalleryItem.styled";
import React, { Component } from "react";
//import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
  static propTypes = {};

  state = {};

  render() {
    return (
      <Card>
        <Image src="" alt="" />
      </Card>
    );
  }
}
