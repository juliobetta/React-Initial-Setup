import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { initialState, increment, decrement, reset } from './state';
import styles from './index.css';


class Counter extends Component {
  state = initialState(this.props.initialValue);

  render() {
    const { initialValue } = this.props;

    return (
      <div className = {styles.Counter}>
        <div>
          <Button floating mini onClick = {this._handleDecrement(initialValue)}>–</Button> { ' ' }
          <Button floating onClick = {this._handleIncrement}>+</Button> { ' ' }
          <IconButton icon = 'replay' id = 'reset' onClick = {this._handleReset(initialValue)}/>
        </div>

        <span id = 'counter'>{this.state.counter}</span>
      </div>
    );
  }

  _handleIncrement = () => this.setState(increment);
  _handleDecrement = initialValue => () => {
    const newState = decrement(this.state);

    if(initialValue <= newState.counter) {
      this.setState({ ...this.state, ...newState });
    }
  };
  _handleReset = initialValue => () => this.setState(() => reset(initialValue))
}


Counter.propTypes = {
  initialValue: PropTypes.number
};

Counter.defaultProps = {
  initialValue: 1
};


export default Counter;
