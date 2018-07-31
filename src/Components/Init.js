// @flow

import React from "react";
import { connect } from "react-redux";
import type { Action } from "redux";
import type { History } from "history";
import { addHistory, init } from "../logic/actions";

type Props = {
  history: History,
  dispatch: (a: Action) => void
};
class Init extends React.Component<Props> {
  componentDidMount() {
    console.log("history=", this.props.history);
    this.props.dispatch(addHistory(this.props.history));
    setTimeout(() => this.props.dispatch(init()), 0);
  }
  render() {
    return null;
  }
}

export default connect()(Init);
