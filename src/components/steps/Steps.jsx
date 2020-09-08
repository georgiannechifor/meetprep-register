import React from 'react';
import './steps-style.scss';

const Steps = ({step, handleFinishClick, handleBackClick, handleContinueClick}) => {
  return (
    <div className="step">
      <button className="back" onClick={handleBackClick}> { step > 0 ? '< Back' : ''}</button>
      <button className="continue" onClick={step === 4 ? handleFinishClick : handleContinueClick}> {step === 4 ? 'Finish' : 'Continue'} </button>
    </div>
  );
};

export default Steps;
