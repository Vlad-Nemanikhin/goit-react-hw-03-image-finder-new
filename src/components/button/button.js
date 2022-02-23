import { LoadBtn } from "./button.styled";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Btn extends Component {
  static defaultProps = {
    onClick: PropTypes.func.isRequired,
  };

  state = {
    page: 1,
  };

  componentDidMount() {
    this.updatePage();
  }

  updatePage = () => {
    this.setState({ page: 1 });
  };

  handleClick = (e) => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.props.onClick(this.state.page);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    return <LoadBtn onClick={this.handleClick}>Load more</LoadBtn>;
  }
}
