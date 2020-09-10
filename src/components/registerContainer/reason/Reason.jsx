import React, { Component } from 'react';
import './reason-style.scss';
import { connect } from 'react-redux';
import { addReason, removeReason } from "../../store/actions";
import {getSelectedReasons} from "../../store/selectors";

class Reason extends Component {
  render() {
    const {item: {id, name, image}} = this.props;
    return (
      <div
        className={this.props.selectedReasons.includes(id) ? "reasonItem checked" : "reasonItem"}
        onClick={() => this.handleCheck()}
      >
        <img src={ image } alt={ name }/>
        <p> { name } </p>
        <input
          className="reason-checkbox"
          type="checkbox"
          readOnly
          checked={this.props.selectedReasons.includes(id)}
        />
      </div>
    );
  }
  
  handleCheck = () => {
    const {item: { id }} = this.props;
    if(this.props.selectedReasons.includes(id)) {
      this.props.removeReason(id);
    }
    else {
      this.props.addReason(id);
    }
  }
}

export default connect(
  (state) => ({ selectedReasons: getSelectedReasons(state) }),
  { addReason, removeReason }
)(Reason);
