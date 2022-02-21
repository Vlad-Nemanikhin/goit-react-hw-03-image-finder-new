import { Header, Form, Label, SearchBtn, Input } from "./searchbar.styled";
import React, { Component } from "react";
import { VscSearch } from "react-icons/vsc";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  static defaultProps = {
    onSubmit: PropTypes.func,
  };

  state = {
    value: "",
  };

  handleInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value.trim() === "") {
      toast.error("Введите значение");
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ value: "" });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            {" "}
            <VscSearch />
            <Label>Search</Label>
          </SearchBtn>

          <Input
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}
