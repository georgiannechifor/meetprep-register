import React, {Component} from 'react';
import './interest-style.scss';
import APIService from "../../APIService";

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      selectedTopics: [],
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
    const temp = localStorage.getItem("interests");
    let interests = temp === null ? [] : JSON.parse(temp);
    interests.push(id);
    localStorage.setItem("interests", JSON.stringify(interests));
    
    this.setState({
      topics: [],
      inputValue: name
    });
  }
  
  
  render() {
    const {id, name, deleteItem} = this.props;
    const { topics } = this.state;
    return (
      <div className="interest">
        <div className="col">
          <p> {name} </p>
          <span onClick={deleteItem}> &#9932; </span>
        </div>
        <div className="filter">
          <input type="text" placeholder="Add individual topics" value={this.state.inputValue} onChange={ (event) => this.showTopics(event, id)}/>
          <div className="dropdownList">
            { topics.map(topic => <div key={topic.name} className="option" onClick={() => this.addOnInput(topic.id, topic.name)}> { topic.name} </div>) }
          </div>
        </div>
      </div>
    );
  }
}

export default Interest;
