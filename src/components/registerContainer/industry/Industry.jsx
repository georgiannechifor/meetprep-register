import React, {Component} from 'react';
import './industry-style.scss'

import { connect } from 'react-redux';
import { addIndustry, removeIndustry } from "../../store/actions";
import { getSelectedIndustries } from "../../store/selectors";

class Industry extends Component {
  render() {
    const {item: {id, name, image} } = this.props;
    return (
      <div
        className={ this.props.selectedIndustries.includes(id) ? "industry checked" : "industry"}
        onClick={() => { this.handleCheck() }}
      >
        <input
          type="checkbox"
          readOnly
          checked={this.props.selectedIndustries.includes(id)}
        />
        <img src={ image } alt={ name }/>
        <span> { name } </span>
      </div>
    );
  }
  
  handleCheck = () => {
    const { item: { id } } = this.props;
    if(this.props.selectedIndustries.includes(id)) {
      this.props.removeIndustry(id);
    } else {
      this.props.addIndustry(id);
    }
  }
}

export default connect(
  (state) => ({ selectedIndustries: getSelectedIndustries(state)}),
  { addIndustry, removeIndustry }
)(Industry);
