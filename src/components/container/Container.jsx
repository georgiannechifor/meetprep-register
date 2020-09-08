import React, { useState } from 'react';
import Header from '../header/Header';
import ListContainer from '../listContainer/ListContainer';
import Steps from '../steps/Steps';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './container-style.scss';
import APIService from "../../APIService";



const Container = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentListType, setListType] = useState("Reasons");
  
  const a11yProps = (index) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const handleChange = (event, newValue) => {
    setCurrentStep(newValue);
    setListType(event.target.lastChild.data);
  };
  
  const continueClick = () => {
    setCurrentStep(currentStep === 4 ? 0 : currentStep + 1);
    setListType(document.getElementById(`scrollable-auto-tab-${currentStep + 1}`).textContent);
  }
  
  const finishClick = () => {
    const userID = localStorage.getItem("userID");
    const languages = JSON.parse(localStorage.getItem("languages"));
    const token = JSON.parse(localStorage.getItem("registerToken"));
    const finish = {
      known_languages: languages
    };
    new APIService().updateUser({
      userID: userID,
      languages: finish,
      token: token,
      callback: (data) => {
        localStorage.clear();
        alert("Registration Complete");
      }
    });
  }
  
  const backClick = () => {
    setCurrentStep(currentStep - 1);
    setListType(document.getElementById(`scrollable-auto-tab-${currentStep - 1}`).textContent);
  }
  
  
  return (
    <React.Fragment>
      <AppBar className="appBar" position="static" color="default">
        <Tabs
          value={currentStep}
          onChange={ handleChange }
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          
          <Tab label="Reasons" {...a11yProps(0)}/>
          <Tab label="Industries" {...a11yProps(1)}/>
          <Tab label="Interests" {...a11yProps(2)}/>
          <Tab label="Details" {...a11yProps(3)}/>
          <Tab label="Language" {...a11yProps(4)}/>
        </Tabs>
      </AppBar>
      <Header currentStep = { currentStep + 1 } totalSteps={5}/>
      <ListContainer finishClick={continueClick} currentListType={ currentListType } />
      { currentStep !== 3 ?
        <Steps
          step={currentStep}
          handleBackClick={() => { backClick() }}
          handleFinishClick={() => { finishClick() }}
          handleContinueClick={ () => { continueClick() }}/>
          : ''
      }
    </React.Fragment>
  );
}

export default Container;
