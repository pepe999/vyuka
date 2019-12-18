// @flow
// libs
import React, { PureComponent } from "react";

export default class NewsItem extends PureComponent {
  render = () => {
    return (
      <div>
        {this.props.title} <div>XXXX</div>
      </div>
    );
  };
}
