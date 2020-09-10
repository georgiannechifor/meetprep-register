import React, {Component } from 'react';
import Header from '../header/Header';
import ListContainer from '../listContainer/ListContainer';
import Steps from '../steps/Steps';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import './register-style.scss';
import APIService from "../../APIService";
import { getLanguages, getRegisterObject } from "../../store/selectors";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      currentListType: 'Reasons'
    }
  }
  
  a11yProps = (index) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  handleChange = (event, newValue) => {
    this.setState({
      currentStep: newValue,
      currentListType: event.target.lastChild.data
    })
  };
  
  continueClick = () => {
    const current = this.state.currentStep + 1;
    this.setState({
      currentStep: current,
      currentListType: document.getElementById(`scrollable-auto-tab-${current}`).textContent
    })
   
  }
  
  finishClick = () => {
    const userID = this.props.registerObject.data.user.id;
    const languages = this.props.selectedLanguages;
    const token = this.props.registerObject.data.access_token;
    const finish = {
      known_languages: languages
    };
    new APIService().updateUser({
      userID: userID,
      languages: finish,
      token: token,
      callback: (data) => {
        alert("Registration Complete");
        window.location.refresh();
      }
    });
  }
  
  backClick = () => {
    const current = this.state.currentStep - 1;
    this.setState( {
      currentStep: current,
      currentListType: document.getElementById(`scrollable-auto-tab-${current}`).textContent
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <AppBar className="appBar" position="static" color="default">
          <Tabs
            value={this.state.currentStep}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">
          
            <Tab label="Reasons" {...this.a11yProps(0)}/>
            <Tab label="Industries" {...this.a11yProps(1)}/>
            <Tab label="Interests" {...this.a11yProps(2)}/>
            <Tab label="Details" {...this.a11yProps(3)}/>
            <Tab label="Language" {...this.a11yProps(4)}/>
          </Tabs>
        </AppBar>
        <Header currentStep={this.state.currentStep + 1} totalSteps={5}/>
        <ListContainer finishClick={() => {
          this.continueClick()
        }} currentListType={this.state.currentListType}/>
        {this.state.currentStep !== 3 ?
          <Steps
            step={this.state.currentStep}
            handleBackClick={() => {
              this.backClick()
            }}
            handleFinishClick={() => {
              this.finishClick()
            }}
            handleContinueClick={() => {
              this.continueClick()
            }}/>
          : ''
        }
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    selectedLanguages: getLanguages(state),
    registerObject: getRegisterObject(state)
  }),
  null
)(Register);
