import { Component } from "react";
import { Rings } from "react-loader-spinner";
import { Loading } from "./loader.module";

export default class Spin extends Component {
  render() {
    return (
      <Loading>
        <Rings
          color="green"
          height={100}
          width={100}
          timeout={2000} //2 secs
        />
      </Loading>
    );
  }
}
