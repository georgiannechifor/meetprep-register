import React from 'react';
import * as CONSTANTS from "../../consts";
import './header-style.scss';

const Header = ({currentStep, totalSteps}) => {
  let component = '';
  switch(currentStep) {
    case 1: {
      component =
        <div>
          <h1>{ CONSTANTS.REASONS_TITLE } </h1>
          <p> { CONSTANTS.REASONS_PARAGRAPH_ONE }</p>
          <p> { CONSTANTS.REASONS_PARAGRAPH_TWO }</p>
          <p> { CONSTANTS.REASONS_PARAGRAPH_THREE }</p>
        </div>
      break;
    }
    case 2: {
      component =
        <div>
          <h1>{ CONSTANTS.INDUSTRIES_TITLE } </h1>
          <p> { CONSTANTS.INDUSTRIES_PARAGRAPH }</p>
        </div>
      break;
    }
    case 3: {
      component =
        <div>
          <h1>{ CONSTANTS.INTERESTS_TITLE } </h1>
          {/*<p> { CONSTANTS.INTERESTS_LOG }</p>*/}
        </div>
      break;
    }
    case 4: {
      component =
        <div>
          <h1>{ CONSTANTS.ACCOUNT_TITLE } </h1>
          {/*<p> { CONSTANTS.ACCOUNT_AGREE }</p>*/}
        </div>
      break;
    }
    case 5: {
      component =
        <div>
          <h1>{ CONSTANTS.LANGUAGES_TITLE } </h1>
          <p> { CONSTANTS.LANGUAGES_PARAGRAPH }</p>
        </div>
      break;
    }
    
    default: {
      component = <p> Loading container error </p>;
      break;
    }
  }
  
  return (
    <React.Fragment>
      <div className="title">
        <h3> { CONSTANTS.HEADER_TITLE } </h3>
        <p> step {currentStep} of {totalSteps} </p>
      </div>
      <div className="tab">
        { component }
      </div>
    </React.Fragment>
  );
};

export default Header;
