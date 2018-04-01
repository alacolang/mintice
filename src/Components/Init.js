// @flow

import React from 'react'
import { connect } from 'react-redux'
import { addHistory, init } from '../logic/actions'

class InitHistory extends React.Component<any> {
  componentDidMount() {
    console.log('history=', this.props.history)
    this.props.dispatch(addHistory(this.props.history))
    setTimeout(() => this.props.dispatch(init()), 0)
  }
  render() { return null }
}

export default connect()(InitHistory)
