import React, {Component} from 'react';
import './interest-style.scss';
import APIService from "../../APIService";
import { connect } from 'react-redux';
import { addInterest, removeInterest } from "../../store/actions";
import { getInterests } from "../../store/selectors";

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      inputValue: ""
    }
  }
  
  showTopics = (event, id) => {
    const keyword = event.target.value;
    this.setState({
      topics: [],
      inputValue: keyword
    });
    
    if(keyword.length < 2)
      return;
    new APIService().requestForTopics(id, keyword, (data) => {
      data.map(item => item.name)
      this.setState({
        topics: data
      })});
  }
  
  addOnInput = (id, name) => {
    this.props.addInterest(id);
    this.setState({
      topics: [],
      inputValue: name
    });
  }
  
  
  render() {
    const { item: {id, name} , deleteItem } = this.props;
    const { topics } = this.state;
    return (
      <div className="interest">
        <div className="col">
          <p> {name} </p>
          <span onClick={() => { deleteItem() }}> &#9932; </span>
        </div>
        <div className="filter">
          <input
            type="text"
            placeholder="Add individual topics"
            value={this.state.inputValue}
            onChange={ (event) => this.showTopics(event, id)}
          />
          <div className="dropdownList">
            { topics.map(topic =>
              <div
                key={topic.name}
                className="option"
                onClick={() => this.addOnInput(topic.id, topic.name)}> { topic.name}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ interests: getInterests(state)}),
  { addInterest, removeInterest }
)(Interest);
