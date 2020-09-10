import React, { Component } from 'react';
import './language-style.scss';
import { connect } from 'react-redux';
import {getLanguages, getRegisterObject} from "../../store/selectors";
import { addLanguage, removeLanguage } from '../../store/actions';

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langs: [],
      selectedLanguages: [],
      inputValue: ""
    }
  }
  
  setSelectedLanguages = (value) => {
    this.setState({
      selectedLanguages: value
    })
  }
  
  
  addLanguage = (lang, id) => {
    this.setSelectedLanguages(this.state.selectedLanguages.includes({id, lang}) ? this.state.selectedLanguages : [...this.state.selectedLanguages, {id, lang}]);
    this.setState({
      langs: [],
      inputValue: ""
    });
    this.props.addLanguage(id);
  }

  showLanguages = () => {
    this.setState({
      langs: this.state.langs.length === 0 ? this.props.languages : []
    });
  }

  filterLanguages = (value) => {
    const filteredLanguages = this.state.languages.filter(lang => lang.name.toLowerCase().includes(value.toLowerCase()));
    this.setState({
      langs: filteredLanguages,
      inputValue: value
    });
  }

  deleteItem = (value) => {
      const selected = this.state.selectedLanguages.filter(lang => lang !== value);
      this.props.removeLanguage(value);
      this.setState({
        selectedLanguages: selected
      })
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="languages">
          <p> Add Language: </p>
          <input
            type="text"
            value={ this.state.inputValue }
            placeholder="Add language"
            onChange={(event) => this.filterLanguages(event.target.value) }
            onClick={ () => this.showLanguages() }
          />
          
          <div className="languageList">
            { this.state.langs.map(lang => <div key={lang.id} className="lang" onClick={() => this.addLanguage(lang.name, lang.id)}> { lang.name} </div>) }
          </div>
        </div>
        
        <div className="container">
          { this.state.selectedLanguages.map(lang => <div key={lang.id} className="selectedLang"> { lang.lang } <span onClick={() => this.deleteItem(lang)}> &#9932; </span> </div>) }
        </div>
      
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    registerObject: getRegisterObject(state),
    stateLanguages: getLanguages(state)
  }),
  { addLanguage, removeLanguage }
)(Languages);
